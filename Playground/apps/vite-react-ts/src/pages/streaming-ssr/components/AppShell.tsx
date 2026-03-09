/**
 * SSR 전용 레이아웃 셸 (React 19)
 *
 * 이 컴포넌트가 서버에서 렌더링되는 최상위 레이아웃이다.
 * - Header는 정적이므로 즉시 렌더링된다 (셸의 일부)
 * - Sidebar, ProductList, ReviewSection은 각각 Suspense로 감싸져 있다
 *
 * React 19에서는 Promise를 직접 props로 전달하고, 자식 컴포넌트에서 use() 훅으로 읽는다.
 * Stage 2/3에서 onShellReady 시점에 Header + Skeleton fallback이 먼저 전송되고,
 * 각 데이터가 준비되면 해당 Suspense 경계의 실제 콘텐츠가 스트리밍된다.
 */

import { Suspense } from "react";

import Header from "./Header.tsx";
import ProductList from "./ProductList.tsx";
import ReviewSection from "./ReviewSection.tsx";
import Sidebar from "./Sidebar.tsx";
import Skeleton from "./Skeleton.tsx";

import type { Product, Review, Category, StageNumber } from "../types.ts";

export interface AppShellProps {
  stageNum: StageNumber;
  productsPromise: Promise<Product[]>;
  reviewsPromise: Promise<Review[]>;
  categoriesPromise: Promise<Category[]>;
}

export default function AppShell({
  stageNum,
  productsPromise,
  reviewsPromise,
  categoriesPromise,
}: AppShellProps) {
  return (
    <div style={{ maxWidth: "960px", margin: "0 auto", padding: "1.5rem" }}>
      {/* Header는 정적 — 셸의 일부로 즉시 전송 */}
      <Header stageNum={stageNum} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: "1.5rem",
        }}
      >
        {/* Sidebar: 1초 후 도착 */}
        <Suspense fallback={<Skeleton label="카테고리" height="300px" />}>
          <Sidebar categoriesPromise={categoriesPromise} />
        </Suspense>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* ProductList: 2초 후 도착 */}
          <Suspense fallback={<Skeleton label="상품 목록" height="400px" />}>
            <ProductList productsPromise={productsPromise} />
          </Suspense>

          {/* ReviewSection: 4초 후 도착 (가장 느림) */}
          <Suspense fallback={<Skeleton label="리뷰" height="350px" />}>
            <ReviewSection reviewsPromise={reviewsPromise} />
          </Suspense>
        </div>
      </div>

      {/* 타임라인 정보 (학습 보조) */}
      <footer
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#fafafa",
          borderRadius: "8px",
          fontSize: "0.8rem",
          color: "#999",
        }}
      >
        <p>🕐 Sidebar: ~1초 | ProductList: ~2초 | ReviewSection: ~4초</p>
        <p>💡 DevTools → Network 탭에서 응답 시간과 청크 전송을 관찰하세요</p>
        <p>
          📝 콘솔에서 각 컴포넌트의 렌더링/hydration 타임스탬프를 확인하세요
        </p>
      </footer>
    </div>
  );
}
