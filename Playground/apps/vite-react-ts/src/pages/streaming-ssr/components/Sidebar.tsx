/**
 * 사이드바 — 카테고리 목록 (1초 지연)
 *
 * 가장 빠르게 도착하는 비동기 섹션.
 * Stage 2/3에서 약 1초 후 스켈레톤이 이 컴포넌트로 교체된다.
 *
 * React 19: use() 훅으로 Promise를 직접 읽는다.
 */

import { use } from "react";

import type { Category } from "../types.ts";

interface SidebarProps {
  categoriesPromise: Promise<Category[]>;
}

export default function Sidebar({ categoriesPromise }: SidebarProps) {
  // React 19의 use() 훅 — Promise를 Suspense와 함께 사용
  // pending 상태면 Suspense가 fallback을 표시, fulfilled면 데이터 반환
  const categories = use(categoriesPromise);

  console.log(`[Sidebar] 렌더링 완료 — ${new Date().toISOString()}`);

  return (
    <aside
      style={{
        background: "#e8f5e9",
        borderRadius: "12px",
        padding: "1.2rem",
        border: "2px solid #a5d6a7",
      }}
    >
      <h3
        style={{ fontSize: "1rem", marginBottom: "0.8rem", color: "#2e7d32" }}
      >
        📂 카테고리
      </h3>
      <ul style={{ listStyle: "none" }}>
        {categories.map((cat) => (
          <li
            key={cat.id}
            style={{
              padding: "0.5rem 0",
              borderBottom: "1px solid #c8e6c9",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.9rem",
            }}
          >
            <span>{cat.name}</span>
            <span style={{ color: "#666", fontSize: "0.8rem" }}>
              {cat.count}개
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
