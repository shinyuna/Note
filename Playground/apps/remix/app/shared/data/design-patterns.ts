import type { DesignPattern, PatternCategory, PatternCategoryType } from '../types/design-patterns';

// 카테고리 정의
export const PATTERN_CATEGORIES: PatternCategory[] = [
  {
    id: 'creational',
    name: 'Creational Patterns',
    nameKo: '생성 패턴',
    description: 'Deal with object creation mechanisms',
    descriptionKo: '객체 생성 메커니즘을 다루는 패턴',
    color: '#3b82f6',
    icon: '🏗️',
  },
  {
    id: 'structural',
    name: 'Structural Patterns',
    nameKo: '구조 패턴',
    description: 'Deal with object composition',
    descriptionKo: '객체 구성을 다루는 패턴',
    color: '#10b981',
    icon: '🔗',
  },
  {
    id: 'behavioral',
    name: 'Behavioral Patterns',
    nameKo: '행동 패턴',
    description: 'Deal with communication between objects',
    descriptionKo: '객체 간 통신을 다루는 패턴',
    color: '#f59e0b',
    icon: '⚡',
  },
];

// 디자인 패턴 데이터
export const DESIGN_PATTERNS: DesignPattern[] = [
  // Structural Patterns
  {
    id: 'flyweight',
    name: 'Flyweight Pattern',
    nameKo: '플라이웨이트 패턴',
    category: 'structural',
    difficulty: 'intermediate',
    description: 'Minimize memory usage by sharing common parts of state between multiple objects',
    descriptionKo: '여러 객체 간 상태의 공통 부분을 공유하여 메모리 사용량을 최소화하는 패턴',
    useCases: [
      'Text editors (character formatting)',
      'Game development (sprites, particles)',
      'UI frameworks (theme, styling)',
      'Caching systems',
    ],
    useCasesKo: [
      '텍스트 에디터 (문자 포맷팅)',
      '게임 개발 (스프라이트, 파티클)',
      'UI 프레임워크 (테마, 스타일링)',
      '캐싱 시스템',
    ],
    pros: [
      'Reduces memory consumption',
      'Improves performance',
      'Supports large numbers of objects',
    ],
    prosKo: [
      '메모리 사용량 감소',
      '성능 향상',
      '대량의 객체 지원',
    ],
    cons: [
      'Increases code complexity',
      'May introduce CPU overhead',
      'Context passing required',
    ],
    consKo: [
      '코드 복잡성 증가',
      'CPU 오버헤드 발생 가능',
      '컨텍스트 전달 필요',
    ],
    relatedPatterns: ['factory', 'singleton'],
    tags: ['memory', 'performance', 'sharing', 'optimization'],
    implemented: true,
    route: '/patterns/flyweight',
  },

  // Creational Patterns
  {
    id: 'singleton',
    name: 'Singleton Pattern',
    nameKo: '싱글톤 패턴',
    category: 'creational',
    difficulty: 'beginner',
    description: 'Ensure a class has only one instance and provide global access to it',
    descriptionKo: '클래스의 인스턴스가 하나만 존재하도록 보장하고 전역 접근을 제공하는 패턴',
    useCases: [
      'Database connections',
      'Logging services',
      'Configuration managers',
      'Cache managers',
    ],
    useCasesKo: [
      '데이터베이스 연결',
      '로깅 서비스',
      '설정 관리자',
      '캐시 관리자',
    ],
    pros: [
      'Controlled access to sole instance',
      'Reduced memory footprint',
      'Global access point',
    ],
    prosKo: [
      '단일 인스턴스에 대한 제어된 접근',
      '메모리 사용량 감소',
      '전역 접근점',
    ],
    cons: [
      'Difficult to unit test',
      'Can become a bottleneck',
      'Violates Single Responsibility Principle',
    ],
    consKo: [
      '단위 테스트 어려움',
      '병목점이 될 수 있음',
      '단일 책임 원칙 위반',
    ],
    relatedPatterns: ['factory', 'abstract-factory'],
    tags: ['global', 'instance', 'control'],
    implemented: false,
    route: '/patterns/singleton',
  },

  {
    id: 'factory',
    name: 'Factory Pattern',
    nameKo: '팩토리 패턴',
    category: 'creational',
    difficulty: 'beginner',
    description: 'Create objects without specifying their concrete classes',
    descriptionKo: '구체적인 클래스를 지정하지 않고 객체를 생성하는 패턴',
    useCases: [
      'UI component creation',
      'Database driver selection',
      'Plugin systems',
      'Object pools',
    ],
    useCasesKo: [
      'UI 컴포넌트 생성',
      '데이터베이스 드라이버 선택',
      '플러그인 시스템',
      '객체 풀',
    ],
    pros: [
      'Loose coupling',
      'Easy to extend',
      'Centralized object creation',
    ],
    prosKo: [
      '느슨한 결합',
      '확장 용이성',
      '중앙집중식 객체 생성',
    ],
    cons: [
      'Can become complex',
      'May introduce unnecessary abstraction',
    ],
    consKo: [
      '복잡해질 수 있음',
      '불필요한 추상화 도입 가능',
    ],
    relatedPatterns: ['abstract-factory', 'builder'],
    tags: ['creation', 'abstraction', 'flexibility'],
    implemented: false,
    route: '/patterns/factory',
  },

  // Behavioral Patterns
  {
    id: 'observer',
    name: 'Observer Pattern',
    nameKo: '옵저버 패턴',
    category: 'behavioral',
    difficulty: 'intermediate',
    description: 'Define a subscription mechanism to notify multiple objects about events',
    descriptionKo: '이벤트에 대해 여러 객체에 알림을 보내는 구독 메커니즘을 정의하는 패턴',
    useCases: [
      'Event handling systems',
      'Model-View architectures',
      'Real-time notifications',
      'State management',
    ],
    useCasesKo: [
      '이벤트 처리 시스템',
      'Model-View 아키텍처',
      '실시간 알림',
      '상태 관리',
    ],
    pros: [
      'Loose coupling',
      'Dynamic relationships',
      'Broadcast communication',
    ],
    prosKo: [
      '느슨한 결합',
      '동적 관계',
      '브로드캐스트 통신',
    ],
    cons: [
      'Memory leaks if not handled properly',
      'Unexpected updates',
      'Complex debugging',
    ],
    consKo: [
      '적절히 처리하지 않으면 메모리 누수',
      '예상치 못한 업데이트',
      '복잡한 디버깅',
    ],
    relatedPatterns: ['mediator', 'command'],
    tags: ['notification', 'subscription', 'event', 'reactive'],
    implemented: false,
    route: '/patterns/observer',
  },

  {
    id: 'strategy',
    name: 'Strategy Pattern',
    nameKo: '전략 패턴',
    category: 'behavioral',
    difficulty: 'beginner',
    description: 'Define a family of algorithms and make them interchangeable',
    descriptionKo: '알고리즘 패밀리를 정의하고 상호 교환 가능하게 만드는 패턴',
    useCases: [
      'Payment processing',
      'Sorting algorithms',
      'Validation strategies',
      'Compression algorithms',
    ],
    useCasesKo: [
      '결제 처리',
      '정렬 알고리즘',
      '검증 전략',
      '압축 알고리즘',
    ],
    pros: [
      'Runtime algorithm switching',
      'Easy to extend',
      'Eliminates conditional statements',
    ],
    prosKo: [
      '런타임 알고리즘 전환',
      '확장 용이성',
      '조건문 제거',
    ],
    cons: [
      'Increased number of classes',
      'Client must be aware of strategies',
    ],
    consKo: [
      '클래스 수 증가',
      '클라이언트가 전략을 알아야 함',
    ],
    relatedPatterns: ['state', 'template-method'],
    tags: ['algorithm', 'interchangeable', 'runtime'],
    implemented: false,
    route: '/patterns/strategy',
  },
];

// 헬퍼 함수들
export const getPatternsByCategory = (category: PatternCategoryType) => {
  return DESIGN_PATTERNS.filter(pattern => pattern.category === category);
};

export const getImplementedPatterns = () => {
  return DESIGN_PATTERNS.filter(pattern => pattern.implemented);
};

export const getPatternById = (id: string) => {
  return DESIGN_PATTERNS.find(pattern => pattern.id === id);
};

export const getPatternStats = () => {
  const stats = {
    total: DESIGN_PATTERNS.length,
    implemented: getImplementedPatterns().length,
    byCategory: {} as Record<PatternCategoryType, number>,
    byDifficulty: {} as Record<string, number>,
  };

  DESIGN_PATTERNS.forEach(pattern => {
    stats.byCategory[pattern.category] = (stats.byCategory[pattern.category] || 0) + 1;
    stats.byDifficulty[pattern.difficulty] = (stats.byDifficulty[pattern.difficulty] || 0) + 1;
  });

  return stats;
};
