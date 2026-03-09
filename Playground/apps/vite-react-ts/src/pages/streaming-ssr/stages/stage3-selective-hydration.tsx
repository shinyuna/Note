/**
 * Stage 3: Selective Hydration — 선택적 하이드레이션 (React 19)
 *
 * 서버 사이드: Stage 2와 동일한 스트리밍 렌더링
 * 클라이언트 사이드: hydrateRoot를 사용하여 선택적 hydration 활성화
 *
 * React 19에서는 use() 훅이 Promise를 직접 읽으므로 createResource가 필요 없다.
 *
 * Stage 2와의 차이점:
 * - 서버 렌더링은 동일하지만, 클라이언트에서 hydrateRoot를 사용
 * - 각 Suspense 경계가 독립적으로 hydration됨
 * - 아직 hydration되지 않은 섹션을 클릭하면 React가 해당 섹션을 우선 hydration
 * - 인터랙티브 요소(버튼, 클릭)로 hydration 상태를 확인 가능
 *
 * 콘솔에서 확인할 것:
 * - 각 컴포넌트의 hydration 시점 타임스탬프
 * - 클릭 시 "hydration 확인" 로그 (hydration 완료 전에는 반응 없음)
 */

import type { Request, Response } from "express";
import { renderToPipeableStream } from "react-dom/server";

import AppShell from "../components/AppShell.tsx";
import {
  fetchProducts,
  fetchReviews,
  fetchCategories,
} from "../data/fakeApi.ts";
import type { StageNumber, Product, Review, Category } from "../types.ts";

export async function renderStage3(
  _req: Request,
  res: Response,
  template: string,
  stageNum: StageNumber,
): Promise<void> {
  console.log(
    `[Stage 3] 선택적 하이드레이션 렌더링 시작 — ${new Date().toISOString()}`,
  );

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
        onShellReady() {
          console.log(`[Stage 3] 셸 전송 시작 — ${new Date().toISOString()}`);

          res.status(200).setHeader("Content-Type", "text/html; charset=utf-8");
          res.write(htmlBefore);
          pipe(res);
        },

        onAllReady() {
          console.log(
            `[Stage 3] 모든 콘텐츠 전송 완료 — ${new Date().toISOString()}`,
          );
          const ssrDataScript = `<script>window.__SSR_DATA__=${JSON.stringify(collectedData)}</script>`;
          res.write(ssrDataScript);
          res.write(htmlAfter);
          res.end();
          resolve();
        },

        onShellError(error: unknown) {
          console.error("[Stage 3] 셸 렌더링 에러:", error);
          res.status(500).end("셸 렌더링 실패");
          reject(error);
        },

        onError(error: unknown) {
          console.error("[Stage 3] 스트리밍 에러:", error);
        },
      },
    );
  });
}
