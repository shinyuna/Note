/**
 * 서버 렌더링 진입점
 *
 * Express 서버(server/index.ts)에서 vite.ssrLoadModule()로 이 파일을 로드한다.
 * stageNum에 따라 적절한 렌더링 함수를 호출한다.
 *
 * 이 파일이 서버-사이드 렌더링의 "허브" 역할을 한다:
 * - Stage 1: renderToString (블로킹)
 * - Stage 2: renderToPipeableStream (스트리밍)
 * - Stage 3: renderToPipeableStream + Selective Hydration (스트리밍 + 선택적 hydration)
 */

import { renderStage1 } from "./stages/stage1-render-to-string.tsx";
import { renderStage2 } from "./stages/stage2-streaming.tsx";
import { renderStage3 } from "./stages/stage3-selective-hydration.tsx";

import type { StageNumber } from "./types.ts";
import type { Request, Response } from "express";

export async function render(
  req: Request,
  res: Response,
  template: string,
  stageNum: number,
): Promise<void> {
  const stage = stageNum as StageNumber;

  switch (stage) {
    case 1:
      return renderStage1(req, res, template, stage);
    case 2:
      return renderStage2(req, res, template, stage);
    case 3:
      return renderStage3(req, res, template, stage);
    default:
      res.status(404).end("알 수 없는 스테이지");
  }
}
