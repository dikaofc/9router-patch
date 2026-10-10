<div align="center">

# 9Router

### Satu gateway untuk menghubungkan AI coding tools ke berbagai provider.

Kelola koneksi model, routing, fallback, dan penggunaan dari satu dashboard.
Jalankan secara lokal atau deploy di server milikmu.

[![npm](https://img.shields.io/npm/v/9router?label=npm)](https://www.npmjs.com/package/9router)
[![Docker pulls](https://img.shields.io/docker/pulls/decolua/9router?logo=docker&label=Docker)](https://hub.docker.com/r/decolua/9router)
[![License](https://img.shields.io/github/license/dikaofc/9router-patch)](./LICENSE)

[Mulai cepat](#mulai-cepat) · [Fitur](#fitur) · [Integrasi](#menghubungkan-tools) · [Deployment](#deployment)

**Bahasa:** [Português](./i18n/README.pt-BR.md) · [Tiếng Việt](./i18n/README.vi.md) · [中文](./README.zh-CN.md) · [日本語](./i18n/README.ja-JP.md) · [Русский](./i18n/README.ru.md) · [ไทย](./i18n/README.th.md) · [فارسی](./i18n/README.fa_IR.md) · [Español](./i18n/README.es.md) · [Français](./i18n/README.fr.md)

</div>

---

## Sekilas

9Router adalah gateway AI yang berada di antara aplikasi dan provider model. Aplikasi mengirim permintaan ke satu endpoint; 9Router meneruskannya ke koneksi provider yang kamu atur.

```text
Claude Code · Cursor · Codex · aplikasi OpenAI-compatible
                         │
                         ▼
                 9Router · /v1/*
                 ├─ pemilihan provider dan model
                 ├─ penerjemahan format API
                 ├─ fallback dan pemilihan akun
                 └─ dashboard untuk koneksi dan penggunaan
                         │
                         ▼
          Provider AI yang kamu konfigurasi
```

> 9Router tidak menyertakan kredit atau akses model. Biaya, kuota, ketersediaan model, dan ketentuan penggunaan mengikuti provider yang kamu hubungkan.

## Mulai cepat

### Jalankan dengan npx

Pastikan Node.js tersedia, lalu jalankan:

```bash
npx 9router
```

Buka [http://localhost:20128/dashboard](http://localhost:20128/dashboard), masuk ke dashboard, lalu tambahkan koneksi provider. Buat atau pilih API key untuk menghubungkan klien.

### Jalankan dengan Docker

```bash
docker run -d \
  --name 9router \
  -p 20128:20128 \
  -e JWT_SECRET="ganti-dengan-secret-acak-yang-panjang" \
  -e INITIAL_PASSWORD="ganti-dengan-password-yang-kuat" \
  -v 9router-data:/app/data \
  decolua/9router
```

Dashboard tersedia di [http://localhost:20128/dashboard](http://localhost:20128/dashboard). Volume menyimpan data melewati restart container. Untuk opsi deployment dan konfigurasi lainnya, lihat [panduan Docker](./DOCKER.md).

> **Sebelum membuka akses dari internet:** ganti `JWT_SECRET` dan `INITIAL_PASSWORD`, gunakan HTTPS, serta siapkan penyimpanan persisten untuk platform yang memakai filesystem sementara.

## Fitur

| Kemampuan | Kegunaan |
| --- | --- |
| **Satu endpoint API** | Hubungkan klien ke gateway alih-alih mengatur endpoint setiap provider secara terpisah. |
| **Banyak provider dan model** | Simpan koneksi API key maupun OAuth dalam dashboard; dukungan berbeda menurut provider. |
| **Model combo dan fallback** | Susun urutan model alternatif untuk menangani kegagalan atau batas provider. |
| **Multi-akun** | Kelola beberapa koneksi untuk provider yang sama dan gunakan pemilihan akun yang tersedia. |
| **Penerjemahan format** | Gunakan klien dengan format API yang didukung oleh provider dan rute terkait. |
| **RTK Token Saver** | Kompresi selektif pada keluaran tool yang didukung; penghematan aktual bergantung pada konten dan konfigurasi. |
| **Dashboard penggunaan** | Kelola provider, model combo, API key, serta pantau penggunaan dari satu tempat. |

## Menghubungkan tools

Gunakan alamat server 9Router-mu dan API key yang dibuat di dashboard. Ganti `YOUR_SERVER` dengan alamat instance, misalnya `http://localhost:20128`.

### Claude Code

```bash
export ANTHROPIC_BASE_URL="http://localhost:20128/v1"
export ANTHROPIC_AUTH_TOKEN="API_KEY_DARI_DASHBOARD"
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="API_KEY_DARI_DASHBOARD"
```

### Cursor, Cline, Continue, Roo Code, dan klien lain

Pilih **OpenAI-compatible** atau konfigurasi provider yang sesuai di aplikasi:

| Pengaturan | Nilai |
| --- | --- |
| Base URL | `http://localhost:20128/v1` |
| API key | API key dari dashboard 9Router |
| Model | ID model yang tersedia pada koneksi 9Router-mu |

Pada instance remote, gunakan URL HTTPS milikmu. Nama pengaturan dapat berbeda antar-aplikasi; lihat panduan aplikasi bila diperlukan.

## Deployment

Pilih panduan sesuai platform. Paket gratis, batas penggunaan, dan ketersediaan layanan ditentukan oleh masing-masing platform dan dapat berubah.

| Platform | Panduan |
| --- | --- |
| Docker | [DOCKER.md](./DOCKER.md) |
| Vercel | [VERCEL.md](./VERCEL.md) |
| Netlify | [NETLIFY.md](./NETLIFY.md) |
| Railway | [RAILWAY.md](./RAILWAY.md) |
| Render | [RENDER.md](./RENDER.md) |
| Google Cloud Run | [CLOUDRUN.md](./CLOUDRUN.md) |
| Koyeb | [KOYEB.md](./KOYEB.md) |
| Zeabur | [ZEABUR.md](./ZEABUR.md) |
| Replit | [REPLIT.md](./REPLIT.md) |
| Glitch | [GLITCH.md](./GLITCH.md) |

### Catatan untuk deployment serverless

Filesystem pada platform serverless biasanya tidak persisten. Konfigurasikan penyimpanan yang didukung agar data dashboard tetap ada setelah cold start; lihat `.env.example.vercel` dan panduan deployment platform. Beberapa fitur yang memerlukan proses berjalan terus-menerus mungkin tidak tersedia di serverless.

## Konfigurasi penting

Salin `.env.example` menjadi `.env` untuk konfigurasi lokal. Untuk Vercel atau Netlify, lihat `.env.example.vercel`.

| Variabel | Fungsi |
| --- | --- |
| `JWT_SECRET` | Secret untuk menandatangani sesi dashboard. Tetapkan nilai acak yang panjang di production. |
| `INITIAL_PASSWORD` | Password awal dashboard. Ganti nilai default sebelum membuka akses remote. |
| `PORT` | Port server; default `20128`. |
| `DATA_DIR` | Direktori data lokal; default `~/.9router`. Pada Docker, gunakan `/app/data` dan mount volume. |
| `API_KEY_SECRET` | Secret untuk API key yang dikelola 9Router. |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Opsi penyimpanan persisten untuk deployment yang mendukung Upstash. |

Tambahkan kredensial provider melalui **Dashboard → Settings → Providers**. Jangan masukkan API key provider ke README atau commit ke repository.

## Pengembangan

```bash
npm ci
npm run dev
```

Server development berjalan di [http://localhost:20127](http://localhost:20127). Untuk build production:

```bash
npm run build
```

Untuk konfigurasi lokal, salin `.env.example` ke `.env` lalu sesuaikan nilainya dengan lingkunganmu.

## Pengujian

Suite Vitest berada di paket terpisah dalam `tests/`. Instal dependensi root terlebih dahulu:

```bash
npm ci
npm --prefix tests install
cd tests
npx vitest run
```

Jalankan satu berkas tes dengan:

```bash
npx vitest run unit/capabilities.test.js
```

## Struktur repository

```text
src/                 Aplikasi Next.js, dashboard, dan API
open-sse/            Engine routing, executor, dan penerjemahan format
cli/                 Paket npm untuk menjalankan dan mengelola server
tests/               Suite pengujian Vitest
docs/                Dokumentasi arsitektur
```

## Lisensi dan kredit

9Router menggunakan lisensi [MIT](./LICENSE). Dibuat oleh [decolua](https://github.com/decolua/9router) dan kontributor open source.
