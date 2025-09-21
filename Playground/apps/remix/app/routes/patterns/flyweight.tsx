import type { Route } from './+types/flyweight';
import { PatternLayout } from '../../shared/components/PatternLayout';
import { getPatternById } from '../../shared/data/design-patterns';
import {
  Currency,
  KoreanWon,
  USDollar,
  Euro,
  JapaneseYen,
  useCurrencyFormatterStats,
} from '../../shared/lib/formatter/Currency';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Flyweight Pattern - Design Patterns Playground' },
    {
      name: 'description',
      content: 'Flyweight 패턴을 학습하고 실습할 수 있는 인터랙티브 데모',
    },
  ];
}

export default function FlyweightPattern() {
  const pattern = getPatternById('flyweight');

  if (!pattern) {
    return <div>패턴을 찾을 수 없습니다.</div>;
  }

  // 다양한 금액들 (Extrinsic State)
  const amounts = [1000, 15000, 250000, 1500000, 99999999];

  // Factory 상태를 실시간으로 추적
  const factoryStats = useCurrencyFormatterStats();

  return (
    <PatternLayout pattern={pattern}>
      {/* Pattern Overview */}
      <section style={{ marginBottom: '3rem' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}
        >
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              color: '#1e293b',
            }}
          >
            📖 패턴 개요
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: '#475569',
              margin: '0 0 1.5rem 0',
            }}
          >
            Flyweight 패턴은 <strong>구조적 디자인 패턴</strong>으로, 많은 수의
            유사한 객체를 효율적으로 관리하기 위해 사용됩니다. 객체의 상태를{' '}
            <strong>내재적 상태(Intrinsic State)</strong>와{' '}
            <strong>외재적 상태(Extrinsic State)</strong>로 분리하여 메모리
            사용량을 최소화합니다.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                border: '1px solid #bbf7d0',
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  margin: '0 0 0.75rem 0',
                  color: '#166534',
                }}
              >
                🔒 내재적 상태 (Intrinsic State)
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '0.95rem',
                  color: '#15803d',
                  lineHeight: '1.5',
                }}
              >
                여러 객체가 공유할 수 있는 불변 데이터. 예: 통화 포맷팅 규칙,
                로케일 설정, 폰트 정보 등
              </p>
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                border: '1px solid #fed7aa',
              }}
            >
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  margin: '0 0 0.75rem 0',
                  color: '#92400e',
                }}
              >
                🔓 외재적 상태 (Extrinsic State)
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '0.95rem',
                  color: '#b45309',
                  lineHeight: '1.5',
                }}
              >
                각 객체마다 다른 가변 데이터. 클라이언트가 매개변수로 전달. 예:
                실제 금액, 텍스트 내용, 위치 좌표 등
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section style={{ marginBottom: '3rem' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}
        >
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              color: '#1e293b',
            }}
          >
            🎯 실시간 데모
          </h2>

          {/* Pattern Efficiency Info */}
          <div
            style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                margin: '0 0 1rem 0',
                color: '#1e293b',
              }}
            >
              📊 패턴 효율성 정보
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#10b981',
                  }}
                >
                  {factoryStats.count}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  생성된 Flyweight 객체
                </div>
              </div>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#3b82f6',
                  }}
                >
                  {amounts.length * 4 + 8}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                  총 렌더링된 컴포넌트
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: '0 0 0.5rem 0',
                  color: '#475569',
                }}
              >
                생성된 Formatter 키:
              </h4>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {factoryStats.keys.length === 0 ? (
                  <span
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#fef3c7',
                      color: '#92400e',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                    }}
                  >
                    아직 생성되지 않음 (아래 데모를 확인해보세요!)
                  </span>
                ) : (
                  factoryStats.keys.map((key) => (
                    <span
                      key={key}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: '#e0f2fe',
                        color: '#0369a1',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                      }}
                    >
                      {key}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '2rem' }}>
            {/* Basic Currency Component */}
            <div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  margin: '0 0 1rem 0',
                  color: '#1e293b',
                }}
              >
                💰 기본 Currency 컴포넌트
              </h3>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {amounts.map((amount) => (
                  <div
                    key={amount}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <span
                      style={{
                        fontWeight: '600',
                        marginRight: '1rem',
                        color: '#64748b',
                        minWidth: '120px',
                      }}
                    >
                      ₩{amount.toLocaleString()}
                    </span>
                    <span
                      style={{
                        margin: '0 1rem',
                        color: '#94a3b8',
                        fontSize: '1.2rem',
                      }}
                    >
                      →
                    </span>
                    <div
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#10b981',
                      }}
                    >
                      <Currency amount={amount} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Multi-Currency Format */}
            <div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  margin: '0 0 1rem 0',
                  color: '#1e293b',
                }}
              >
                🌍 다양한 통화 포맷
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {amounts.slice(0, 3).map((amount) => (
                  <div
                    key={amount}
                    style={{
                      padding: '1.5rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: '600',
                        marginBottom: '1rem',
                        color: '#1e293b',
                        fontSize: '1.1rem',
                      }}
                    >
                      원본: {amount.toLocaleString()}
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '0.75rem',
                      }}
                    >
                      <div
                        style={{
                          padding: '0.75rem',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#64748b',
                            marginBottom: '0.25rem',
                          }}
                        >
                          🇰🇷 한국 원화
                        </div>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#1e293b',
                          }}
                        >
                          <KoreanWon amount={amount} />
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '0.75rem',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#64748b',
                            marginBottom: '0.25rem',
                          }}
                        >
                          🇺🇸 미국 달러
                        </div>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#1e293b',
                          }}
                        >
                          <USDollar
                            amount={amount}
                            minimumFractionDigits={2}
                            maximumFractionDigits={2}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '0.75rem',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#64748b',
                            marginBottom: '0.25rem',
                          }}
                        >
                          🇪🇺 유로
                        </div>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#1e293b',
                          }}
                        >
                          <Euro
                            amount={amount}
                            minimumFractionDigits={2}
                            maximumFractionDigits={2}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          padding: '0.75rem',
                          backgroundColor: 'white',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.8rem',
                            color: '#64748b',
                            marginBottom: '0.25rem',
                          }}
                        >
                          🇯🇵 일본 엔화
                        </div>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#1e293b',
                          }}
                        >
                          <JapaneseYen amount={amount} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Render Props Pattern Example */}
            <div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  margin: '0 0 1rem 0',
                  color: '#1e293b',
                }}
              >
                🎨 Render Props 패턴
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {amounts.slice(0, 2).map((amount) => (
                  <Currency
                    key={amount}
                    amount={amount}
                    locale="en-US"
                    currency="USD"
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                  >
                    {(formattedAmount, formatter) => (
                      <div
                        style={{
                          padding: '1.5rem',
                          background:
                            'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          borderRadius: '12px',
                          color: 'white',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            marginBottom: '0.5rem',
                          }}
                        >
                          {formattedAmount}
                        </div>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            opacity: 0.9,
                            display: 'flex',
                            gap: '1rem',
                          }}
                        >
                          <span>로케일: {formatter.getLocale()}</span>
                          <span>통화: {formatter.getCurrency()}</span>
                        </div>
                      </div>
                    )}
                  </Currency>
                ))}
              </div>
            </div>

            {/* Flyweight Reuse Demo */}
            <div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  margin: '0 0 1rem 0',
                  color: '#1e293b',
                }}
              >
                🔄 Flyweight 재사용 데모
              </h3>
              <p
                style={{
                  color: '#64748b',
                  marginBottom: '1rem',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                }}
              >
                동일한 로케일/통화 설정을 여러 번 사용해도 하나의 Flyweight
                객체만 생성됩니다. 개발자 도구 콘솔에서 로그를 확인해보세요!
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '0.75rem',
                }}
              >
                {[
                  1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000,
                ].map((amount) => (
                  <div
                    key={amount}
                    style={{
                      padding: '0.75rem',
                      textAlign: 'center',
                      backgroundColor: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#10b981';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1e293b',
                      }}
                    >
                      <KoreanWon amount={amount} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section style={{ marginBottom: '3rem' }}>
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0',
          }}
        >
          <h2
            style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              margin: '0 0 1rem 0',
              color: '#1e293b',
            }}
          >
            💻 코드 예제
          </h2>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              marginBottom: '1.5rem',
              lineHeight: '1.6',
            }}
          >
            실제 구현된 Flyweight 패턴의 핵심 구조를 확인해보세요:
          </p>

          <div
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '8px',
              padding: '1.5rem',
              color: '#e2e8f0',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              lineHeight: '1.5',
              overflow: 'auto',
            }}
          >
            <pre style={{ margin: 0 }}>
              {`// Flyweight 클래스: 공유 가능한 포맷팅 로직
class CurrencyFormatter {
  private readonly config: CurrencyFormatterConfig;
  private readonly formatter: Intl.NumberFormat;

  constructor(config: CurrencyFormatterConfig) {
    this.config = config; // Intrinsic State
    this.formatter = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      // ... 기타 설정
    });
  }

  // Extrinsic State를 매개변수로 받아 처리
  format(amount: number): string {
    return this.formatter.format(amount);
  }
}

// Flyweight Factory: 객체 생성 및 관리
class CurrencyFormatterFactory {
  private flyweights: Map<string, CurrencyFormatter> = new Map();

  getCurrencyFormatter(locale, currency, ...): CurrencyFormatter {
    const key = \`\${locale}-\${currency}-...\`;
    
    if (!this.flyweights.has(key)) {
      // 새로운 flyweight 생성
      this.flyweights.set(key, new CurrencyFormatter(config));
    }
    
    return this.flyweights.get(key)!; // 기존 객체 재사용
  }
}`}
            </pre>
          </div>
        </div>
      </section>
    </PatternLayout>
  );
}
