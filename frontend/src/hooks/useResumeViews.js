import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../lib/api';

const BACKEND_URL = `${API_BASE_URL}/api/views`;
const LOCAL_STORAGE_KEY = 'kunnal_resume_views_count';
const DEFAULT_VIEWS = 1482;
let visitRequest;

function recordVisit() {
  if (!visitRequest) {
    visitRequest = axios
      .post(`${BACKEND_URL}/increment`, {}, { timeout: 2500 })
      .then((res) => (typeof res.data?.views === 'number' ? res.data.views : null))
      .catch(() => null);
  }
  return visitRequest;
}

export function useResumeViews() {
  const [views, setViews] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_VIEWS;
  });

  useEffect(() => {
    let mounted = true;

    // Record visit on mount and update count
    recordVisit().then((count) => {
      if (mounted && typeof count === 'number') {
        setViews(count);
        localStorage.setItem(LOCAL_STORAGE_KEY, count.toString());
      }
    });

    // Poll current count every 30s to stay live
    const interval = setInterval(() => {
      axios
        .get(BACKEND_URL, { timeout: 2500 })
        .then((res) => {
          if (mounted && typeof res.data?.views === 'number') {
            setViews(res.data.views);
            localStorage.setItem(LOCAL_STORAGE_KEY, res.data.views.toString());
          }
        })
        .catch(() => {});
    }, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { views };
}
