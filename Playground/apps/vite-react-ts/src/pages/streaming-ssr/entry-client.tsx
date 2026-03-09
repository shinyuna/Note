/**
 * 클라이언트 hydration 진입점 (React 19)
 *
 * index-ssr.html의 <script> 태그에서 로드된다.
 * URL의 stageNum을 파싱하여 적절한 hydration 방식을 사용한다.
 *
 * React 19에서는 use() 훅을 사용하므로 createResource 패턴이 필요 없다.
 * Promise를 직접 컴포넌트에 전달하면 use() 훅이 Suspense와 함께 처리한다.
 *
 * hydrateRoot vs createRoot:
 * - createRoot: 서버 HTML을 무시하고 클라이언트에서 처음부터 렌더링
 * - hydrateRoot: 서버 HTML을 재사용하고, 이벤트 핸들러만 부착
 *
 * Selective Hydration (Stage 3):
 * React 19의 hydrateRoot는 자동으로 Suspense 경계별 선택적 hydration을 지원한다.
 * 아직 hydration되지 않은 Suspense 경계를 클릭하면,
 * React가 해당 경계의 hydration 우선순위를 높인다.
 */

import { hydrateRoot } from "react-dom/client";

import AppShell from "./components/AppShell.tsx";
import {
  fetchProducts,
  fetchReviews,
  fetchCategories,
  createResolvedPromise,
} from "./data/fakeApi.ts";

import type { StageNumber } from "./types.ts";

// URL에서 스테이지 번호 추출: /stage/1 → 1
const stageMatch = window.location.pathname.match(/\/stage\/(\d+)/);
const stageNum = (stageMatch ? parseInt(stageMatch[1], 10) : 1) as StageNumber;

console.log(
  `[Client] Hydration 시작 — Stage ${stageNum} — ${new Date().toISOString()}`,
);

/**
 * 서버에서 전달한 SSR 데이터 활용
 *
 * window.__SSR_DATA__가 존재하면 서버가 이미 페칭한 데이터를 즉시 사용한다.
 * → hydration이 서버 HTML과 일치하므로 깜빡임 없이 바로 인터랙티브해진다.
 *
 * 존재하지 않으면 클라이언트에서 다시 페칭한다 (폴백).
 * → 이 경우 delay가 다시 발생하므로 스트리밍 이점이 상쇄된다.
 *
 * React 19에서는 Promise를 직접 전달하고, use() 훅이 처리한다.
 */
const ssrData = window.__SSR_DATA__;

const productsPromise = ssrData
  ? createResolvedPromise(ssrData.products)
  : fetchProducts();
const reviewsPromise = ssrData
  ? createResolvedPromise(ssrData.reviews)
  : fetchReviews();
const categoriesPromise = ssrData
  ? createResolvedPromise(ssrData.categories)
  : fetchCategories();

if (ssrData) {
  console.log("[Client] SSR 데이터 감지 — 서버 데이터를 즉시 사용");
} else {
  console.log("[Client] SSR 데이터 없음 — 클라이언트에서 다시 페칭");
}

const container = document.getElementById("ssr-root")!;

/**
 * hydrateRoot 사용:
 * - 서버에서 렌더링된 HTML을 그대로 유지
 * - React가 DOM 노드를 "인수"하여 이벤트 핸들러를 부착
 * - Suspense 경계별로 독립적으로 hydration 진행
 */
hydrateRoot(
  container,
  <AppShell
    stageNum={stageNum}
    productsPromise={productsPromise}
    reviewsPromise={reviewsPromise}
    categoriesPromise={categoriesPromise}
  />,
);

console.log(`[Client] hydrateRoot 호출 완료 — ${new Date().toISOString()}`);
