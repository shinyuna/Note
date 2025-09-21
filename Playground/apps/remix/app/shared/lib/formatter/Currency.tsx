import type { ReactNode } from 'react';
import { useSyncExternalStore } from 'react';

// Flyweight 패턴의 핵심: Intrinsic State (내재적 상태)
// 여러 객체가 공유할 수 있는 불변 데이터
interface CurrencyFormatterConfig {
  readonly locale: string;
  readonly currency: string;
  readonly minimumFractionDigits: number;
  readonly maximumFractionDigits: number;
}

// Flyweight 클래스: 공유 가능한 포맷팅 로직을 담당
class CurrencyFormatter {
  private readonly config: CurrencyFormatterConfig;
  private readonly formatter: Intl.NumberFormat;

  constructor(config: CurrencyFormatterConfig) {
    this.config = config;
    // Intl.NumberFormat 인스턴스도 내재적 상태의 일부
    this.formatter = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      minimumFractionDigits: config.minimumFractionDigits,
      maximumFractionDigits: config.maximumFractionDigits,
    });
  }

  // Extrinsic State (외재적 상태)를 매개변수로 받아 포맷팅 수행
  format(amount: number): string {
    return this.formatter.format(amount);
  }

  getLocale(): string {
    return this.config.locale;
  }

  getCurrency(): string {
    return this.config.currency;
  }
}

// Flyweight Factory: Flyweight 객체들을 생성하고 관리
class CurrencyFormatterFactory {
  private static instance: CurrencyFormatterFactory;
  private flyweights: Map<string, CurrencyFormatter> = new Map();
  private listeners: Set<() => void> = new Set();
  private cachedSnapshot: { count: number; keys: string[] } | null = null;

  private constructor() {}

  static getInstance(): CurrencyFormatterFactory {
    if (!CurrencyFormatterFactory.instance) {
      CurrencyFormatterFactory.instance = new CurrencyFormatterFactory();
    }
    return CurrencyFormatterFactory.instance;
  }

  // 상태 변경 리스너 등록
  addListener(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // 상태 변경 알림
  private notifyListeners(): void {
    // 캐시된 스냅샷 무효화
    this.cachedSnapshot = null;
    this.listeners.forEach((listener) => listener());
  }

  // 최적화된 스냅샷 가져오기 (캐싱 사용)
  getSnapshot(): { count: number; keys: string[] } {
    if (!this.cachedSnapshot) {
      this.cachedSnapshot = {
        count: this.flyweights.size,
        keys: Array.from(this.flyweights.keys()),
      };
    }
    return this.cachedSnapshot;
  }

  // 키를 기반으로 flyweight 객체를 반환 (재사용)
  getCurrencyFormatter(
    locale: string,
    currency: string,
    minimumFractionDigits: number = 2,
    maximumFractionDigits: number = 2
  ): CurrencyFormatter {
    const key = `${locale}-${currency}-${minimumFractionDigits}-${maximumFractionDigits}`;

    if (!this.flyweights.has(key)) {
      console.log(`새로운 CurrencyFormatter 생성: ${key}`);
      this.flyweights.set(
        key,
        new CurrencyFormatter({
          locale,
          currency,
          minimumFractionDigits,
          maximumFractionDigits,
        })
      );
      // 새로운 객체가 생성될 때마다 리스너들에게 알림
      this.notifyListeners();
    } else {
      console.log(`기존 CurrencyFormatter 재사용: ${key}`);
    }

    return this.flyweights.get(key)!;
  }

  // 팩토리에서 관리 중인 flyweight 객체 수 반환
  getCreatedFlyweightsCount(): number {
    return this.flyweights.size;
  }

  // 디버깅용: 생성된 모든 flyweight 키 반환
  getAllKeys(): string[] {
    return Array.from(this.flyweights.keys());
  }
}

// React 컴포넌트 Props 타입
interface CurrencyProps {
  amount: number; // Extrinsic State
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  className?: string;
  children?: (
    formattedAmount: string,
    formatter: CurrencyFormatter
  ) => ReactNode;
}

// React 컴포넌트: Flyweight 패턴을 사용하는 클라이언트
export function Currency({
  amount,
  locale = 'ko-KR',
  currency = 'KRW',
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
  className,
  children,
}: CurrencyProps) {
  // Factory를 통해 flyweight 객체 획득
  const factory = CurrencyFormatterFactory.getInstance();
  const formatter = factory.getCurrencyFormatter(
    locale,
    currency,
    minimumFractionDigits,
    maximumFractionDigits
  );

  // Extrinsic State (amount)를 전달하여 포맷팅 수행
  const formattedAmount = formatter.format(amount);

  // Render Props 패턴 지원
  if (children) {
    return <>{children(formattedAmount, formatter)}</>;
  }

  return (
    <span className={className} title={`${amount} ${currency}`}>
      {formattedAmount}
    </span>
  );
}

// 편의를 위한 미리 정의된 컴포넌트들
export const KoreanWon = (
  props: Omit<CurrencyProps, 'locale' | 'currency'>
) => <Currency {...props} locale="ko-KR" currency="KRW" />;

export const USDollar = (props: Omit<CurrencyProps, 'locale' | 'currency'>) => (
  <Currency {...props} locale="en-US" currency="USD" />
);

export const Euro = (props: Omit<CurrencyProps, 'locale' | 'currency'>) => (
  <Currency {...props} locale="de-DE" currency="EUR" />
);

export const JapaneseYen = (
  props: Omit<CurrencyProps, 'locale' | 'currency'>
) => <Currency {...props} locale="ja-JP" currency="JPY" />;

// Factory 상태를 실시간으로 추적하는 훅 (useSyncExternalStore 사용)
export function useCurrencyFormatterStats() {
  const factory = CurrencyFormatterFactory.getInstance();

  // subscribe 함수: 상태 변경을 구독
  const subscribe = (onStoreChange: () => void) => {
    return factory.addListener(onStoreChange);
  };

  // getSnapshot 함수: 현재 상태를 반환 (캐싱된 스냅샷 사용)
  const getSnapshot = () => factory.getSnapshot();

  // getServerSnapshot 함수: SSR을 위한 초기 상태
  const getServerSnapshot = () => {
    return {
      count: 0,
      keys: [],
    };
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Factory 인스턴스를 외부에서도 접근할 수 있도록 export
export { CurrencyFormatterFactory };
