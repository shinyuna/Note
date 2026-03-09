/**
 * Stage 2: renderToPipeableStream — 스트리밍 SSR (React 19)
 *
 * 동작 방식:
 * 1. 데이터 페칭을 시작하되 await하지 않고 Promise를 그대로 전달한다
 * 2. renderToPipeableStream으로 스트리밍 렌더링을 시작한다
 * 3. onShellReady 콜백에서 셸(Header + Skeleton fallback)을 즉시 전송한다
 * 4. 각 Suspense 경계의 데이터가 준비되면 해당 HTML 청크를 추가 전송한다
 *
 * React 19에서는 use() 훅이 Promise를 직접 읽으므로 createResource가 필요 없다.
 *
 * Stage 1 대비 개선점:
 * - TTFB가 극적으로 빨라진다 (셸이 즉시 전송됨)
 * - 사용자는 빈 화면 대신 로딩 스켈레톤을 즉시 본다
 * - 빠른 데이터(Sidebar 1초)는 먼저, 느린 데이터(Review 4초)는 나중에 도착
 *
 * Network 탭에서 확인할 것:
 * - 요청 직후 셸 HTML이 바로 도착
 * - 이후 1초, 2초, 4초에 추가 청크가 도착
 * - 응답이 "진행 중" 상태로 시간에 따라 크기가 증가
 */

import { renderToPipeableStream } from "react-dom/server";

import AppShell from "../components/AppShell.tsx";
import {
  fetchProducts,
  fetchReviews,
  fetchCategories,
} from "../data/fakeApi.ts";

import type { StageNumber, Product, Review, Category } from "../types.ts";
import type { Request, Response } from "express";

export async function renderStage2(
  _req: Request,
  res: Response,
  template: string,
  stageNum: StageNumber,
): Promise<void> {
  console.log(`[Stage 2] 스트리밍 렌더링 시작 — ${new Date().toISOString()}`);

  // 핵심: await하지 않고 Promise를 그대로 전달한다
  // React 19의 use() 훅이 Suspense와 함께 자동으로 처리한다
  //
  // 동시에 데이터를 수집하여 클라이언트에 전달할 준비를 한다
  const collectedData: {
    products?: Product[];
    reviews?: Review[];
    categories?: Category[];
  } = {};

  const productsPromise = fetchProducts().then((d) => {
    collectedData.products = d;

    return d;
  });
  const reviewsPromise = fetchReviews().then((d) => {
    collectedData.reviews = d;

    return d;
  });
  const categoriesPromise = fetchCategories().then((d) => {
    collectedData.categories = d;

    return d;
  });

  // 템플릿을 <!--ssr-outlet--> 기준으로 분할
  const [htmlBefore, htmlAfter] = template.split("<!--ssr-outlet-->");

  return new Promise<void>((resolve, reject) => {
    const { pipe } = renderToPipeableStream(
      <AppShell
        stageNum={stageNum}
        productsPromise={productsPromise}
        reviewsPromise={reviewsPromise}
        categoriesPromise={categoriesPromise}
      />,
      {
        /**
         * onShellReady: 셸이 준비되면 호출됨
         *
         * "셸"이란 첫 번째 Suspense 경계 바깥의 모든 것을 의미한다.
         * 여기서는 Header + 각 Suspense의 fallback(Skeleton)이 셸이다.
         *
         * 이 시점에서 res에 write를 시작하면:
         * 1. htmlBefore (<!DOCTYPE html>...<div id="ssr-root">) 전송
         * 2. pipe(res)로 셸 HTML 스트리밍 시작
         * 3. 각 Suspense가 resolve될 때마다 해당 청크 자동 전송
         * 4. 모든 Suspense가 resolve되면 htmlAfter 전송 후 완료
         */
        onShellReady() {
          console.log(
            `[Stage 2] 셸 준비 완료 — 즉시 전송 시작 — ${new Date().toISOString()}`,
          );

          res.status(200).setHeader("Content-Type", "text/html; charset=utf-8");
          res.write(htmlBefore);
          pipe(res);
        },

        /**
         * onAllReady: 모든 Suspense가 resolve된 후 호출됨
         * 여기서 나머지 HTML(</div></body></html>)을 전송
         */
        onAllReady() {
          console.log(
            `[Stage 2] 모든 콘텐츠 전송 완료 — ${new Date().toISOString()}`,
          );
          // 서버에서 수집한 데이터를 클라이언트에 전달
          // 클라이언트가 다시 fakeApi를 호출하지 않고 즉시 hydration할 수 있도록
          const ssrDataScript = `<script>window.__SSR_DATA__=${JSON.stringify(collectedData)}</script>`;
          res.write(ssrDataScript);
          res.write(htmlAfter);
          res.end();
          resolve();
        },

        onShellError(error: unknown) {
          console.error("[Stage 2] 셸 렌더링 에러:", error);
          res.status(500).end("셸 렌더링 실패");
          reject(error);
        },

        onError(error: unknown) {
          console.error("[Stage 2] 스트리밍 에러:", error);
        },
      },
    );
  });
}
