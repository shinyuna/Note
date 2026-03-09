/**
 * 상품 목록 — 비동기 데이터 (2초 지연)
 *
 * 중간 속도로 도착하는 비동기 섹션.
 * Stage 3에서는 카운터 버튼이 추가되어 hydration 상태를 확인할 수 있다.
 *
 * React 19: use() 훅으로 Promise를 직접 읽는다.
 */

import { use, useState } from "react";

import type { Product } from "../types.ts";

interface ProductListProps {
  productsPromise: Promise<Product[]>;
}

export default function ProductList({ productsPromise }: ProductListProps) {
  // React 19의 use() 훅 — Promise를 Suspense와 함께 사용
  const products = use(productsPromise);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelect = (productId: number) => {
    console.log(`[ProductList] 상품 선택 — hydration 확인: ${productId}`);
    setSelectedId(productId);
  };

  console.log(`[ProductList] 렌더링 완료 — ${new Date().toISOString()}`);

  return (
    <section
      style={{
        background: "#fff3e0",
        borderRadius: "12px",
        padding: "1.2rem",
        border: "2px solid #ffcc80",
      }}
    >
      <h3
        style={{ fontSize: "1rem", marginBottom: "0.8rem", color: "#e65100" }}
      >
        🛒 상품 목록
      </h3>
      <div style={{ display: "grid", gap: "0.8rem" }}>
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              handleSelect(product.id);
            }}
            style={{
              padding: "0.8rem",
              background: selectedId === product.id ? "#ffe0b2" : "#fff",
              borderRadius: "8px",
              border: "1px solid #ffe0b2",
              cursor: "default",
              transition: "background 0.2s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 500 }}>{product.name}</span>
              <span style={{ color: "#e65100" }}>
                ₩{product.price.toLocaleString()}
              </span>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#999" }}>
              {product.category}
            </span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: "0.8rem", fontSize: "0.8rem", color: "#999" }}>
        💡 상품을 클릭해보세요 — hydration 전에는 반응하지 않습니다
      </p>
    </section>
  );
}
