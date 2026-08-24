'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Footer from "@/app/components/ui/footer";
import PasswordResetAPI from "@/app/lib/api/passwordReset";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    if (!token) {
      setError("This reset link is invalid or incomplete.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmation) {
      setError("Your passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await PasswordResetAPI.resetPassword(token, password);
      setMessage(response.data.message);
      setPassword("");
      setConfirmation("");
    } catch (resetError) {
      setError(axios.isAxiosError(resetError)
        ? resetError.response?.data?.error || "We could not reset your password."
        : "We could not reset your password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <main className="auth-layout">
        <section className="auth-story">
          <p className="eyebrow">New password</p>
          <h1>A fresh start, securely.</h1>
          <p>Choose a new password for your Manyu association account.</p>
          <div className="auth-story__mark" aria-hidden="true">M</div>
        </section>
        <section className="auth-panel" aria-labelledby="reset-password-title">
          <p className="auth-panel__kicker">Password reset</p>
          <h2 id="reset-password-title">Choose a new password.</h2>
          <p className="auth-panel__intro">Use at least 8 characters.</p>
          {message && <p className="auth-message auth-message--success" role="status">{message}</p>}
          {error && <p className="auth-message" role="alert">{error}</p>}
          {!message && <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="password">New password</label>
            <input id="password" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required />
            <label htmlFor="confirmation">Confirm new password</label>
            <input id="confirmation" name="confirmation" type="password" value={confirmation} onChange={event => setConfirmation(event.target.value)} autoComplete="new-password" minLength={8} required />
            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Resetting password..." : "Reset password"}
              {!isSubmitting && <span aria-hidden="true">↗</span>}
            </button>
          </form>}
          <p className="auth-register"><Link href="/pages/login">Return to sign in <span aria-hidden="true">→</span></Link></p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
