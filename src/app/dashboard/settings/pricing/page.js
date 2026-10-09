"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "@/shared/components/Card";
import PricingModal from "@/shared/components/PricingModal";

export default function PricingSettingsPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentPricing, setCurrentPricing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPricing();
  }, []);

  const loadPricing = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/pricing");
      if (response.ok) {
        const data = await response.json();
        setCurrentPricing(data);
      }
    } catch (error) {
      console.error("Failed to load pricing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePricingUpdated = () => {
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
    <div className="max-w-6xl mx-auto p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-text-main">Pricing Settings</h1>
          <p className="text-sm text-text-muted mt-0.5">
            Configure pricing rates for cost tracking and calculations
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="h-9 px-4 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors text-sm font-medium"
        >
          Edit Pricing
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="p-4">
          <div className="text-text-muted text-xs font-medium uppercase tracking-wider">
            Total Models
          </div>
          <div className="text-xl font-semibold mt-1 text-text-main">
            {loading ? "..." : getModelCount()}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-text-muted text-xs font-medium uppercase tracking-wider">
            Providers
          </div>
          <div className="text-xl font-semibold mt-1 text-text-main">
            {loading ? "..." : getProviders().length}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-text-muted text-xs font-medium uppercase tracking-wider">
            Status
          </div>
          <div className="text-xl font-semibold mt-1 text-text-main">
            {loading ? "..." : "Active"}
          </div>
        </Card>
      </div>

      {/* Provider list */}
      <Card title="Provider Pricing" icon="payments">
        {loading ? (
          <div className="text-sm text-text-muted">Loading pricing data...</div>
        ) : getProviders().length === 0 ? (
          <div className="text-sm text-text-muted">No pricing data available. Click "Edit Pricing" to configure.</div>
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
