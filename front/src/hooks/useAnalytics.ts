import { useEffect, useState, useCallback } from "react";

import { getAnalytics } from "@/api/analytics";
import type { Analytics } from "@/interfaces/analytics";

interface UseAnalyticsReturn {
  analytics: Analytics[];
  load: boolean;
  err: Error | null;
}

export const useAnalytics = (): UseAnalyticsReturn => {
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [load, setLoading] = useState(true);
  const [err, setError] = useState<Error | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAnalytics();
      setAnalytics(response ?? []);
      setLoading(false);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e : new Error("Failed to fetch Analytics");
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  return { analytics, load, err };
};
