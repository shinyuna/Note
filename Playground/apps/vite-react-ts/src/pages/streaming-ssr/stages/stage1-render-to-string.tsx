/**
 * Stage 1: renderToString — 전통적 블로킹 SSR (React 19)
 *
 * 동작 방식:
 * 1. 서버에서 모든 데이터를 await로 가져온다 (fetchProducts + fetchReviews + fetchCategories)
 * 2. 모든 데이터가 준비되면 React 트리를 renderToString으로 한 번에 문자열로 변환
 * 3. 완성된 HTML을 res.end()로 한 번에 전송
 *
 * 문제점:
 * - TTFB가 가장 느린 데이터(ReviewSection, 4초)에 종속된다
 * - 사용자는 4초간 빈 화면을 보게 된다
 * - 모든 데이터가 준비되기 전까지 어떤 HTML도 전송되지 않는다
 *
 * ⚠️ renderToString은 Suspense를 지원하지 않는다!
 * 따라서 모든 Promise가 resolve된 상태여야 한다.
 *
 * Network 탭에서 확인할 것:
 * - 요청 시작 후 ~4초 뒤에 전체 HTML이 한 번에 도착
 * - 응답 크기가 시간에 따라 변하지 않음 (청크 없음)
 */

import { renderToString } from "react-dom/server";

import AppShell from "../components/AppShell.tsx";
import {
  fetchProducts,
  fetchReviews,
  fetchCategories,
  createResolvedPromise,
} from "../data/fakeApi.ts";

import type { StageNumber } from "../types.ts";
import type { Request, Response } from "express";

export async function renderStage1(
  _req: Request,
  res: Response,
  template: string,
  stageNum: StageNumber,
): Promise<void> {
  console.log(`[Stage 1] 렌더링 시작 — ${new Date().toISOString()}`);

  // 모든 데이터를 기다린다 — 가장 느린 4초에 종속
  const [products, reviews, categories] = await Promise.all([
    fetchProducts(), // 2초
    fetchReviews(), // 4초 ← 병목
    fetchCategories(), // 1초
  ]);

  console.log(`[Stage 1] 데이터 페칭 완료 — ${new Date().toISOString()}`);

  // renderToString은 Suspense를 지원하지 않으므로,
  // 이미 resolve된 Promise를 전달해야 한다.
  // use() 훅이 이 Promise를 읽으면 즉시 값을 반환한다.
  const productsPromise = createResolvedPromise(products);
  const reviewsPromise = createResolvedPromise(reviews);
  const categoriesPromise = createResolvedPromise(categories);

  // 전체 트리를 한 번에 문자열로 렌더링
  const appHtml = renderToString(
    <AppShell
      stageNum={stageNum}
      productsPromise={productsPromise}
      reviewsPromise={reviewsPromise}
      categoriesPromise={categoriesPromise}
    />,
  );

  console.log(`[Stage 1] renderToString 완료 — ${new Date().toISOString()}`);

  // 서버에서 페칭한 데이터를 클라이언트에 전달하는 <script> 태그 생성
  // 이렇게 하면 클라이언트가 다시 4초를 기다릴 필요 없이 즉시 hydration 가능
  const ssrDataScript = `<script>window.__SSR_DATA__=${JSON.stringify({ products, reviews, categories })}</script>`;

  // 템플릿의 <!--ssr-outlet-->을 렌더링된 HTML로 교체
  const finalHtml = template.replace(
    "<!--ssr-outlet-->",
    appHtml + ssrDataScript,
  );

  // 완성된 HTML을 한 번에 전송
  res
    .status(200)
    .setHeader("Content-Type", "text/html; charset=utf-8")
    .end(finalHtml);
}
