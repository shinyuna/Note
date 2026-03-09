# Streaming SSR 학습 (React 19)

React 19의 SSR 진화 3단계를 직접 구현하고 비교하는 학습 프로젝트.

**React 19 주요 변경점**: `use()` 훅으로 Promise를 직접 읽을 수 있어 `createResource` 패턴이 더 이상 필요 없다.

## 실행 방법

```bash
# 의존성 설치
pnpm install

# SSR 서버 실행 (포트 5174)
pnpm dev:ssr

# 기존 SPA는 별도로 실행 가능 (포트 5173, 영향 없음)
pnpm dev
```

- 랜딩 페이지: http://localhost:5174/
- Stage 1: http://localhost:5174/stage/1
- Stage 2: http://localhost:5174/stage/2
- Stage 3: http://localhost:5174/stage/3

## 3단계 비교표

| | Stage 1 | Stage 2 | Stage 3 |
|---|---------|---------|---------|
| **API** | `renderToString` | `renderToPipeableStream` | `renderToPipeableStream` + `hydrateRoot` |
| **TTFB** | ~4초 (가장 느린 API에 종속) | 즉시 (셸만 전송) | 즉시 (셸만 전송) |
| **사용자 경험** | 4초간 빈 화면 | 즉시 스켈레톤 → 점진적 콘텐츠 | 즉시 스켈레톤 → 점진적 콘텐츠 + 인터랙션 |
| **데이터 전송** | 한 번에 전체 | 청크 단위 스트리밍 | 청크 단위 스트리밍 |
| **Hydration** | 전체 한 번에 | 전체 한 번에 | Suspense 경계별 독립 |
| **인터랙션** | Hydration 완료 후 | Hydration 완료 후 | 클릭 시 해당 영역 우선 hydration |

## 핵심 개념

### 1. renderToString의 한계

```
클라이언트 요청
    ↓
서버: fetchProducts() ──── 2초 대기
서버: fetchReviews()  ──── 4초 대기 ← 병목!
서버: fetchCategories() ── 1초 대기
    ↓
모든 데이터 준비 (4초 후)
    ↓
renderToString → 전체 HTML 생성
    ↓
res.end(html) → 한 번에 전송
```

문제: 가장 느린 API(4초)가 전체 응답을 블로킹한다.

### 2. renderToPipeableStream의 해결

```
클라이언트 요청
    ↓
서버: 데이터 페칭 시작 (await 없이!)
    ↓
renderToPipeableStream 시작
    ↓
onShellReady (즉시!)
    ↓ Header + Skeleton 전송
    ↓
~1초 후: Sidebar 데이터 준비 → 청크 전송
~2초 후: ProductList 데이터 준비 → 청크 전송
~4초 후: ReviewSection 데이터 준비 → 청크 전송 + 완료
```

핵심: `onShellReady`에서 셸을 즉시 전송하고, 각 Suspense 경계가 resolve되면 해당 청크를 추가 전송한다.

### 3. Selective Hydration

서버 렌더링은 Stage 2와 동일하지만, 클라이언트에서의 hydration이 다르다:

- **기존 hydration**: 전체 앱을 한 번에 hydrate → 모든 JS가 로드/실행될 때까지 인터랙션 불가
- **선택적 hydration**: 각 Suspense 경계를 독립적으로 hydrate
  - 사용자가 아직 hydration되지 않은 영역을 클릭하면
  - React가 해당 영역의 hydration 우선순위를 높임
  - 해당 영역이 즉시 인터랙티브해짐

### 4. React 19 use() 훅 (공식 패턴)

```tsx
import { use } from 'react';

function ProductList({ productsPromise }: { productsPromise: Promise<Product[]> }) {
  // React 19의 use() 훅 — Promise를 직접 읽음
  const products = use(productsPromise);
  
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}

// 부모 컴포넌트
function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProductList productsPromise={fetchProducts()} />
    </Suspense>
  );
}
```

