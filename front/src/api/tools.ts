import { useApi } from "../hooks/useApi";

const api = useApi();

export async function getTools() {
  try {
    const { data } = await api.get(`tools`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
