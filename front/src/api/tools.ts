import { useApi } from "../hooks/useApi";

const api = useApi();



export async function getTools() {
  try {
    const { data } = await api.get(`tools?_embed=user_tool`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
