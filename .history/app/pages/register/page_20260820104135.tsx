

'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Footer from "@/app/components/ui/footer";
import RegisterAPI from "@/app/lib/api/register";

export default function RegisterUser() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    if (password !== passwordConfirmation) {
      setMessage("Your passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      return;
    }
    if (!termsAccepted) {
      setMessage("Please accept the privacy policy and terms to continue.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await RegisterAPI.registerUser(username.trim(), email.trim(), password);
      if (response.status >= 200 && response.status < 300) {
        router.replace("/pages/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.error || "We could not create your account. Please try again.");
      } else {
        setMessage("We could not create your account. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <main className="auth-layout">
        <section className="auth-story">
          <p className="eyebrow">Join the circle</p>
          <h1>Make room for your story.</h1>
          <p>Create your association account to connect with the people, events, and memories shaping Manyu.</p>
          <div className="auth-story__mark" aria-hidden="true">M</div>
        </section>
        <section className="auth-panel" aria-labelledby="register-title">
          <p className="auth-panel__kicker">New member</p>
          <h2 id="register-title">Create your account.</h2>
          <p className="auth-panel__intro">A few details, then you can sign in.</p>
          {message && <p className="auth-message" role="alert">{message}</p>}
          <form onSubmit={handleSubmit} className="auth-form">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" value={username} onChange={event => setUsername(event.target.value)} autoComplete="username" minLength={3} required />
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" required />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required />
            <label htmlFor="passwordConfirmation">Confirm password</label>
            <input id="passwordConfirmation" name="passwordConfirmation" type="password" value={passwordConfirmation} onChange={event => setPasswordConfirmation(event.target.value)} autoComplete="new-password" minLength={8} required />
            <label className="auth-check" htmlFor="termsAccepted">
              <input id="termsAccepted" name="termsAccepted" type="checkbox" checked={termsAccepted} onChange={event => setTermsAccepted(event.target.checked)} />
              <span>I agree to the <Link href="/legal/privacy" target="_blank">Privacy Policy</Link> and <Link href="/legal/terms" target="_blank">Terms and Conditions</Link>.</span>
            </label>
            <button className="auth-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Create account"}
              {!isSubmitting && <span aria-hidden="true">↗</span>}
            </button>
          </form>
          <p className="auth-register">Already a member? <Link href="/pages/login">Sign in <span aria-hidden="true">→</span></Link></p>
        </section>
      </main>
      <Footer />
    </div>
  );
}