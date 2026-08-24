import api from "@/app/utils/api";

class PasswordResetAPI {
  async requestReset(email: string) {
    return api.post("/api/auth/forgot-password", { email });
  }

  async resetPassword(token: string, password: string) {
    return api.post("/api/auth/reset-password", { token, password });
  }
}

const passwordResetAPI = new PasswordResetAPI();
export default passwordResetAPI;
