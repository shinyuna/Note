/**
 * Suspense fallback 스켈레톤 UI
 *
 * 스트리밍 SSR에서 아직 데이터가 도착하지 않은 섹션에 표시된다.
 * Stage 2/3에서 이 스켈레톤이 먼저 보이고, 데이터가 준비되면 실제 콘텐츠로 교체된다.
 */

import type React from 'react';

interface SkeletonProps {
  label: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ label, height = '200px' }) => (
  <div
    style={{
      height,
      background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#999',
      fontSize: '0.9rem',
    }}
  >
    {label} 로딩 중...
    <style>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

export default Skeleton;
