import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const PORT = 5174;

async function createServer() {
  const app = express();

  // Vite를 middleware mode로 생성 — HMR, TS 변환은 Vite가 처리
  const vite = await createViteServer({
    root,
    server: { middlewareMode: true },
    appType: 'custom', // Express가 HTML 응답을 직접 제어
  });

  // Vite의 내부 미들웨어 사용 (HMR, 정적 파일 등)
  app.use(vite.middlewares);

  // 랜딩 페이지: 3단계 비교를 위한 네비게이션
  app.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`
      <!DOCTYPE html>
      <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Streaming SSR 학습</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0f0f0f; color: #e0e0e0; min-height: 100vh; display: flex; align-items: center; justify-content: center; }
          .container { max-width: 640px; width: 100%; padding: 2rem; }
          h1 { font-size: 1.8rem; margin-bottom: 0.5rem; color: #fff; }
          p { color: #888; margin-bottom: 2rem; font-size: 0.95rem; }
          .stages { display: flex; flex-direction: column; gap: 1rem; }
          a { display: block; padding: 1.2rem 1.5rem; border-radius: 12px; text-decoration: none; color: #fff; transition: transform 0.15s, box-shadow 0.15s; }
          a:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
          .s1 { background: linear-gradient(135deg, #e74c3c, #c0392b); }
          .s2 { background: linear-gradient(135deg, #f39c12, #e67e22); }
          .s3 { background: linear-gradient(135deg, #2ecc71, #27ae60); }
          .stage-title { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.3rem; }
          .stage-desc { font-size: 0.85rem; opacity: 0.85; }
          .badge { display: inline-block; font-size: 0.7rem; padding: 2px 8px; border-radius: 4px; background: rgba(255,255,255,0.2); margin-bottom: 0.4rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Streaming SSR 학습</h1>
          <p>React 18의 SSR 진화 3단계를 직접 비교해보세요.</p>
          <div class="stages">
            <a href="/stage/1" class="s1">
              <span class="badge">Stage 1</span>
              <div class="stage-title">renderToString — 전통적 블로킹 SSR</div>
              <div class="stage-desc">모든 데이터를 기다린 후 완성된 HTML을 한 번에 전송. TTFB ≈ 4초</div>
            </a>
            <a href="/stage/2" class="s2">
              <span class="badge">Stage 2</span>
              <div class="stage-title">renderToPipeableStream — 스트리밍 SSR</div>
              <div class="stage-desc">셸을 즉시 전송하고, Suspense 경계마다 청크를 추가 전송. TTFB ≈ 즉시</div>
            </a>
            <a href="/stage/3" class="s3">
              <span class="badge">Stage 3</span>
              <div class="stage-title">Selective Hydration — 선택적 하이드레이션</div>
              <div class="stage-desc">스트리밍 + 사용자 인터랙션에 반응하여 우선 hydration. 클릭해보세요!</div>
            </a>
          </div>
        </div>
      </body>
      </html>
    `);
  });

  // SSR 라우트 핸들러
  app.get('/stage/:stageNum', async (req, res) => {
    const stageNum = parseInt(req.params.stageNum, 10);

    if (stageNum < 1 || stageNum > 3) {
      res.status(404).end('Stage 1~3만 지원합니다.');

      return;
    }

    try {
      // 1. index-ssr.html 템플릿 읽기
      let template = fs.readFileSync(
        path.resolve(root, 'index-ssr.html'),
        'utf-8'
      );

      // 2. Vite의 HTML 변환 적용 (HMR 클라이언트 주입 등)
      template = await vite.transformIndexHtml(`/stage/${stageNum}`, template);

      // 3. entry-server.tsx를 SSR 모듈로 로드
      const { render } = await vite.ssrLoadModule(
        '/src/pages/streaming-ssr/entry-server.tsx'
      );

      // 4. 스테이지별 렌더링 실행
      await render(req, res, template, stageNum);
    } catch (e) {
      // Vite가 SSR 에러의 스택트레이스를 수정
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e);
      res.status(500).end(String(e));
    }
  });

  app.listen(PORT, () => {
    console.log(`\n  🚀 SSR 서버 실행 중: http://localhost:${PORT}\n`);
    console.log(`  Stage 1 (renderToString):        http://localhost:${PORT}/stage/1`);
    console.log(`  Stage 2 (Streaming):             http://localhost:${PORT}/stage/2`);
    console.log(`  Stage 3 (Selective Hydration):    http://localhost:${PORT}/stage/3\n`);
  });
}

createServer();
