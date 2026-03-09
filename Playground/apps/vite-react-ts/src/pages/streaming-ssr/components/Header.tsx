/**
 * 정적 헤더 — 즉시 렌더링
 *
 * SSR에서 셸(shell)의 일부로, 데이터 페칭 없이 즉시 렌더링된다.
 * Stage 2/3에서 이 헤더는 TTFB 시점에 바로 사용자에게 전달된다.
 */

import type { StageNumber } from "../types.ts";
import type React from "react";

interface HeaderProps {
  stageNum: StageNumber;
}

const STAGE_INFO: Record<
  StageNumber,
  { title: string; color: string; description: string }
> = {
  1: {
    title: "Stage 1: renderToString",
    color: "#e74c3c",
    description: "전통적 블로킹 SSR — 모든 데이터를 기다린 후 한 번에 전송",
  },
  2: {
    title: "Stage 2: renderToPipeableStream",
    color: "#f39c12",
    description: "스트리밍 SSR — 셸을 즉시 전송, 이후 청크 추가 전송",
  },
  3: {
    title: "Stage 3: Selective Hydration",
    color: "#2ecc71",
    description:
      "선택적 하이드레이션 — 사용자 인터랙션에 반응하여 우선 hydration",
  },
};

const Header: React.FC<HeaderProps> = ({ stageNum }) => {
  const info = STAGE_INFO[stageNum];

  return (
    <header
      style={{
        background: info.color,
        color: "#fff",
        padding: "1.5rem 2rem",
        borderRadius: "12px",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "1.4rem", marginBottom: "0.3rem" }}>
            {info.title}
          </h1>
          <p style={{ fontSize: "0.9rem", opacity: 0.9 }}>{info.description}</p>
        </div>
        <a
          href="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: "8px",
            fontSize: "0.85rem",
          }}
        >
          ← 목록
        </a>
      </div>
    </header>
  );
};

export default Header;
