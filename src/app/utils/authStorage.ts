import {
  AUTH_EVENT_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_KEY,
} from "@/constants/storage";
import { User } from "@/types/user";

export const authStorage = {
  setAuth: (token: string, user: User) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(AUTH_EVENT_KEY));
  },

  clearAuth: () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.dispatchEvent(new Event(AUTH_EVENT_KEY));
  },

  getUser: () => {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  },

  getToken: () => localStorage.getItem(AUTH_TOKEN_KEY),
};
