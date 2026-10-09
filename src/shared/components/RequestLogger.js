"use client";

import { useState, useEffect } from "react";
import Card from "./Card";

export default function RequestLogger() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchLogs(false);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchLogs = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetch("/api/usage/request-logs");
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Request Logs</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-text-muted flex items-center gap-2 cursor-pointer">
            <span>Auto Refresh (3s)</span>
            <div
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/20 ${autoRefresh ? "bg-success" : "bg-surface-2 border border-border"
                }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${autoRefresh ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
              />
            </div>
          </label>
        </div>
      </div>

      <Card className="overflow-hidden rounded-2xl bg-surface/45">
        <div className="max-h-[min(600px,70dvh)] overflow-auto font-mono text-xs">
          {loading && logs.length === 0 ? (
            <div className="p-8 text-center text-text-muted">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-8 text-center text-text-muted">No logs recorded yet.</div>
          ) : (
            <table className="w-full min-w-[720px] border-collapse whitespace-nowrap text-left">
              <thead className="sticky top-0 z-10 border-b border-border bg-surface/95 text-text-muted backdrop-blur-xl">
                <tr>
                  <th className="px-3 py-2 border-r border-border">DateTime</th>
                  <th className="px-3 py-2 border-r border-border">Model</th>
                  <th className="px-3 py-2 border-r border-border">Provider</th>
                  <th className="px-3 py-2 border-r border-border">Account</th>
                  <th className="px-3 py-2 border-r border-border">In</th>
                  <th className="px-3 py-2 border-r border-border">Out</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {logs.map((log, i) => {
                  const parts = log.split(" | ");
                  if (parts.length < 7) return null;

                  const status = parts[6];
                  const isPending = status.includes("PENDING");
                  const isFailed = status.includes("FAILED");
                  const isSuccess = status.includes("OK");

                  return (
                    <tr key={i} className={`hover:bg-blue-500/5 transition-colors ${isPending ? 'bg-blue-500/5' : ''}`}>
                      <td className="px-3 py-1.5 border-r border-border text-text-muted">{parts[0]}</td>
                      <td className="px-3 py-1.5 border-r border-border font-medium">{parts[1]}</td>
                      <td className="px-3 py-1.5 border-r border-border">
                        <span className="px-1.5 py-0.5 rounded-md bg-bg-subtle border border-border text-[10px] uppercase font-bold">
                          {parts[2]}
                        </span>
                      </td>
                      <td className="px-3 py-1.5 border-r border-border truncate max-w-[150px]" title={parts[3]}>{parts[3]}</td>
                      <td className="px-3 py-1.5 border-r border-border text-right text-blue-500">{parts[4]}</td>
                      <td className="px-3 py-1.5 border-r border-border text-right text-success">{parts[5]}</td>
                      <td className={`px-3 py-1.5 font-bold ${isSuccess ? 'text-success' :
                          isFailed ? 'text-error' :
                            'text-blue-500 animate-pulse'
                        }`}>
                        {status}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </Card>
      <div className="text-[10px] text-text-muted italic">
        Logs are loaded from the request history database.
      </div>
    </div>
  );
}
