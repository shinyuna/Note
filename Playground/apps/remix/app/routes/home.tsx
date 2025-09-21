import type { Route } from './+types/home';
import {
  DESIGN_PATTERNS,
  PATTERN_CATEGORIES,
  getPatternsByCategory,
  getPatternStats,
} from '../shared/data/design-patterns';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Design Patterns Playground' },
    {
      name: 'description',
      content: '디자인 패턴을 학습하고 실습할 수 있는 플레이그라운드',
    },
  ];
}

export default function Home() {
  const stats = getPatternStats();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              margin: '0 0 1rem 0',
              textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            🎯 Design Patterns Playground
          </h1>
          <p
            style={{
              fontSize: '1.3rem',
              margin: '0 0 2rem 0',
              opacity: 0.9,
              lineHeight: '1.6',
            }}
          >
            디자인 패턴을 학습하고 실제 코드로 실습할 수 있는 인터랙티브
            플레이그라운드
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '1rem',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                {stats.total}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>전체 패턴</div>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>
                {stats.implemented}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                구현된 패턴
              </div>
            </div>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: '700' }}>3</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>카테고리</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Categories */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              margin: '0 0 3rem 0',
              color: '#1e293b',
            }}
          >
            📚 패턴 카테고리
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
            }}
          >
            {PATTERN_CATEGORIES.map((category) => {
              const categoryPatterns = getPatternsByCategory(category.id);
              const implementedCount = categoryPatterns.filter(
                (p) => p.implemented
              ).length;

              return (
                <div
                  key={category.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: `3px solid ${category.color}`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Category Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '2.5rem',
                        background: category.color,
                        color: 'white',
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {category.icon}
                    </div>
                    <div>
                      <h3
                        style={{
                          margin: '0',
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#1e293b',
                        }}
                      >
                        {category.nameKo}
                      </h3>
                      <p
                        style={{
                          margin: '0.25rem 0 0 0',
                          color: '#64748b',
                          fontSize: '0.9rem',
                        }}
                      >
                        {category.descriptionKo}
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: '#475569',
                        }}
                      >
                        구현 진행률
                      </span>
                      <span
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: category.color,
                        }}
                      >
                        {implementedCount}/{categoryPatterns.length}
                      </span>
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${
                            (implementedCount / categoryPatterns.length) * 100
                          }%`,
                          height: '100%',
                          backgroundColor: category.color,
                          transition: 'width 0.3s ease',
                        }}
                      />
                    </div>
                  </div>

                  {/* Pattern List */}
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {categoryPatterns.map((pattern) => (
                      <a
                        key={pattern.id}
                        href={pattern.route}
                        style={{
                          display: 'block',
                          padding: '1rem',
                          backgroundColor: pattern.implemented
                            ? '#f8fafc'
                            : '#f1f5f9',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          border: '1px solid #e2e8f0',
                          transition: 'all 0.2s',
                          cursor: pattern.implemented ? 'pointer' : 'default',
                          opacity: pattern.implemented ? 1 : 0.6,
                        }}
                        onMouseOver={(e) => {
                          if (pattern.implemented) {
                            e.currentTarget.style.backgroundColor = '#e2e8f0';
                            e.currentTarget.style.transform =
                              'translateY(-2px)';
                            e.currentTarget.style.boxShadow =
                              '0 4px 8px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (pattern.implemented) {
                            e.currentTarget.style.backgroundColor = '#f8fafc';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <h4
                              style={{
                                margin: '0 0 0.25rem 0',
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: pattern.implemented
                                  ? '#1e293b'
                                  : '#64748b',
                              }}
                            >
                              {pattern.nameKo}
                            </h4>
                            <p
                              style={{
                                margin: '0',
                                fontSize: '0.8rem',
                                color: '#64748b',
                                lineHeight: '1.4',
                              }}
                            >
                              {pattern.descriptionKo}
                            </p>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                            }}
                          >
                            <span
                              style={{
                                padding: '0.25rem 0.5rem',
                                backgroundColor:
                                  pattern.difficulty === 'beginner'
                                    ? '#dcfce7'
                                    : pattern.difficulty === 'intermediate'
                                      ? '#fef3c7'
                                      : '#fee2e2',
                                color:
                                  pattern.difficulty === 'beginner'
                                    ? '#166534'
                                    : pattern.difficulty === 'intermediate'
                                      ? '#92400e'
                                      : '#991b1b',
                                borderRadius: '4px',
                                fontSize: '0.7rem',
                                fontWeight: '500',
                              }}
                            >
                              {pattern.difficulty === 'beginner' && '초급'}
                              {pattern.difficulty === 'intermediate' && '중급'}
                              {pattern.difficulty === 'advanced' && '고급'}
                            </span>
                            {pattern.implemented ? (
                              <span
                                style={{ color: '#22c55e', fontSize: '1.2rem' }}
                              >
                                ✅
                              </span>
                            ) : (
                              <span
                                style={{ color: '#94a3b8', fontSize: '1.2rem' }}
                              >
                                ⏳
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section
        style={{
          backgroundColor: 'white',
          padding: '4rem 2rem',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <div
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '800',
              margin: '0 0 1.5rem 0',
              color: '#1e293b',
            }}
          >
            🚀 시작해보기
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: '#64748b',
              lineHeight: '1.6',
              margin: '0 0 2rem 0',
            }}
          >
            각 디자인 패턴을 클릭하여 상세한 설명과 실제 동작하는 코드 예제를
            확인해보세요. 이론과 실습을 함께 학습할 수 있습니다.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem',
            }}
          >
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📖</div>
              <h3
                style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                }}
              >
                이론 학습
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                }}
              >
                각 패턴의 개념, 구조, 사용 사례를 체계적으로 학습
              </p>
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💻</div>
              <h3
                style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                }}
              >
                코드 실습
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                }}
              >
                실제 동작하는 TypeScript/React 코드로 패턴 구현 체험
              </p>
            </div>
            <div
              style={{
                padding: '1.5rem',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              <h3
                style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                }}
              >
                실전 적용
              </h3>
              <p
                style={{
                  margin: '0',
                  fontSize: '0.9rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                }}
              >
                실제 프로젝트에서 활용할 수 있는 실용적인 예제 제공
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
