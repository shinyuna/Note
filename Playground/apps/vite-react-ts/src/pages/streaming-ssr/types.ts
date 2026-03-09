/**
 * Streaming SSR 학습 프로젝트 — 공유 타입 (React 19)
 *
 * React 19에서는 use() 훅을 사용하여 Promise를 직접 컴포넌트에서 읽을 수 있다.
 * 더 이상 createResource 패턴이 필요하지 않다.
 */

/** 상품 데이터 */
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

/** 리뷰 데이터 */
export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
}

/** 사이드바 카테고리 */
export interface Category {
  id: number;
  name: string;
  count: number;
}

/**
 * React 19 use() 훅 패턴
 *
 * React 19에서는 use() 훅으로 Promise를 직접 읽는다:
 *
 * ```tsx
 * import { use } from 'react';
 *
 * function ProductList({ productsPromise }: { productsPromise: Promise<Product[]> }) {
 *   const products = use(productsPromise);  // Suspense가 자동 처리
 *   return <ul>{products.map(...)}</ul>;
 * }
 * ```
 *
 * 이 패턴은 서버(renderToPipeableStream)와 클라이언트(hydrateRoot) 양쪽에서 동작한다.
 * Suspense 경계 안에서 use()를 호출하면:
 * - Promise가 pending → 가장 가까운 Suspense의 fallback 표시
 * - Promise가 fulfilled → 데이터 반환, 컴포넌트 렌더링
 * - Promise가 rejected → ErrorBoundary로 전파
 */

/** SSR 렌더링 스테이지 번호 */
export type StageNumber = 1 | 2 | 3;
