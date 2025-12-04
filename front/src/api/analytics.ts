import { useApi } from "../hooks/useApi";

const api = useApi();

export async function getAnalytics() {
  try {
    const { data } = await api.get(`analytics`);
    return data;
  } catch (error) {
    throw new Error(
      "Failed to fetch analytics: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
}
