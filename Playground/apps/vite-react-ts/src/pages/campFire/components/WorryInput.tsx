import { Cross1Icon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import { useState } from 'react';

import type { CSSProperties } from 'react';

interface WorryInputProps {
  onThrow: (worry: string) => void;
  disabled?: boolean;
  onCrumpleStart?: () => void;
}

const MAX_TEXT_LENGTH = 200;
const CRUMBLE_DURATION = 1000;

export function WorryInput({
  onThrow,
  disabled,
  onCrumpleStart,
}: WorryInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isCrumpling, setIsCrumpling] = useState(false);

  const handleOpen = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    if (!isCrumpling) {
      setText('');
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (text.trim() && !disabled && !isCrumpling) {
      // 1단계: 구김 애니메이션 시작
      setIsCrumpling(true);
      onCrumpleStart?.();

      // 0.8초 후 실제 던지기 실행 (애니메이션 시간과 동기화)
      setTimeout(() => {
        onThrow(text.trim());
        setText('');
        setIsCrumpling(false);
        setIsOpen(false); // textarea 닫기
      }, CRUMBLE_DURATION);
    }
  };

  const formStyle: CSSProperties = {
    position: 'fixed',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    width: '90%',
    maxWidth: '720px',
  };

  const textareaWrapperStyle: CSSProperties = {
    aspectRatio: '2/3',
    position: 'relative',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: isOpen ? 'translateY(0)' : 'translateY(30px)',
    opacity: isOpen ? 1 : 0,
    maxHeight: isOpen ? '450px' : '0',
    marginBottom: isOpen ? '16px' : '0',
    borderRadius: '8px',
    boxShadow: isCrumpling
      ? 'none'
      : isFocused
        ? '0 0 30px rgba(255, 140, 60, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)'
        : '0 8px 25px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.2)',
  };

  const paperImageStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  const spriteStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage: 'url(/fire/assets/paper_crumple.png)',
    backgroundSize: '400%', // 4개 프레임이 가로로 나열
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '0% 50%', // 세로 중앙 정렬
    transformOrigin: '50% 60%', // 손으로 뭉치는 느낌 보정
    borderRadius: '8px',
    zIndex: 2, // textarea 위에 표시
    pointerEvents: 'none', // 클릭 이벤트는 textarea로 전달
    animation: `crumpleSprite ${CRUMBLE_DURATION}ms steps(3, end) forwards`,
  };

  const textareaStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    padding: '20px 30px',
    fontSize: '0.825rem',
    lineHeight: '1.85',
    border: 'none',
    background: 'transparent',
    display: isCrumpling ? 'none' : 'block',
    color: isCrumpling ? 'transparent' : '#4F3422',
    resize: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    transition: isCrumpling ? 'none' : 'all 0.3s ease',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    boxSizing: 'border-box',
  };

  const openButtonStyle: CSSProperties = {
    padding: '16px 48px',
    fontSize: '1rem',
    fontWeight: '600',
    borderRadius: '32px',
    border: 'none',
    background: disabled
      ? 'rgba(100, 100, 100, 0.5)'
      : 'linear-gradient(135deg, #ff6b35, #ff8c42)',
    color: 'white',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.3s ease',
    boxShadow: !disabled ? '0 6px 20px rgba(255, 107, 53, 0.5)' : 'none',
    display: isOpen ? 'none' : 'block',
    minHeight: '44px',
    minWidth: '44px',
  };

  const submitButtonStyle: CSSProperties = {
    padding: '14px 40px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '28px',
    border: 'none',
    background:
      disabled || !text.trim() || isCrumpling
        ? 'rgba(100, 100, 100, 0.5)'
        : 'linear-gradient(135deg, #ff6b35, #ff8c42)',
    color: 'white',
    cursor: disabled || !text.trim() || isCrumpling ? 'not-allowed' : 'pointer',
    opacity: disabled || !text.trim() || isCrumpling ? 0.5 : 1,
    transition: 'all 0.3s ease',
    boxShadow:
      !disabled && text.trim() && !isCrumpling
        ? '0 4px 15px rgba(255, 107, 53, 0.4)'
        : 'none',
    display: isOpen ? 'block' : 'none',
    margin: '0 auto',
    minHeight: '44px',
    minWidth: '44px',
  };

  const charCountStyle: CSSProperties = {
    position: 'absolute',
    bottom: '14px',
    right: '20px',
    fontSize: '12px',
    color:
      text.length > MAX_TEXT_LENGTH * 0.9
        ? 'rgba(255, 100, 100, 0.8)'
        : 'rgba(100, 80, 60, 0.7)',
    zIndex: 2,
    pointerEvents: 'none',
  };

  const cancelButtonStyle: CSSProperties = {
    position: 'absolute',
    top: -30,
    right: 5,
    zIndex: 10,
    cursor: isCrumpling ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: isCrumpling ? 0.5 : 1,
    pointerEvents: isCrumpling ? 'none' : 'auto',
  };

  return (
    <>
      <style>
        {`
          @keyframes crumpleSprite {
            0% { background-position: 0%; }
            to { background-position: 100%; }
          }

          @media (max-width: 767px) {
            [data-worry-input-form] {
              bottom: 20px !important;
              width: 95% !important;
            }

            [data-worry-input-textarea] {
              padding: 16px 20px !important;
              font-size: 0.875rem !important;
            }

            [data-worry-input-open-button] {
              padding: 14px 32px !important;
              font-size: 0.9rem !important;
            }

            [data-worry-input-submit-button] {
              padding: 12px 28px !important;
              font-size: 14px !important;
            }

            [data-worry-input-textarea-wrapper] {
              max-height: 350px !important;
            }
          }

          @media (max-width: 480px) {
            [data-worry-input-form] {
              bottom: 30px !important;
            }

            [data-worry-input-textarea-wrapper] {
              max-height: 300px !important;
            }
          }
        `}
      </style>
      <div data-worry-input-form style={formStyle}>
        {/* 초기 열기 버튼 */}
        <button
          type="button"
          data-worry-input-open-button
          onClick={handleOpen}
          disabled={disabled}
          style={openButtonStyle}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 8px 25px rgba(255, 107, 53, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = !disabled
              ? '0 6px 20px rgba(255, 107, 53, 0.5)'
              : 'none';
          }}
        >
          🔥 걱정/근심/불안 소각하기
        </button>

        {/* textarea 폼 */}
        {isOpen && (
          <form onSubmit={handleSubmit}>
            <div data-worry-input-textarea-wrapper style={textareaWrapperStyle}>
              {/* 스프라이트 애니메이션 (구김 중일 때만 표시) */}
              {isCrumpling ? (
                <div style={spriteStyle} />
              ) : (
                <>
                  {/* 닫기 버튼 */}
                  <IconButton
                    size="1"
                    color="orange"
                    variant="soft"
                    aria-label="취소"
                    onClick={handleCancel}
                    disabled={isCrumpling}
                    style={cancelButtonStyle}
                  >
                    <Cross1Icon width="12" height="12" />
                  </IconButton>

                  {/* 기본 종이 이미지 */}
                  <img
                    alt="감정 종이"
                    style={paperImageStyle}
                    src="/fire/assets/worry_paper.webp"
                  />
                  <textarea
                    data-worry-input-textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="지금 날 괴롭히는 생각을 적어보세요..."
                    disabled={disabled || isCrumpling}
                    maxLength={MAX_TEXT_LENGTH}
                    style={textareaStyle}
                    autoFocus
                  />
                  <p style={charCountStyle}>
                    {text.length} / {MAX_TEXT_LENGTH}
                  </p>
                </>
              )}
            </div>

            <button
              type="submit"
              data-worry-input-submit-button
              style={submitButtonStyle}
              disabled={disabled || !text.trim() || isCrumpling}
              onMouseEnter={(e) => {
                if (!disabled && text.trim() && !isCrumpling) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow =
                    '0 6px 20px rgba(255, 107, 53, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  !disabled && text.trim() && !isCrumpling
                    ? '0 4px 15px rgba(255, 107, 53, 0.4)'
                    : 'none';
              }}
            >
              {isCrumpling ? '구기는 중...' : '🔥 걱정/근심/불안 구겨버리기'}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
