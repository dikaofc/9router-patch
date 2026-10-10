"use client";

import { useState, useEffect } from "react";
import { Card, Button, Input } from "@/shared/components";
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
      <div className="liquid-auth-page auth-loading min-h-dvh flex items-center justify-center p-4">
        <div className="auth-loading-mark">
          <span className="auth-brand-icon">
            <span className="material-symbols-outlined" aria-hidden="true">hub</span>
          </span>
          <span className="material-symbols-outlined auth-loading-spinner" aria-hidden="true">progress_activity</span>
          <p className="text-sm text-text-muted">Preparing your secure sign-in</p>
        </div>
      </div>
    );
  }

  return (
    <div className="liquid-auth-page min-h-dvh flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="landing-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="auth-layout relative z-10 w-full max-w-5xl">
        <section className="auth-brand-panel" aria-label="About 9Router">
          <div className="auth-brand-lockup">
            <span className="auth-brand-icon">
              <span className="material-symbols-outlined" aria-hidden="true">hub</span>
            </span>
            <span>
              <span className="auth-brand-name">{APP_CONFIG.name}</span>
              <span className="auth-brand-caption">AI ROUTING GATEWAY</span>
            </span>
          </div>

          <div className="auth-brand-copy">
            <span className="auth-kicker">
              <span className="auth-kicker-dot" />
              YOUR AI WORKSPACE
            </span>
            <h1>One gateway.<br /><span>Every model.</span></h1>
            <p>Bring your AI providers together in one place. Sign in to manage connections, route requests, and keep an eye on usage.</p>
          </div>

          <ul className="auth-highlights">
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">hub</span>
              <span><strong>Unified endpoint</strong><small>One place to connect your tools</small></span>
            </li>
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">alt_route</span>
              <span><strong>Flexible routing</strong><small>Choose how requests reach providers</small></span>
            </li>
            <li>
              <span className="material-symbols-outlined" aria-hidden="true">monitoring</span>
              <span><strong>Usage at a glance</strong><small>Keep track of requests and activity</small></span>
            </li>
          </ul>

          <div className="auth-brand-footer">
            <span className="material-symbols-outlined" aria-hidden="true">lock</span>
            Your gateway. Your configuration.
          </div>
        </section>

        <section className="auth-form-panel" aria-label="Sign in">
          <Card glass className="auth-form-card w-full rounded-3xl p-5 sm:p-7">
            <div className="auth-form-heading">
              <div className="auth-form-icon">
                <span className="material-symbols-outlined" aria-hidden="true">{mustChange ? "key" : "lock"}</span>
              </div>
              <div>
                <p className="auth-form-eyebrow">{mustChange ? "ACCOUNT SECURITY" : "SECURE ACCESS"}</p>
                <h2>{mustChange ? "Set a new password" : "Welcome back"}</h2>
                <p>
                  {mustChange
                    ? "Choose a new password to continue."
                    : samlAvailable
                      ? "Continue with your organization’s SAML sign-in."
                      : oidcAvailable
                        ? "Sign in with your identity provider or password."
                        : "Sign in to open your 9Router dashboard."}
                </p>
              </div>
            </div>
            {mustChange ? (
              <form onSubmit={handleSetNewPassword} className="flex flex-col gap-4">
                <p className="text-xs text-orange-500 text-center">
                  Set a new password before accessing the dashboard remotely.
                </p>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-text-main">New password</label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    autoFocus
                  />
                  {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
                <Button type="submit" variant="primary" className="w-full" loading={loading} disabled={!newPassword}>
                  Set password
                </Button>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                {samlAvailable && (
                  <Button type="button" variant="primary" className="w-full" onClick={handleSamlLogin}>
                    {samlLoginLabel}
                  </Button>
                )}

                {oidcAvailable && (
                  <Button type="button" variant="primary" className="w-full" onClick={handleOidcLogin}>
                    {oidcLoginLabel}
                  </Button>
                )}

                {ssoAvailable && passwordAvailable && <div className="h-px bg-border-subtle" />}

                {passwordAvailable ? (
                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {isSsoEnabled && !ssoAvailable && (
                      <p className="text-[11px] text-orange-500 text-center">
                        {activeSsoType === "saml" ? "SAML SSO" : "OIDC"} login is enabled, but configuration is incomplete. Password login is still available for recovery.
                      </p>
                    )}

                    {authMode === "both" && ssoAvailable && (
                      <p className="text-[11px] text-text-muted text-center">
                        Password and {activeSsoType === "saml" ? "SAML SSO" : "OIDC"} login are both enabled.
                      </p>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-medium text-text-main">Password</label>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoFocus={!oidcAvailable}
                      />
                      {error && <p className="text-xs text-red-500">{error}</p>}
                      {retryAfter > 0 && (
                        <p className="text-xs text-orange-500">
                          Locked. Retry in <span className="font-mono">{retryAfter}s</span>.
                        </p>
                      )}
                      {resetHint && (
                        <p className="text-xs text-text-muted">
                          Forgot password? Open <code className="bg-surface-2 px-1 rounded">9router</code> CLI on the host → <b>Settings</b> → <b>Reset Password to Default</b>.
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      loading={loading}
                      disabled={retryAfter > 0}
                    >
                      {retryAfter > 0 ? `Wait ${retryAfter}s` : "Login"}
                    </Button>

                    <p className="text-[11px] text-center text-text-muted">
                      Default password is <code className="bg-surface-2 px-1 rounded">123456</code>
                    </p>
                    {hasPassword === false && (
                      <p className="text-[11px] text-center text-orange-500">
                        Security risk: no password set. You will be asked to set one when logging in remotely.
                      </p>
                    )}
                  </form>
                ) : (
                  error && <p className="text-xs text-red-500">{error}</p>
                )}
              </div>
            )}
          </Card>
          <p className="auth-form-footnote">
            <span className="material-symbols-outlined" aria-hidden="true">verified_user</span>
            Private access to your {APP_CONFIG.name} dashboard
          </p>
        </section>
      </div>
    </div>
  );
}
