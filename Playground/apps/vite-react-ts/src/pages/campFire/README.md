# 🔥 CampFire - 고민을 불에 던지는 위로 서비스

## 개요
고민과 걱정을 쪽지에 적어 모닥불에 던지면, 불꽃과 함께 사라지는 감성적인 위로 서비스입니다.

## 주요 기능

### 1. 실시간 모닥불 렌더링
- Canvas 2D API 기반의 물리 시뮬레이션
- 1000개 이상의 파티클로 구현된 사실적인 불꽃
- 불꽃, 불똥, 연기, 재 등 다양한 파티클 타입
- 바람, 난류, 중력 등의 물리 효과

### 2. 인터랙티브 경험
- 모닥불 터치 시 불꽃이 커지는 부스트 효과
- 쪽지가 불로 날아가는 부드러운 애니메이션
- 불에 닿으면 타오르는 연출

### 3. 고민 기록
- LocalStorage를 활용한 클라이언트 저장
- 태운 고민 개수 통계
- 프라이버시 보장 (서버 전송 없음)

### 4. 몰입형 사운드
- 불 타는 소리 (fire-crackling.mp3)
- 숲 속 배경음 (forest.mp3)
- 불똥 튀는 효과음 (fire-pops.mp3)

## 기술 스택

### Frontend
- **React 19** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Canvas 2D API** - 모닥불 렌더링
- **CSS Animations** - 쪽지 애니메이션

### 아키텍처
- **Thinking in React** 원칙 준수
- 단방향 데이터 흐름 (Top-Down)
- 역방향 이벤트 흐름 (Bottom-Up Callbacks)
- 명확한 책임 분리 (Single Responsibility)

## 컴포넌트 구조

```
CampFirePage (Container)
├── CampfireCanvas (모닥불 렌더링 + 물리 시뮬레이션)
├── WorryInput (고민 입력 폼)
├── WorryNote (날아가는 쪽지 애니메이션)
└── Stats (태운 고민 통계)
```

### CampfireCanvas
- 1000개 파티클 관리
- 60fps 렌더링
- 불 클릭 감지
- `boostFire()` 외부 API 제공

### WorryInput
- 고민 텍스트 입력 (최대 100자)
- 입력 중 시각적 피드백
- 유효성 검사

### WorryNote
- CSS 키프레임 애니메이션
- 2단계 애니메이션 (날아가기 → 타오르기)
- 불 부스트 트리거

## 데이터 흐름

```
[사용자 입력]
    ↓
WorryInput (onThrow)
    ↓
CampFirePage (setActiveWorry)
    ↓
WorryNote (날아가는 애니메이션)
    ↓
불에 도달 (onBoostFire)
    ↓
CampfireCanvas.boostFire() (불 커짐)
    ↓
WorryNote (타오르는 애니메이션)
    ↓
CampFirePage (onBurned → worries 배열 추가)
    ↓
LocalStorage 저장
```

## 파일 구조

```
src/pages/campFire/
├── campFire.page.tsx        # 메인 컨테이너
├── types.ts                  # TypeScript 타입 정의
├── components/
│   ├── CampfireCanvas.tsx   # 모닥불 렌더링
│   ├── WorryInput.tsx       # 입력 폼
│   ├── WorryNote.tsx        # 쪽지 애니메이션
│   └── index.ts             # Exports
└── hooks/
    ├── useWorryStorage.ts   # LocalStorage 관리
    └── index.ts             # Exports

public/fire/assets/
├── background.webp          # 숲 배경 이미지
├── background.png           # 폴백 이미지
├── fire-crackling.mp3       # 불 소리
├── forest.mp3               # 숲 소리
└── fire-pops.mp3            # 효과음
```

## 성능 최적화

1. **스프라이트 캐싱**
   - 불꽃 텍스처를 미리 생성하여 재사용
   - 매 프레임 그리기 비용 절감

2. **파티클 풀링**
   - 최대 1000개로 제한
   - 오래된 파티클 자동 제거

3. **requestAnimationFrame**
   - 브라우저 최적화된 60fps
   - vsync 동기화

4. **이미지 최적화**
   - WebP 포맷 우선 사용
   - PNG 폴백 제공

## 사용 방법

### 1. 개발 서버 실행
```bash
cd Playground/apps/vite-react-ts
npm run dev
```

### 2. 페이지 접속
```
http://localhost:5173/campfire
```

### 3. 고민 작성
- 텍스트박스에 고민 입력 (최대 100자)
- "🔥 불에 던지기" 버튼 클릭

### 4. 불 터치
- 모닥불을 클릭/터치하면 불꽃이 커짐

## 향후 개선 사항

### UX 개선
- [ ] 쪽지 스타일 커스터마이징
- [ ] 다크/라이트 모드
- [ ] 통계 페이지 추가

### 기술 개선
- [ ] WebGL로 마이그레이션 (10,000+ 파티클)
- [ ] 모바일 성능 최적화
- [ ] PWA 지원

### 기능 추가
- [ ] 명상 타이머
- [ ] 위로의 메시지 표시
- [ ] SNS 공유 기능
- [ ] 익명 커뮤니티 (선택적)

## 브라우저 지원
- Chrome/Edge (권장)
- Firefox
- Safari
- 모바일 브라우저

## 라이선스
MIT License

## 제작자
YoonG - 2024

