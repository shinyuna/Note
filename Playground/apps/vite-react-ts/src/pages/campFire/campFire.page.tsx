import { useState, useRef, useEffect } from 'react';

import { CampfireCanvas } from './components/CampfireCanvas';
import { WorryInput } from './components/WorryInput';
import { WorryNote } from './components/WorryNote';

import type { CampfireHandle, Worry } from './types';
import type { CSSProperties } from 'react';

export default function CampFirePage() {
  const [worries, setWorries] = useState<Worry[]>([]);
  const [activeWorry, setActiveWorry] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const campfireRef = useRef<CampfireHandle>(null);

  // LocalStorage에서 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('burned-worries');

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWorries(parsed);
      } catch (e) {
        console.error('Failed to parse stored worries:', e);
      }
    }
  }, []);

  // LocalStorage에 저장
  useEffect(() => {
    if (worries.length > 0) {
      localStorage.setItem('burned-worries', JSON.stringify(worries));
    }
  }, [worries]);

  const handleThrowWorry = (text: string) => {
    setActiveWorry(text);
  };

  const handleWorryBurned = () => {
    if (activeWorry) {
      setWorries((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: activeWorry,
          timestamp: Date.now(),
        },
      ]);

      // 피드백 메시지 표시
      setFeedbackMessage('감정 소각 완료 💨');
      setTimeout(() => setFeedbackMessage(null), 2000);
    }
    setActiveWorry(null);
  };

  const handleBoostFire = () => {
    campfireRef.current?.boostFire();
  };

  const getFireCenter = () =>
    campfireRef.current?.getFireCenter() || {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.72,
    };

  const containerStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    background: '#0b1020',
  };

  const backgroundStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0,
  };

  const backgroundImgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const titleStyle: CSSProperties = {
    position: 'fixed',
    top: '40px',
    width: '100%',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '600',
    color: 'rgba(255, 220, 180, 0.9)',
    zIndex: 10,
    letterSpacing: '0.05em',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  };

  const subtitleStyle: CSSProperties = {
    position: 'fixed',
    top: '80px',
    width: '100%',
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(255, 220, 180, 0.6)',
    zIndex: 10,
    letterSpacing: '0.03em',
  };

  const statsStyle: CSSProperties = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '6px 12px',
    background: 'rgba(20, 25, 35, 0.7)',
    borderRadius: '16px',
    color: 'rgba(255, 220, 180, 0.7)',
    fontSize: '11px',
    zIndex: 10,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 220, 180, 0.2)',
    fontWeight: '500',
  };

  const feedbackStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px 40px',
    background: 'rgba(20, 25, 35, 0.95)',
    borderRadius: '16px',
    color: 'rgba(255, 220, 180, 0.95)',
    fontSize: '20px',
    fontWeight: '600',
    zIndex: 30,
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 140, 60, 0.5)',
    boxShadow: '0 10px 40px rgba(255, 140, 60, 0.3)',
    animation: 'fadeInOut 2s ease-in-out forwards',
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.9);
            }
            20% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            80% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.95);
            }
          }

          @media (max-width: 767px) {
            [data-campfire-title] {
              top: 50px !important;
              font-size: 18px !important;
              padding: 0 80px 0 16px !important;
            }

            [data-campfire-subtitle] {
              top: 80px !important;
              font-size: 12px !important;
              padding: 0 80px 0 16px !important;
            }

            [data-campfire-stats] {
              top: 12px !important;
              left: 12px !important;
              right: auto !important;
              padding: 4px 10px !important;
              border-radius: 12px !important;
              font-size: 10px !important;
            }

            [data-campfire-feedback] {
              padding: 16px 24px !important;
              border-radius: 12px !important;
              font-size: 16px !important;
              max-width: 90% !important;
            }
          }
        `}
      </style>

      {/* 배경 이미지 */}
      <picture style={backgroundStyle}>
        <source srcSet="/fire/assets/background.webp" type="image/webp" />
        <img
          src="/fire/assets/background.png"
          alt="forest background"
          style={backgroundImgStyle}
        />
      </picture>

      {/* 모닥불 캔버스 */}
      <CampfireCanvas ref={campfireRef} />

      {/* 제목 */}
      <div data-campfire-title style={titleStyle}>
        나를 괴롭히는 감정들을 불에 던져보세요
      </div>
      <div data-campfire-subtitle style={subtitleStyle}>
        불꽃과 함께 마음이 가벼워집니다 🔥
      </div>

      {/* 날아가는 쪽지 */}
      {activeWorry && (
        <WorryNote
          text={activeWorry}
          fireCenter={getFireCenter()}
          onBurned={handleWorryBurned}
          onBoostFire={handleBoostFire}
        />
      )}

      {/* 입력 폼 */}
      <WorryInput onThrow={handleThrowWorry} disabled={activeWorry !== null} />

      {/* 피드백 메시지 */}
      {feedbackMessage && (
        <div data-campfire-feedback style={feedbackStyle}>
          {feedbackMessage}
        </div>
      )}

      {/* 통계 */}
      {worries.length > 0 && (
        <div data-campfire-stats style={statsStyle}>
          🔥 {worries.length}개의 감정을 태웠어요
        </div>
      )}
    </div>
  );
}
