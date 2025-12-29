import { useState, useEffect } from 'react';

import type { Worry } from '../types';

const STORAGE_KEY = 'burned-worries';

export function useWorryStorage() {
  const [worries, setWorries] = useState<Worry[]>([]);

  // 초기 로드
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setWorries(parsed);
      } catch (e) {
        console.error('Failed to parse stored worries:', e);
      }
    }
  }, []);

  // 저장
  useEffect(() => {
    if (worries.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(worries));
    }
  }, [worries]);

  const addWorry = (text: string) => {
    const newWorry: Worry = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
    };
    setWorries((prev) => [...prev, newWorry]);
  };

  const clearWorries = () => {
    setWorries([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getStats = () => {
    const now = Date.now();
    const today = new Date().setHours(0, 0, 0, 0);
    const thisWeek = now - 7 * 24 * 60 * 60 * 1000;

    return {
      total: worries.length,
      today: worries.filter((w) => w.timestamp >= today).length,
      thisWeek: worries.filter((w) => w.timestamp >= thisWeek).length,
    };
  };

  return {
    worries,
    addWorry,
    clearWorries,
    stats: getStats(),
  };
}

