# ▲ Deploy 9Router ke Vercel

> Gratis, auto-deploy dari GitHub, HTTPS otomatis.

## Yang Perlu Kamu Tahu

| Bisa | Gak Bisa |
|------|----------|
| API proxy (/v1) | Token refresh (butuh persistent process) |
| Dashboard | MITM/TLS proxy |
| Provider connections (dari dashboard) | Cloudflare tunnel |
| OAuth login | Background scheduler (quota auto-ping, warm-up) |
| SAML SSO (stateless) | |
| Persistence via Upstash / Supabase | File SQLite lokal (ephemeral disk) |

**Kesimpulan:** Vercel cocok untuk **API proxy + dashboard**. Kalau butuh fitur lengkap (MITM, token refresh, background scheduler), pakai Railway/VPS.

---

## Step-by-Step

### 1. Push ke GitHub

```bash
git clone https://github.com/dikaofc/9router-patch.git
cd 9router-patch
git push origin main
```

### 2. Hubungkan ke Vercel

1. Buka https://vercel.com/new
2. Import repository kamu
3. Framework: **Next.js** (auto-detect)
4. Jangan ubah build settings (sudah di-handle `vercel.json`)

### 3. Set Environment Variables

Buka Vercel Dashboard → Project → Settings → Environment Variables

**Wajib:**

| Variabel | Value |
|----------|-------|
| `JWT_SECRET` | string random 32+ karakter |
| `INITIAL_PASSWORD` | password kamu |

**Opsional (API key):**

| Variabel | Value |
|----------|-------|
| `API_KEY_SECRET` | `sk_your_key` |
| `API_KEYS` | `sk-key1,sk-key2` |

**Opsional (persistence — biar data gak hilang cold start):**

| Variabel | Value |
|----------|-------|
| `UPSTASH_REDIS_REST_URL` | dari Upstash dashboard |
| `UPSTASH_REDIS_REST_TOKEN` | dari Upstash dashboard |

Persistence juga jalan pakai **Supabase** (fallback kedua): set `SUPABASE_URL` +
`SUPABASE_SERVICE_ROLE_KEY` (atau nama Vercel Supabase integration:
`SUPABASE_ANON_KEY` → read-only, tidak cukup untuk menyimpan).

> ⚠️ **Provider key JANGAN ditaruh di env Vercel.** Tambahkan lewat dashboard
> (Settings → Providers); env `PROVIDER_*_API_KEY` tidak lagi di-seed otomatis.
> Lihat `.env.example.vercel` untuk daftar lengkap.

### 4. Deploy

Push ke main branch. Vercel auto-build & deploy.

### 5. Akses

- Dashboard: `https://project.vercel.app/dashboard`
- API: `https://project.vercel.app/v1`

---

## CLI Configuration

### Claude Code

```bash
export ANTHROPIC_API_BASE="https://project.vercel.app/v1"
export ANTHROPIC_API_KEY="sk_your_key"
claude --model cc/claude-opus-4-7
```

### Cursor

```
Settings → Models → Advanced:
  Base URL: https://project.vercel.app/v1
  API Key: sk_your_key
```

---

## Cold Start

Vercel free tier punya cold start ~1-3 detik. Untuk minimize:
- Pakai Upstash (atau Supabase) supaya config/usage di-load sekali, bukan di-seed ulang
- Tambahkan provider key di dashboard, bukan di env (biar ikut tersimpan antar instance)

---

## Troubleshooting

| Error | Solusi |
|-------|--------|
| "No active credentials" | Tambah koneksi provider di dashboard (Settings → Providers) |
| "Unauthorized" | Set `API_KEY_SECRET` / `API_KEYS` dan pakai key yang sama di client |
| Dashboard kosong / data balik ke default | Persistence belum aktif — set Upstash atau Supabase |
| Build gagal | Cek build logs di Vercel Dashboard (`npm ci && npm run build`) |