**React 18의 createResource 패턴 (deprecated)**:
```typescript
// ❌ React 18 방식 — 더 이상 필요 없음
function createResource<T>(promise: Promise<T>): Resource<T> {
  let status = 'pending';
  let result: T;

  const suspender = promise.then(
    r => { status = 'success'; result = r; },
    e => { status = 'error'; result = e; }
  );

  return {
    read() {
      if (status === 'pending') throw suspender;
      if (status === 'error') throw result;
      return result;
    }
  };
}

// ✅ React 19 방식 — use() 훅 사용
const products = use(productsPromise);  // 끝!
```

### 5. Vite Middleware Mode

```
Express 서버 (포트 5174)
    │
    ├── vite.middlewares  ← HMR, 정적 파일, TS 변환
    │
    └── app.get('/stage/:n')  ← SSR 라우트 핸들러
          │
          ├── vite.transformIndexHtml()  ← HTML 변환
          ├── vite.ssrLoadModule()       ← entry-server.tsx 로드
          └── render(req, res, template, stageNum)
```

Vite를 `middlewareMode`로 생성하면 Express가 HTML 응답을 직접 제어하면서도, HMR과 TS 변환은 Vite가 처리한다.

## 검증 방법

### Network 탭으로 확인

1. **Stage 1**: 요청 후 ~4초 뒤 전체 응답이 한 번에 도착
2. **Stage 2**: 요청 직후 셸이 도착하고, 이후 1초/2초/4초에 추가 청크
3. **Stage 3**: Stage 2와 동일한 네트워크 패턴

### Console 탭으로 확인

각 컴포넌트가 렌더링/hydration될 때 타임스탬프가 출력된다:

```
[Client] Hydration 시작 — Stage 3 — 2024-01-01T00:00:00.000Z
[Client] hydrateRoot 호출 완료 — 2024-01-01T00:00:00.010Z
[Sidebar] 렌더링 완료 — 2024-01-01T00:00:01.000Z
[ProductList] 렌더링 완료 — 2024-01-01T00:00:02.000Z
[ReviewSection] 렌더링 완료 — 2024-01-01T00:00:04.000Z
```

### JS 비활성화 테스트

DevTools → Settings → Debugger → Disable JavaScript 체크 후:
- Stage 2/3에 접근하면 서버 렌더링된 HTML이 정상 표시됨
- 인터랙션(버튼 클릭 등)은 동작하지 않음
- 이것이 SSR의 핵심 가치: JS 없이도 콘텐츠를 볼 수 있다

### Stage 3 선택적 hydration 테스트

1. Stage 3 페이지 로드
2. Sidebar가 먼저 나타남 (1초)
3. ProductList가 나타남 (2초) — 이때 상품을 클릭해보기
4. ReviewSection이 나타남 (4초) — "도움이 돼요" 버튼 클릭해보기
5. 콘솔에서 hydration 순서와 클릭 반응 타이밍 관찰

## 파일 구조

```
streaming-ssr/
├── README.md                          # 이 파일
├── types.ts                           # 공유 타입 정의
├── entry-client.tsx                   # 클라이언트 hydration 진입점
├── entry-server.tsx                   # 서버 렌더링 진입점
│
├── components/
│   ├── AppShell.tsx                   # SSR 레이아웃 셸
│   ├── Header.tsx                     # 정적 헤더 (즉시 렌더링)
│   ├── ProductList.tsx                # 상품 목록 (2초 지연)
│   ├── ReviewSection.tsx              # 리뷰 섹션 (4초 지연)
│   ├── Sidebar.tsx                    # 사이드바 (1초 지연)
│   └── Skeleton.tsx                   # Suspense fallback
│
├── data/
│   └── fakeApi.ts                     # 가짜 API + createResource
│
└── stages/
    ├── stage1-render-to-string.tsx     # renderToString
    ├── stage2-streaming.tsx            # renderToPipeableStream
    └── stage3-selective-hydration.tsx   # Selective Hydration
```

## 참고 자료

- [React 18: New Suspense SSR Architecture](https://github.com/reactwg/react-18/discussions/37)
- [Vite SSR Guide](https://vite.dev/guide/ssr)
- [renderToPipeableStream API Reference](https://react.dev/reference/react-dom/server/renderToPipeableStream)
