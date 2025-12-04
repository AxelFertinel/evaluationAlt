// hooks/useTools.ts
import { useEffect, useState, useCallback } from "react";
import { getTools } from "@/api/tools";
import type { Tool } from "@/interfaces/tools";

interface UseToolsReturn {
  tools: Tool[];
  loading: boolean;
  error: Error | null;
}

export const useTools = (): UseToolsReturn => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTools = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTools();
      setTools(response ?? []);
      setLoading(false);
    } catch (e) {
      const errorMessage =
        e instanceof Error ? e : new Error("Failed to fetch tools");
      setError(errorMessage);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  return { tools, loading, error };
};
