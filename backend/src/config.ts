/**
 * Server settings, read from environment variables (and backend/.env when present).
 * The server refuses to start without the settings it needs.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const envFile = fileURLToPath(new URL('../.env', import.meta.url));
if (existsSync(envFile)) process.loadEnvFile(envFile);

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`Missing required setting ${name}. Copy backend/.env.example to backend/.env and fill it in.`);
    process.exit(1);
  }
  return value;
}

function integer(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === '') return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 0) {
    console.error(`Setting ${name} must be a whole number (got "${raw}").`);
    process.exit(1);
  }
  return value;
}

export const config = {
  env: process.env.NODE_ENV ?? 'development',
  port: integer('PORT', 4000),
  /** 127.0.0.1 keeps the API private to this machine; use 0.0.0.0 behind a reverse proxy in production. */
  host: process.env.HOST || '127.0.0.1',
  /** Number of reverse proxies in front of the server (for correct client IPs in rate limiting). 0 = none. */
  trustProxy: integer('TRUST_PROXY', 0),
  /** Browser origins allowed to call the API directly. Empty = same-origin only (recommended). */
  corsOrigins: (process.env.CORS_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean),

  qap: {
    apiBase: (process.env.QAP_API_BASE || 'https://quickaccessparking.co.uk/api/v1.0').replace(/\/$/, ''),
    apiKey: required('QAP_API_KEY'),
    timeoutMs: integer('QAP_TIMEOUT_MS', 15_000),
    /** Identical searches within this window are served from memory. */
    cacheTtlMs: integer('QAP_CACHE_TTL_MS', 60_000),
    /** Hard cap on calls to QAP per minute across all visitors (QAP allows 120). */
    upstreamBudgetPerMinute: integer('QAP_BUDGET_PER_MINUTE', 100),
  },

  /** Searches each visitor (IP address) may make per minute. */
  rateLimitPerMinute: integer('RATE_LIMIT_PER_MINUTE', 30),
} as const;
