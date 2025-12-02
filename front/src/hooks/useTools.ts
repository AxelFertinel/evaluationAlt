// hooks/useTools.ts
import { useEffect, useState } from "react";
import { getTools as apiGetTools } from "@/api/tools";
import type { Tool } from "@/interfaces/tools";

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await apiGetTools();
        setTools(response ?? []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  return { tools, loading };
};
