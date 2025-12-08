import Cookies from "js-cookie";
import { backendPrefix } from "../config";

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: number;
    email: string;
    name: string;
  };
  requires2FA?: boolean;
  tempToken?: string;
  error?: string;
}

interface RefreshTokenResponse {
  success: boolean;
  token: string;
}

// ✅ ENHANCED: Token manager with auto-refresh + heartbeat
class TokenManager {
  private refreshTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;

  startAutoRefresh() {
    // Clear any existing timers first
    this.stopAutoRefresh();

    // Refresh token every 14 minutes (1 minute before 15min expiry)
    this.refreshTimer = setInterval(() => {
      this.refreshAccessToken();
    }, 14 * 60 * 1000);

    // ✅ NEW: Session heartbeat every 5 minutes
    this.heartbeatTimer = setInterval(() => {
      this.sessionHeartbeat();
    }, 5 * 60 * 1000);

    console.log("🔄 Token auto-refresh started");
  }

  stopAutoRefresh() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    console.log("⏸️  Token auto-refresh stopped");
  }

  // ✅ NEW: Keep session alive
  async sessionHeartbeat() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Just verify token is still valid
      await getCurrentUser();
      console.log("💓 Session heartbeat");
    } catch (error) {
      console.error("💔 Heartbeat failed:", error);
    }
  }

  async refreshAccessToken() {
    try {
      const response = await fetch(`${backendPrefix}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        // Refresh failed, redirect to login
        this.stopAutoRefresh();
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data: RefreshTokenResponse = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log("🔄 Token refreshed successfully");
      }
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      this.stopAutoRefresh();
      window.location.href = "/login";
    }
  }
}

export const tokenManager = new TokenManager();

// ✅ Signup
export const signup = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${backendPrefix}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Signup failed" };
    }

    return { success: true, message: data.message };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
};

// ✅ Login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${backendPrefix}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Login failed" };
    }

    // ✅ Check if 2FA required
    if (data.requires2FA) {
      return {
        success: false,
        requires2FA: true,
        tempToken: data.tempToken,
        message: data.message,
      };
    }

    // ✅ Store token and start auto-refresh
    if (data.token) {
      localStorage.setItem("token", data.token);
      tokenManager.startAutoRefresh();
    }

    return { success: true, token: data.token, user: data.user };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
};

// ✅ Verify 2FA
export const verify2FA = async (tempToken: string, code: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${backendPrefix}/auth/verify-2fa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ tempToken, code }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "2FA verification failed" };
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      tokenManager.startAutoRefresh();
    }

    return { success: true, token: data.token, user: data.user };
  } catch (error) {
    console.error("2FA verification error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
};

// ✅ Logout
export const logout = async (): Promise<void> => {
  try {
    const token = localStorage.getItem("token");

    await fetch(`${backendPrefix}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      credentials: "include",
    });

    // ✅ Clean up
    tokenManager.stopAutoRefresh();
    localStorage.removeItem("token");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    window.location.href = "/login";
  }
};

// ✅ Get current user
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return null;
    }

    const response = await fetch(`${backendPrefix}/auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

// ✅ Google login
export const googleLogin = async (email: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${backendPrefix}/auth/google-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Google login failed" };
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      tokenManager.startAutoRefresh();
    }

    return { success: true, token: data.token, user: data.user };
  } catch (error) {
    console.error("Google login error:", error);
    return { success: false, error: "Network error. Please try again." };
  }
};

// ✅ Send OTP
export const sendOTP = async (email: string) => {
  try {
    const response = await fetch(`${backendPrefix}/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    return await response.json();
  } catch (error) {
    console.error("Send OTP error:", error);
    return { success: false, error: "Failed to send OTP" };
  }
};

// ✅ Verify OTP
export const verifyOTP = async (email: string, otp: string, otpToken: string) => {
  try {
    const response = await fetch(`${backendPrefix}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, otp, otpToken }),
    });

    return await response.json();
  } catch (error) {
    console.error("Verify OTP error:", error);
    return { success: false, error: "Failed to verify OTP" };
  }
};

// ✅ Reset password
export const resetPassword = async (
  email: string,
  newPassword: string,
  resetToken: string
) => {
  try {
    const response = await fetch(`${backendPrefix}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, newPassword, resetToken }),
    });

    return await response.json();
  } catch (error) {
    console.error("Reset password error:", error);
    return { success: false, error: "Failed to reset password" };
  }
};

// ✅ NEW: Initialize session on app load
export const initializeSession = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return null;
  }

  try {
    const user = await getCurrentUser();
    
    if (user) {
      tokenManager.startAutoRefresh();
      console.log("✅ Session initialized for:", user.email);
      return user;
    } else {
      localStorage.removeItem("token");
      return null;
    }
  } catch (error) {
    console.error("❌ Session initialization failed:", error);
    localStorage.removeItem("token");
    return null;
  }
};

// ✅ NEW: Check if user is logged in (synchronous)
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};