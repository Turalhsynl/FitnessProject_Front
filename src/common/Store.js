import { create } from "zustand";

const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;Secure;SameSite=Strict`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const eraseCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure;SameSite=Strict`;
};

export const useAuthStore = create((set) => ({
  accessToken: getCookie("accessToken") || null,
  refreshToken: getCookie("refreshToken") || null,

  setTokens: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken });
    setCookie("accessToken", accessToken);
    setCookie("refreshToken", refreshToken);
  },

  clearTokens: () => {
    set({ accessToken: null, refreshToken: null });
    eraseCookie("accessToken");
    eraseCookie("refreshToken");
  },
}));
