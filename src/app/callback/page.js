"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const code = searchParams.get("code");
    const token = searchParams.get("token");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    const callbackData = {
      code,
      token,
      state,
      error,
      errorDescription,
      fullUrl: window.location.href,
    };

    let relayed = false;

    const expectedOrigins = [
      window.location.origin,
      "http://localhost:1455",
    ];

    if (window.opener) {
      for (const origin of expectedOrigins) {
        try {
          window.opener.postMessage({ type: "oauth_callback", data: callbackData }, origin);
          relayed = true;
        } catch (e) {
          console.log("postMessage failed:", e);
        }
      }
    }

    try {
      const channel = new BroadcastChannel("oauth_callback");
      channel.postMessage(callbackData);
      channel.close();
      relayed = true;
    } catch (e) {
      console.log("BroadcastChannel failed:", e);
    }

    try {
      localStorage.setItem("oauth_callback", JSON.stringify({ ...callbackData, timestamp: Date.now() }));
      relayed = true;
    } catch (e) {
      console.log("localStorage failed:", e);
    }

    if (!(code || token || error)) {
      setTimeout(() => setStatus("manual"), 0);
      return;
    }

    setStatus("success");
    setTimeout(() => {
      window.close();
      setTimeout(() => setStatus("done"), 500);
    }, 1500);
  }, [searchParams]);

  return (
    <div className="liquid-auth-page min-h-screen flex items-center justify-center p-5">
      <div className="glass-card text-center p-6 max-w-sm w-full rounded-2xl">
        {status === "processing" && (
          <>
            <div className="size-12 mx-auto mb-3 rounded-full bg-primary/8 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-primary animate-spin">progress_activity</span>
            </div>
            <h1 className="text-base font-medium mb-1 text-text-main">Processing...</h1>
            <p className="text-sm text-text-muted">Please wait while we complete the authorization.</p>
          </>
        )}

        {(status === "success" || status === "done") && (
          <>
            <div className="size-12 mx-auto mb-3 rounded-full bg-green-500/8 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-green-500">check_circle</span>
            </div>
            <h1 className="text-base font-medium mb-1 text-text-main">Authorization Successful!</h1>
            <p className="text-sm text-text-muted">
              {status === "success" ? "This window will close automatically..." : "You can close this tab now."}
            </p>
          </>
        )}

        {status === "manual" && (
          <>
            <div className="size-12 mx-auto mb-3 rounded-full bg-orange-500/8 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-orange-500">info</span>
            </div>
            <h1 className="text-base font-medium mb-1 text-text-main">Copy This URL</h1>
            <p className="text-sm text-text-muted mb-3">
              Please copy the URL from the address bar and paste it in the application.
            </p>
            <div className="bg-surface-2 border border-border-subtle rounded-lg p-2.5 text-left">
              <code className="text-xs break-all text-text-muted">{typeof window !== "undefined" ? window.location.href : ""}</code>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="liquid-auth-page min-h-screen flex items-center justify-center p-5">
        <div className="glass-card text-center p-6 max-w-sm w-full rounded-2xl">
          <div className="size-12 mx-auto mb-3 rounded-full bg-primary/8 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-primary animate-spin">progress_activity</span>
          </div>
          <p className="text-sm text-text-muted">Loading...</p>
        </div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
