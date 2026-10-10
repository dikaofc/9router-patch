"use client";

import { useState, useEffect, useCallback } from "react";
import Card from "@/shared/components/Card";
import PricingModal from "@/shared/components/PricingModal";

export default function PricingSettingsPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentPricing, setCurrentPricing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pricingError, setPricingError] = useState("");

  const loadPricing = useCallback(async () => {
    try {
      const response = await fetch("/api/pricing");
      if (!response.ok) throw new Error("Could not load provider pricing.");
      const data = await response.json();
      setCurrentPricing(data);
    } catch (error) {
      console.error("Failed to load pricing:", error);
      setPricingError(error.message || "Could not load provider pricing.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    Promise.resolve().then(() => {
      if (mounted) loadPricing();
    });
    return () => {
      mounted = false;
    };
  }, [loadPricing]);

  const handlePricingUpdated = () => {
    setLoading(true);
    setPricingError("");
    loadPricing();
  };

  const getModelCount = () => {
    if (!currentPricing) return 0;
    let count = 0;
    for (const provider in currentPricing) {
      count += Object.keys(currentPricing[provider]).length;
    }
    return count;
  };

  const getProviders = () => {
    if (!currentPricing) return [];
    return Object.keys(currentPricing).sort();
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <h1 className="text-xl font-semibold text-text-main">Provider pricing</h1>
          <p className="text-sm text-text-muted mt-0.5">
            Configure pricing rates for cost tracking and calculations
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="min-h-11 rounded-[var(--radius-brand-lg)] bg-primary px-4 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Edit pricing
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-text-muted text-xs font-medium">
            Models with pricing
          </div>
          <div className="text-xl font-semibold mt-1 text-text-main">
            {loading ? "..." : pricingError ? "Unavailable" : getModelCount()}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-text-muted text-xs font-medium">
            Providers with pricing
          </div>
          <div className="text-xl font-semibold mt-1 text-text-main">
            {loading ? "..." : pricingError ? "Unavailable" : getProviders().length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-text-muted text-xs font-medium">
            Configuration
          </div>
          <div className="text-xl font-semibold mt-1 text-text-main">
            {loading ? "..." : pricingError ? "Unavailable" : getModelCount() > 0 ? "Configured" : "Not configured"}
          </div>
        </Card>
      </div>

      <Card title="Configured provider rates" icon="payments">
        {loading ? (
          <div className="text-sm text-text-muted" role="status">Loading provider pricing…</div>
        ) : pricingError ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-danger" role="alert">{pricingError}</p>
            <button
              type="button"
              onClick={handlePricingUpdated}
              className="min-h-11 rounded-[var(--radius-brand-lg)] border border-border px-4 text-sm font-medium text-text-main hover:bg-surface-2"
            >
              Retry
            </button>
          </div>
        ) : getProviders().length === 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-text-main">No provider rates configured.</p>
            <p className="text-sm text-text-muted">Add model rates to calculate request costs.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {getProviders().map((provider) => {
              const models = currentPricing[provider] || {};
              return (
                <div key={provider} className="flex items-center justify-between py-2 border-b border-border-subtle last:border-b-0">
                  <span className="text-sm text-text-main capitalize">{provider}</span>
                  <span className="text-xs text-text-muted">{Object.keys(models).length} models</span>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <PricingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUpdated={handlePricingUpdated}
      />
    </div>
  );
}
