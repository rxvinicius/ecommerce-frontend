import { authStorage } from "@/utils/authStorage";

export function getAuthHeaders() {
  const token = authStorage.getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
