# 🌐 Deploy 9Router ke Render

> Node.js native, free tier 750 jam/bulan.
>
> ⚠️ **BUTUH KARTU KREDIT** untuk bikin service.

## Quick Start

1. Buka https://dashboard.render.com
2. **New** → **Web Service**
3. Import GitHub repo
4. Isi:
   - **Build:** `npm ci && NODE_OPTIONS=--max-old-space-size=384 npm run build`
   - **Start:** `node custom-server.js`
5. Set env vars → Deploy

> Repo ini sudah menyertakan `render.yaml`, jadi Render bisa **Blueprint → New**
> dan membaca build/start command otomatis (`healthCheckPath: /api/health`).

---

## Environment Variables

| Variabel | Value |
|----------|-------|
| `JWT_SECRET` | random string |
| `INITIAL_PASSWORD` | password |
| `NODE_ENV` | production |
| `DATA_DIR` | `/tmp/.9router` (disk Render ephemeral) |
| `UPSTASH_REDIS_REST_URL` / `_TOKEN` | opsional — biar config survive restart/sleep |

---

## Free Tier

- ✅ 750 jam/bulan
- ⚠️ Sleep setelah 15 menit idle
- ⚠️ Cold start 30-60 detik
- 💰 Starter plan ($7/bulan) → gak sleep

---

## Akses

- Dashboard: `https://your-project.onrender.com/dashboard`
- API: `https://your-project.onrender.com/v1`
