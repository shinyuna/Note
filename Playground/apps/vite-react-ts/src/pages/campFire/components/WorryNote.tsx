import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type CSSProperties,
} from 'react';

interface WorryNoteProps {
  text: string | null;
  fireCenter: { x: number; y: number };
  onBurned: () => void;
  onBoostFire: () => void;
}

export function WorryNote({
  text,
  fireCenter,
  onBurned,
  onBoostFire,
}: WorryNoteProps) {
  const [phase, setPhase] = useState<
    'appear' | 'throwing' | 'burning' | 'done'
  >('appear');
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const noteRef = useRef<HTMLDivElement>(null);

  // 시작 위치 계산
  const startX = window.innerWidth / 2;
  const startY = window.innerHeight - 160;

  useEffect(() => {
    if (!text) {
      return;
    }

    setPosition({ x: startX, y: startY });
    setStartPos({ x: startX, y: startY });
    setPhase('appear');
  }, [text, startX, startY]);

  const throwNote = useCallback(() => {
    setPhase('throwing');

    // 1.8초 후 불에 도달
    setTimeout(() => {
      onBoostFire();
      setPhase('burning');

      // 0.8초 후 완전 소멸
      setTimeout(() => {
        setPhase('done');
        onBurned();
      }, 800);
    }, 1800);
  }, [onBoostFire, onBurned]);

  // 드래그 시작
  const handleDragStart = (clientX: number, clientY: number) => {
    if (phase !== 'appear') {
      return;
    }
    setIsDragging(true);
    setHasDragged(false);
    setStartPos({ x: clientX, y: clientY });
  };

  // 드래그 중
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) {
      return;
    }
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // 5px 이상 움직였을 때만 드래그로 인식
    if (distance > 5) {
      setHasDragged(true);
      setPosition({ x: startX + deltaX, y: startY + deltaY });
    }
  };

  // 드래그 종료 -> 던지기
  const handleDragEnd = (clientX: number, clientY: number) => {
    if (!isDragging) {
      return;
    }
    const wasDragging = hasDragged;
    setIsDragging(false);

    if (wasDragging) {
      const deltaX = clientX - startPos.x;
      const deltaY = clientY - startPos.y;
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // 던지기 판정 (최소 속도)
      if (speed > 30) {
        throwNote();
      } else {
        // 원위치
        setPosition({ x: startX, y: startY });
      }
    } else {
      // 드래그가 아니었다면 클릭 이벤트를 막기 위해 hasDragged를 true로 설정
      setHasDragged(true);
      // 다음 이벤트 루프에서 리셋 (클릭 이벤트가 발생하기 전에)
      setTimeout(() => setHasDragged(false), 0);
    }
  };

  // 클릭으로 던지기 (드래그가 발생하지 않았을 때만)
  const handleClick = (e: React.MouseEvent) => {
    // hasDragged가 true면 드래그가 발생했거나 방금 처리된 클릭이므로 무시
    if (hasDragged || isDragging) {
      e.preventDefault();
      e.stopPropagation();

      return;
    }

    if (phase === 'appear') {
      e.preventDefault();
      e.stopPropagation();
      throwNote();
    }
    // 클릭 후 hasDragged 리셋
    setHasDragged(false);
  };

  const containerStyle: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: phase === 'appear' ? 'auto' : 'none',
    zIndex: 20,
  };

  const noteStyle: CSSProperties = {
    position: 'absolute',
    left: isDragging ? position.x : phase === 'appear' ? startX : 0,
    top: isDragging ? position.y : phase === 'appear' ? startY : 0,
    // transform은 애니메이션에서 관리하되, throwing/burning이 아닐 때만 기본값 적용
    transform:
      phase === 'throwing' || phase === 'burning'
        ? undefined // 애니메이션에서 관리
        : 'translate(-50%, -50%)', // appear 상태 및 드래그 중에 적용
    width: 150,
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    cursor: phase === 'appear' ? 'grab' : 'default',
    userSelect: 'none',
    // opacity를 phase에 따라 조절하여 자연스럽게 사라지도록
    opacity: phase === 'burning' ? 0 : 1,
    transition:
      phase === 'burning'
        ? 'opacity 0.3s ease-out'
        : isDragging
          ? 'none'
          : 'all 0.3s ease',

    // 구겨진 종이 이미지 사용 (모든 phase에서 고정)
    backgroundImage: 'url(/fire/assets/paper_crumple.png)',
    backgroundSize: '400%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100%', // 마지막 프레임 (구겨진 상태)

    // 텍스트 숨김
    fontWeight: 600,
    color: phase === 'appear' ? 'transparent' : '#2a2a2a',
    fontSize: phase === 'appear' ? '0px' : '15px',

    // 애니메이션
    animation:
      phase === 'throwing'
        ? `throwToFire 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`
        : 'none',

    willChange: 'transform, opacity, filter',
  };

  const keyframesStyle = `
    @keyframes throwToFire {
      0% {
        left: ${startX}px;
        top: ${startY}px;
        transform: translate(-50%, -50%) scale(1) rotate(0deg);
        opacity: 1;
      }
      50% {
        left: ${fireCenter.x}px;
        top: ${fireCenter.y - 220}px;
        transform: translate(-50%, -50%) scale(0.9) rotate(-45deg);
        opacity: 1;
      }
      100% {
        left: ${fireCenter.x}px;
        top: ${fireCenter.y - 40}px;
        transform: translate(-50%, -50%) scale(0.7) rotate(-90deg);
        opacity: 0.9;
      }
    }

    @keyframes burnUp {
      0% {
        transform: translate(-50%, -50%) scale(0.7) rotate(-90deg);
        opacity: 0.9;
        filter: brightness(1) blur(0px);
      }
      30% {
        transform: translate(-50%, -50%) scale(0.75) rotate(-95deg);
        opacity: 1;
        filter: brightness(1.8) blur(1px);
      }
      60% {
        transform: translate(-50%, -50%) scale(0.6) rotate(-100deg);
        opacity: 0.6;
        filter: brightness(2.2) blur(4px);
      }
      100% {
        transform: translate(-50%, -50%) scale(0.3) rotate(-110deg);
        opacity: 0;
        filter: brightness(3) blur(10px);
      }
    }
  `;

  // text가 없거나 done 상태면 렌더링하지 않음
  if (!text || phase === 'done') {
    return null;
  }

  return (
    <>
      <style>
        {keyframesStyle}
        {`
          @media (max-width: 767px) {
            [data-worry-note] {
              width: 120px !important;
              height: 120px !important;
              font-size: 13px !important;
            }
          }

          @media (max-width: 480px) {
            [data-worry-note] {
              width: 100px !important;
              height: 100px !important;
              font-size: 11px !important;
            }
          }
        `}
      </style>
      <div style={containerStyle}>
        <div
          ref={noteRef}
          data-worry-note
          style={noteStyle}
          onClick={handleClick}
          onMouseDown={(e) => {
            e.preventDefault();
            handleDragStart(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              handleDragMove(e.clientX, e.clientY);
            }
          }}
          onMouseUp={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDragEnd(e.clientX, e.clientY);
          }}
          onMouseLeave={(e) => {
            if (isDragging) {
              handleDragEnd(e.clientX, e.clientY);
            }
          }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            handleDragStart(touch.clientX, touch.clientY);
          }}
          onTouchMove={(e) => {
            const touch = e.touches[0];
            handleDragMove(touch.clientX, touch.clientY);
          }}
          onTouchEnd={(e) => {
            const touch = e.changedTouches[0];
            handleDragEnd(touch.clientX, touch.clientY);
          }}
        >
          {phase !== 'appear' && text}
        </div>
      </div>
    </>
  );
}
