import { ACTIVE_USER, TOKEN_KEY } from "../../environment";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const userExist = () => localStorage.getItem(ACTIVE_USER) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ACTIVE_USER);
};