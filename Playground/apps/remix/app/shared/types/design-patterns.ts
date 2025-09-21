// 디자인 패턴 카테고리 타입
export type PatternCategoryType = 'creational' | 'structural' | 'behavioral';

// 난이도 레벨
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// 패턴 메타데이터
export interface DesignPattern {
  id: string;
  name: string;
  nameKo: string;
  category: PatternCategoryType;
  difficulty: DifficultyLevel;
  description: string;
  descriptionKo: string;
  useCases: string[];
  useCasesKo: string[];
  pros: string[];
  prosKo: string[];
  cons: string[];
  consKo: string[];
  relatedPatterns: string[];
  tags: string[];
  implemented: boolean;
  route: string;
}

// 카테고리 메타데이터
export interface PatternCategory {
  id: PatternCategoryType;
  name: string;
  nameKo: string;
  description: string;
  descriptionKo: string;
  color: string;
  icon: string;
}

// 패턴 통계
export interface PatternStats {
  total: number;
  implemented: number;
  byCategory: Record<PatternCategoryType, number>;
  byDifficulty: Record<DifficultyLevel, number>;
}
