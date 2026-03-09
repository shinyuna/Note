/**
 * 리뷰 섹션 — 비동기 데이터 (4초 지연)
 *
 * 가장 느리게 도착하는 비동기 섹션.
 * Stage 1에서는 이 섹션 때문에 전체 TTFB가 4초가 된다.
 * Stage 2/3에서는 다른 섹션이 먼저 표시된 후 마지막으로 도착한다.
 *
 * Stage 3에서는 "도움이 돼요" 카운터로 hydration 상태를 확인할 수 있다.
 *
 * React 19: use() 훅으로 Promise를 직접 읽는다.
 */

import { use, useState } from "react";

import type { Review } from "../types.ts";

interface ReviewSectionProps {
  reviewsPromise: Promise<Review[]>;
}

export default function ReviewSection({ reviewsPromise }: ReviewSectionProps) {
  // React 19의 use() 훅 — Promise를 Suspense와 함께 사용
  const reviews = use(reviewsPromise);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>(
    {},
  );

  console.log(`[ReviewSection] 렌더링 완료 — ${new Date().toISOString()}`);

  const handleHelpful = (reviewId: number) => {
    console.log(
      `[ReviewSection] "도움이 돼요" 클릭 — hydration 확인 (review ${reviewId})`,
    );
    setHelpfulCounts((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] ?? 0) + 1,
    }));
  };

  return (
    <section
      style={{
        background: "#e3f2fd",
        borderRadius: "12px",
        padding: "1.2rem",
        border: "2px solid #90caf9",
      }}
    >
      <h3
        style={{ fontSize: "1rem", marginBottom: "0.8rem", color: "#1565c0" }}
      >
        💬 리뷰
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              padding: "0.8rem",
              background: "#fff",
              borderRadius: "8px",
              border: "1px solid #bbdefb",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.3rem",
              }}
            >
              <span style={{ fontWeight: 500 }}>{review.author}</span>
              <span style={{ color: "#f9a825" }}>
                {"⭐".repeat(review.rating)}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#555",
                marginBottom: "0.5rem",
              }}
            >
              {review.comment}
            </p>
            <button
              onClick={() => handleHelpful(review.id)}
              style={{
                background: "none",
                border: "1px solid #90caf9",
                borderRadius: "6px",
                padding: "0.3rem 0.8rem",
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#1565c0",
              }}
            >
              👍 도움이 돼요{" "}
              {helpfulCounts[review.id] ? `(${helpfulCounts[review.id]})` : ""}
            </button>
          </div>
        ))}
      </div>
      <p style={{ marginTop: "0.8rem", fontSize: "0.8rem", color: "#999" }}>
        💡 "도움이 돼요" 버튼을 클릭해보세요 — hydration 전에는 카운트가
        올라가지 않습니다
      </p>
    </section>
  );
}
