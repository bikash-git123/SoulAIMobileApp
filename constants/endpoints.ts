/**
 * Central API endpoint definitions.
 * All API paths live here — never hardcode endpoint strings in screens or services.
 */

export const ENDPOINTS = {
  auth: {
    /** POST — Register a new user (email + password) */
    register: "/auth/register",

    /** POST — Login with email + password */
    login: "/auth/login",

    /** POST — Verify email OTP */
    verifyOtp: "/auth/verify-otp",

    /**
     * POST — Exchange a social provider token for an app token.
     * @param provider - "google" | "apple"
     */
    social: (provider: string) => `/auth/${provider}`,
  },

  users: {
    /** GET / PATCH — Current authenticated user's profile */
    me: "/users/me",
  },
} as const;
