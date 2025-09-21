import type { ReactNode } from 'react';
import type { DesignPattern } from '../types/design-patterns';

interface PatternLayoutProps {
  pattern: DesignPattern;
  children: ReactNode;
}

export function PatternLayout({ pattern, children }: PatternLayoutProps) {
  const categoryColors = {
    creational: '#3b82f6',
    structural: '#10b981',
    behavioral: '#f59e0b',
  };

  const difficultyColors = {
    beginner: '#22c55e',
    intermediate: '#f59e0b',
    advanced: '#ef4444',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '1rem 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="/"
              style={{
                textDecoration: 'none',
                color: '#64748b',
                fontSize: '0.9rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                backgroundColor: '#f1f5f9',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e2e8f0';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }}
            >
              ← 패턴 목록으로 돌아가기
            </a>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
              {pattern.nameKo}
            </h1>
          </nav>
        </div>
      </header>

      {/* Pattern Info Banner */}
      <div
        style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '2rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto auto',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <div>
              <h2
                style={{
                  margin: '0 0 0.5rem 0',
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: '#1e293b',
                }}
              >
                {pattern.nameKo}
              </h2>
              <p
                style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.1rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                }}
              >
                {pattern.descriptionKo}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pattern.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: '#f1f5f9',
                      color: '#475569',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Category Badge */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: categoryColors[pattern.category],
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                {pattern.category === 'creational' && '🏗️ 생성 패턴'}
                {pattern.category === 'structural' && '🔗 구조 패턴'}
                {pattern.category === 'behavioral' && '⚡ 행동 패턴'}
              </div>
            </div>

            {/* Difficulty Badge */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: difficultyColors[pattern.difficulty],
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                {pattern.difficulty === 'beginner' && '🟢 초급'}
                {pattern.difficulty === 'intermediate' && '🟡 중급'}
                {pattern.difficulty === 'advanced' && '🔴 고급'}
              </div>
            </div>

            {/* Implementation Status */}
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: pattern.implemented ? '#22c55e' : '#94a3b8',
                  color: 'white',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
              >
                {pattern.implemented ? '✅ 구현됨' : '⏳ 예정'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: 'white',
          borderTop: '1px solid #e2e8f0',
          padding: '2rem',
          marginTop: '4rem',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Use Cases */}
            <div>
              <h3
                style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                }}
              >
                📋 주요 사용 사례
              </h3>
              <ul
                style={{ margin: 0, paddingLeft: '1.5rem', color: '#64748b' }}
              >
                {pattern.useCasesKo.map((useCase, index) => (
                  <li key={index} style={{ marginBottom: '0.5rem' }}>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros & Cons */}
            <div>
              <h3
                style={{
                  margin: '0 0 1rem 0',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                }}
              >
                ⚖️ 장단점
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <h4
                    style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '0.9rem',
                      color: '#059669',
                      fontWeight: '600',
                    }}
                  >
                    ✅ 장점
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '1.5rem',
                      color: '#64748b',
                      fontSize: '0.9rem',
                    }}
                  >
                    {pattern.prosKo.map((pro, index) => (
                      <li key={index} style={{ marginBottom: '0.25rem' }}>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4
                    style={{
                      margin: '0 0 0.5rem 0',
                      fontSize: '0.9rem',
                      color: '#dc2626',
                      fontWeight: '600',
                    }}
                  >
                    ❌ 단점
                  </h4>
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: '1.5rem',
                      color: '#64748b',
                      fontSize: '0.9rem',
                    }}
                  >
                    {pattern.consKo.map((con, index) => (
                      <li key={index} style={{ marginBottom: '0.25rem' }}>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Related Patterns */}
            {pattern.relatedPatterns.length > 0 && (
              <div>
                <h3
                  style={{
                    margin: '0 0 1rem 0',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                  }}
                >
                  🔗 관련 패턴
                </h3>
                <div
                  style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
                >
                  {pattern.relatedPatterns.map((relatedId) => (
                    <span
                      key={relatedId}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      {relatedId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
