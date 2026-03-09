/**
 * 가짜 API — 설정 가능한 지연 시간 (React 19)
 *
 * 스트리밍 SSR의 효과를 눈으로 확인하기 위해 인위적으로 지연을 건다.
 * - Sidebar: 1초 (가장 빨리 도착)
 * - ProductList: 2초
 * - ReviewSection: 4초 (가장 느리게 도착)
 *
 * React 19에서는 use() 훅을 사용하므로 createResource 패턴이 필요 없다.
 * Promise를 직접 컴포넌트에 전달하면 use() 훅이 Suspense와 함께 처리한다.
 */

import type { Product, Review, Category } from '../types.ts';

// ── 지연 유틸리티 ──────────────────────────────────────────────
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ── 데이터 소스 (하드코딩) ─────────────────────────────────────
const PRODUCTS: Product[] = [
  { id: 1, name: '무선 키보드', price: 89000, category: '전자기기' },
  { id: 2, name: '에르고 마우스', price: 65000, category: '전자기기' },
  { id: 3, name: '모니터 암', price: 45000, category: '가구' },
  { id: 4, name: 'USB-C 허브', price: 35000, category: '전자기기' },
  { id: 5, name: '데스크 매트', price: 28000, category: '액세서리' },
  { id: 6, name: '노트북 스탠드', price: 52000, category: '가구' },
];

const REVIEWS: Review[] = [
  { id: 1, author: '김개발', rating: 5, comment: '키보드 타건감이 정말 좋습니다!' },
  { id: 2, author: '이디자인', rating: 4, comment: '마우스 그립감이 편해요.' },
  { id: 3, author: '박엔지니어', rating: 5, comment: '모니터 암 설치가 간편합니다.' },
  { id: 4, author: '최PM', rating: 3, comment: 'USB-C 허브 발열이 좀 있네요.' },
];

const CATEGORIES: Category[] = [
  { id: 1, name: '전자기기', count: 3 },
  { id: 2, name: '가구', count: 2 },
  { id: 3, name: '액세서리', count: 1 },
];

// ── 비동기 API 함수 ───────────────────────────────────────────

/** 상품 목록 조회 — 2초 지연 */
export async function fetchProducts(): Promise<Product[]> {
  await delay(2000);

  return PRODUCTS;
}

/** 리뷰 목록 조회 — 4초 지연 (가장 느림) */
export async function fetchReviews(): Promise<Review[]> {
  await delay(4000);

  return REVIEWS;
}

/** 카테고리 목록 조회 — 1초 지연 (가장 빠름) */
export async function fetchCategories(): Promise<Category[]> {
  await delay(1000);

  return CATEGORIES;
}

// ── React 19 use() 훅을 위한 Promise 캐싱 유틸리티 ─────────────
/**
 * 이미 resolve된 값을 가진 Promise를 즉시 생성한다.
 *
 * React 19의 use() 훅은 Promise를 받으므로, 서버에서 이미 페칭한 데이터를
 * 클라이언트에서 재사용할 때 이 함수로 즉시 resolve되는 Promise를 만든다.
 *
 * ```tsx
 * // 클라이언트에서 SSR 데이터 재사용
 * const productsPromise = ssrData
 *   ? createResolvedPromise(ssrData.products)
 *   : fetchProducts();
 *
 * // 컴포넌트에서
 * const products = use(productsPromise);
 * ```
 */
export function createResolvedPromise<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

// ── SSR 데이터 전달 인터페이스 ────────────────────────────────
/**
 * 서버 → 클라이언트 데이터 전달을 위한 글로벌 타입
 *
 * 서버에서 renderToString/renderToPipeableStream 후,
 * <script> 태그로 window.__SSR_DATA__에 데이터를 주입한다.
 * 클라이언트는 이 데이터가 있으면 fakeApi를 다시 호출하지 않고 즉시 사용한다.
 *
 * 이것이 없으면 클라이언트가 다시 1초/2초/4초를 기다려야 하므로
 * Stage 2/3의 스트리밍 이점이 완전히 상쇄된다.
 */
export interface SSRData {
  products: Product[];
  reviews: Review[];
  categories: Category[];
}

declare global {
  interface Window {
    __SSR_DATA__?: SSRData;
  }
}
