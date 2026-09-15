# 🔷 Deploy 9Router ke Netlify

> Serverless edge functions, mirip Vercel.

## Quick Start

1. Buka https://app.netlify.com
2. **Add new site** → **Import from GitHub**
3. Pilih repo → Deploy

Build settings sudah ada di `netlify.toml`.

---

## Environment Variables

Netlify Dashboard → Site → Build & Deploy → Environment

| Variabel | Value |
|----------|-------|
| `JWT_SECRET` | random string |
| `INITIAL_PASSWORD` | password |
| `UPSTASH_REDIS_REST_URL` | dari Upstash (untuk persistence) |
| `UPSTASH_REDIS_REST_TOKEN` | dari Upstash |
| `API_KEYS` | API key 9Router yang harus tetap valid lintas invocation |
| `API_KEY_SECRET` | Secret untuk key yang dibuat oleh 9Router |

---

## Limitations

- ❌ Token refresh (serverless, gak ada persistent process)
- ❌ MITM/TLS
- ❌ Cloudflare tunnel
- ✅ API proxy, dashboard, provider connections

---

## Akses

- Dashboard: `https://your-project.netlify.app/dashboard`
- API: `https://your-project.netlify.app/v1`
