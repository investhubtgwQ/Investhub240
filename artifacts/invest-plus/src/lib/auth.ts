import { setAuthTokenGetter } from "@workspace/api-client-react";

const TOKEN_KEY = "invest_plus_token";

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// Initialize custom fetch with the token getter
export function initAuth() {
  setAuthTokenGetter(getAuthToken);
}
