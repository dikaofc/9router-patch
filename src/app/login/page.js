"use client";

import { useState, useEffect } from "react";
import { Button, Input } from "@/shared/components";
import { APP_CONFIG } from "@/shared/constants/config";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetHint, setResetHint] = useState("");
  const [retryAfter, setRetryAfter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasPassword, setHasPassword] = useState(null);
  const [authMode, setAuthMode] = useState("password");
  const [ssoType, setSsoType] = useState("oidc");
  const [oidcConfigured, setOidcConfigured] = useState(false);
  const [oidcLoginLabel, setOidcLoginLabel] = useState("Sign in with OIDC");
  const [samlConfigured, setSamlConfigured] = useState(false);
  const [samlLoginLabel, setSamlLoginLabel] = useState("Sign in with SAML SSO");
  const [mustChange, setMustChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (retryAfter <= 0) return;
    const id = setInterval(() => setRetryAfter((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [retryAfter]);

  useEffect(() => {
    async function checkAuth() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
      const tunnelAccessDisabled =
        typeof window !== "undefined" &&
        new URLSearchParams(window.location.search).get("error") === "tunnel_access_disabled";
      if (tunnelAccessDisabled) {
        setError("Dashboard access is disabled for this network. Open 9Router from the host or enable tunnel dashboard access in Settings.");
      }

      try {
        const res = await fetch(`${baseUrl}/api/auth/status`, {
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (!tunnelAccessDisabled && (data.authenticated === true || data.requireLogin === false)) {
            window.location.assign("/dashboard");
            return;
          }
          setHasPassword(!!data.hasPassword);
          setAuthMode(data.authMode || "password");
          setSsoType(data.ssoType || "oidc");
          setOidcConfigured(data.oidcConfigured === true);
          setOidcLoginLabel(data.oidcLoginLabel || "Sign in with OIDC");
          setSamlConfigured(data.samlConfigured === true);
          setSamlLoginLabel(data.samlLoginLabel || "Sign in with SAML SSO");
        } else {
          setHasPassword(true);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        setHasPassword(true);
      }
    }
    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetHint("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.mustChangePassword) {
          setMustChange(true);
          return;
        }
        window.location.assign("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid password");
        if (data.resetHint) setResetHint(data.resetHint);
        if (data.retryAfter) setRetryAfter(Number(data.retryAfter));
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: password, newPassword }),
      });
      if (res.ok) {
        window.location.assign("/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to set password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOidcLogin = () => {
    window.location.href = "/api/auth/oidc/start";
  };

  const handleSamlLogin = () => {
    window.location.href = "/api/auth/saml/start";
  };

  const isSsoEnabled = ["sso", "oidc", "saml", "both"].includes(authMode);
  const activeSsoType = ssoType || (authMode === "saml" ? "saml" : "oidc");

  const samlAvailable = isSsoEnabled && activeSsoType === "saml" && samlConfigured;
  const oidcAvailable = isSsoEnabled && activeSsoType === "oidc" && oidcConfigured;
  const ssoAvailable = samlAvailable || oidcAvailable;

  const passwordAvailable = authMode === "password" || authMode === "both" || !ssoAvailable;

  if (hasPassword === null) {
    return (
      <div className="liquid-auth-page auth-loading min-h-dvh">
        <div className="auth-loading-mark">
          <span className="auth-brand-mark" aria-hidden="true">9</span>
          <span className="auth-loading-spinner" role="status" aria-label="Loading" />
          <p>Checking dashboard access</p>
        </div>
      </div>
    );
  }

  return (
    <div className="liquid-auth-page auth-page min-h-dvh">
      <main className="auth-layout">
        <section className="auth-brand-panel" aria-label="About 9Router">
          <div className="auth-brand-lockup">
            <span className="auth-brand-mark" aria-hidden="true">9</span>
            <span className="auth-brand-name">{APP_CONFIG.name}</span>
          </div>

          <div className="auth-brand-copy">
            <p className="auth-brand-label">AI model routing</p>
            <h1>One endpoint.<br /><span>Your providers.</span></h1>
            <p>Manage provider connections, model routes, and usage from one dashboard.</p>
          </div>

          <figure className="auth-route-map" aria-labelledby="auth-route-caption">
            <figcaption id="auth-route-caption">Request path</figcaption>
            <ol className="auth-route-flow">
              <li><span>Client</span><strong>AI tool</strong></li>
              <li><span>Endpoint</span><code>/v1/*</code></li>
              <li><span>Destination</span><strong>Provider</strong></li>
            </ol>
          </figure>
        </section>

        <section className="auth-form-panel" aria-label="Sign in">
          <div className="auth-form-card">
            <div className="auth-form-heading">
              <p className="auth-form-eyebrow">{mustChange ? "Account security" : "Dashboard access"}</p>
              <h2>{mustChange ? "Set a new password" : "Sign in"}</h2>
              <p>
                {mustChange
                  ? "Choose a new password to continue."
                  : samlAvailable
                    ? "Continue with your organization’s SAML sign-in."
                    : oidcAvailable
                      ? "Use your identity provider or dashboard password."
                      : "Enter the password for this 9Router instance."}
              </p>
            </div>

            {error && (
              <p className="auth-message auth-message-error" role="alert">
                <span className="material-symbols-outlined" aria-hidden="true">error</span>
                {error}
              </p>
            )}

            {resetHint && (
              <p className="auth-message auth-message-note" role="status">{resetHint}</p>
            )}

            {mustChange ? (
              <form onSubmit={handleSetNewPassword} className="auth-form-fields" aria-busy={loading}>
                <p className="auth-message auth-message-warning">
                  Set a new password before accessing the dashboard remotely.
                </p>
                <div className="auth-field">
                  <label className="auth-field-label" htmlFor="new-password">New password</label>
                  <Input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoFocus
                    inputClassName="auth-password-input"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="auth-submit-button w-full"
                  loading={loading}
                  disabled={!newPassword}
                >
                  Set password
                </Button>
              </form>
            ) : (
              <div className="auth-form-fields">
                {samlAvailable && (
                  <Button type="button" variant="secondary" size="lg" className="auth-sso-button w-full" onClick={handleSamlLogin}>
                    {samlLoginLabel}
                  </Button>
                )}

                {oidcAvailable && (
                  <Button type="button" variant="secondary" size="lg" className="auth-sso-button w-full" onClick={handleOidcLogin}>
                    {oidcLoginLabel}
                  </Button>
                )}

                {ssoAvailable && passwordAvailable && (
                  <div className="auth-divider"><span>Or use your dashboard password</span></div>
                )}

                {passwordAvailable ? (
                  <form onSubmit={handleLogin} className="auth-form-fields" aria-busy={loading}>
                    {isSsoEnabled && !ssoAvailable && (
                      <p className="auth-message auth-message-warning">
                        {activeSsoType === "saml" ? "SAML SSO" : "OIDC"} login is enabled, but configuration is incomplete. Password login is still available for recovery.
                      </p>
                    )}

                    {authMode === "both" && ssoAvailable && (
                      <p className="auth-message auth-message-note">
                        Password and {activeSsoType === "saml" ? "SAML SSO" : "OIDC"} login are both enabled.
                      </p>
                    )}

                    <div className="auth-field">
                      <label className="auth-field-label" htmlFor="password">Password</label>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus={!oidcAvailable}
                        inputClassName="auth-password-input"
                      />
                      {retryAfter > 0 && (
                        <p className="auth-message auth-message-warning">
                          Locked. Retry in <span className="font-mono">{retryAfter}s</span>.
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="auth-submit-button w-full"
                      loading={loading}
                      disabled={retryAfter > 0}
                    >
                      {retryAfter > 0 ? `Try again in ${retryAfter}s` : "Sign in"}
                    </Button>

                    {hasPassword === false && (
                      <p className="auth-message auth-message-warning">
                        Security risk: no password set. You will be asked to set one when logging in remotely.
                      </p>
                    )}
                  </form>
                ) : (
                  null
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
