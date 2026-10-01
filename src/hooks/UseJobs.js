import { useState, useEffect, useCallback } from 'react';
import { fetchJobs } from '../services/JobApi';

export const useJobs = (initialTag = '') => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(initialTag);

  const loadJobs = useCallback(async (query = searchTerm) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJobs(20, query);
      setJobs(data);
    } catch (err) {
      setError(err.message || 'Failed to load jobs from Jobicy.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchJobs(20, searchTerm, controller.signal);
        setJobs(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Failed to load jobs from Jobicy.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [searchTerm]);

  return {
    jobs,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refetch: loadJobs
  };
};

export const useSavedJobs = () => {
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('careerradar:saved-jobs') || '[]');
      return Array.isArray(saved) ? saved.map(String) : [];
    } catch {
      return [];
    }
  });

  const toggleSavedJob = (id) => {
    setSavedJobIds((current) => {
      const key = String(id);
      const next = current.includes(key)
        ? current.filter((savedId) => savedId !== key)
        : [...current, key];
      try {
        localStorage.setItem('careerradar:saved-jobs', JSON.stringify(next));
      } catch {
        // Keep the current session usable when browser storage is unavailable.
      }
      return next;
    });
  };

  return { savedJobIds, toggleSavedJob };
};

export default useJobs;
