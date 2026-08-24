'use client';

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Footer from "@/app/components/ui/footer";
import PasswordResetAPI from "@/app/lib/api/passwordReset";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await PasswordResetAPI.requestReset(email.trim());
      setMessage(response.data.message);
    } catch (requestError) {
      setError(axios.isAxiosError(requestError)
        ? requestError.response?.data?.error || "We could not process your request."
        : "We could not process your request.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <main className="auth-layout">
        <section className="auth-story">
          <p className="eyebrow">Account recovery</p>
          <h1>Find your way back in.</h1>
          <p>Enter the email connected to your association account and we will send you a secure reset link.</p>
          <div className="auth-story__mark" aria-hidden="true">M</div>
        </section>
        <section className="auth-panel" aria-labelledby="forgot-password-title">
          <p className="auth-panel__kicker">Forgot password</p>
          <h2 id="forgot-password-title">Reset your password.</h2>
          <p className="auth-panel__intro">The link will be valid for 30 minutes.</p>
          {message && <p className="auth-message auth-message--success" role="status">{message}</p>}
          {error && <p className="auth-message" role="alert">{error}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required />
            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending link..." : "Send reset link"}
              {!isSubmitting && <span aria-hidden="true">↗</span>}
            </button>
          </form>
          <p className="auth-register"><Link href="/pages/login">Return to sign in <span aria-hidden="true">→</span></Link></p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
