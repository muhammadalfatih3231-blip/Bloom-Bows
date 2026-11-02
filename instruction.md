# Panduan Pengembangan Sistem & Standar DevOps (DevOps & Engineering Manual)
## Platform E-Commerce Bunga Premium (Premium Flower E-Commerce Platform)

**Document Version:** 1.0.0  
**Scope:** Local Setup, Docker Compose, Coding Standards, GitFlow, Testing & CI/CD Deployment  
**Doc ID:** DEV-INSTR-FLORA-2026-001  

---

## 1. Setup Lingkungan Pengembangan Lokal (Local Environment Setup)

### 1.1 Prasyarat Sistem (*System Prerequisites*)
Pastikan perangkat pengembang telah terpasang:
- **Node.js:** `v20.18.0` atau `v22.x` (LTS direkomendasikan via `nvm`)
- **Package Manager:** `pnpm` `v9.x` atau `npm` `v10.x`
- **Go Runtime:** `v1.23+` (untuk Order & Fleet Service)
- **Docker Desktop & Docker Compose:** Docker Engine `v26.0+`
- **Git:** `v2.40+`
- **Make Utility:** `make` untuk otomasi build shortcut

### 1.2 Kloning Repositori & Instalasi Dependensi
```bash
# 1. Kloning repositori proyek utama
git clone https://github.com/flora-sena/premium-flower-ecommerce.git
cd premium-flower-ecommerce

# 2. Instalasi dependensi monorepo / sub-layanan
pnpm install
```

### 1.3 Konfigurasi Variabel Lingkungan (`.env`)
Salin file template `.env.example` ke `.env.local` pada root dan masing-masing microservice:

```bash
cp .env.example .env.local
```

**Contoh Konfigurasi `.env.local` Terpusat:**
```ini
# --- APLIKASI UTAMA & WEB ---
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_GATEWAY_URL=http://localhost:8000/api/v1

# --- DATABASE TIER (POSTGRESQL & POSTGIS) ---
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=flora_secret_dev_pass
DATABASE_NAME=flora_ecommerce_db
DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public

# --- REDIS CLUSTER CACHE ---
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=flora_redis_pass
REDIS_URL=redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}/0

# --- PAYMENT GATEWAY (MIDTRANS) ---
MIDTRANS_SERVER_KEY=SB-Mid-server-XXXXX-TEST
MIDTRANS_CLIENT_KEY=SB-Mid-client-XXXXX-TEST
MIDTRANS_IS_PRODUCTION=false

# --- LOGISTIK & MAPS (LALAMOVE & GOOGLE MAPS) ---
LALAMOVE_API_KEY=test_lalamove_api_key
LALAMOVE_API_SECRET=test_lalamove_api_secret
LALAMOVE_MARKET=ID
GOOGLE_MAPS_API_KEY=AIzaSy_DEV_SAMPLE_KEY

# --- NOTIFIKASI WHATSAPP BUSINESS ---
WHATSAPP_PHONE_NUMBER_ID=109283746501928
WHATSAPP_ACCESS_TOKEN=EAABwz_DEV_TEST_TOKEN
WHATSAPP_WEBHOOK_VERIFY_TOKEN=flora_webhook_verify_secure_2026

# --- JWT & KEAMANAN ---
JWT_ACCESS_SECRET=flora_jwt_access_super_secret_key_512
JWT_REFRESH_SECRET=flora_jwt_refresh_super_secret_key_512
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
```

### 1.4 Menjalankan Komponen Infrastruktur dengan Docker Compose
Gunakan file `docker-compose.dev.yml` untuk memutar PostgreSQL, Redis, dan Kong Gateway secara instan di mesin lokal:

```bash
# Menjalankan database dan cache di background
docker compose -f docker-compose.dev.yml up -d

# Memeriksa status kesehatan container
docker compose -f docker-compose.dev.yml ps
```

**Snippet `docker-compose.dev.yml`:**
```yaml
version: '3.8'

services:
  postgres:
    image: postgis/postgis:16-3.4-alpine
    container_name: flora_postgres_dev
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: flora_secret_dev_pass
      POSTGRES_DB: flora_ecommerce_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./infra/sql/init-extensions.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7.2-alpine
    container_name: flora_redis_dev
    command: ["redis-server", "--requirepass", "flora_redis_pass"]
    ports:
      - "6379:6379"
    volumes:
      - redisdata:/data

  mailhog:
    image: mailhog/mailhog
    container_name: flora_mailhog_dev
    ports:
      - "1025:1025" # SMTP
      - "8025:8025" # Web UI untuk cek email receipt di lokal

volumes:
  pgdata:
  redisdata:
```

### 1.5 Eksekusi Migrasi & Seeding Data Awal
```bash
# Menjalankan migrasi database
pnpm db:migrate

# Mengisi 20 produk bunga segar awal, variasi ukuran, dan template ucapan
pnpm db:seed
```

---

## 2. Standar Koding & Konvensi Rekayasa (Coding Standards)

### 2.1 Konfigurasi Linter & Formatter
Proyek menggunakan kombinasi ketat **ESLint v9**, **Prettier**, dan **TypeScript Strict Mode**:
```bash
# Mengecek kepatuhan format kode
pnpm lint

# Memperbaiki formatting otomatis
pnpm format
```

**Aturan Inti:**
1. *Zero Any:* Penggunaan tipe `any` dilarang. Gunakan `unknown` jika tipe belum pasti, lalu lakukan type-narrowing dengan Zod.
2. *Named Exports:* Wajib menggunakan named exports untuk modul internal demi kemudahan refactoring dan tree-shaking bundler.
3. *Immunity to Null-Pointer:* Selalu manfaatkan optional chaining `?.` dan nullish coalescing `??`.

### 2.2 Konvensi Pesan Commit (Conventional Commits)
Setiap commit diverifikasi secara otomatis oleh `commitlint` dan `husky`:

```
<tipe>(<lingkup opsional>): <deskripsi singkat imperative>

[deskripsi panjang opsional]

[referensi tiket/issue opsional]
```

**Daftar Tipe yang Diizinkan:**
- `feat`: Penambahan fitur baru (misal: `feat(customizer): add 3d ribbon preview`)
- `fix`: Perbaikan bug sistem (misal: `fix(cart): prevent negative quantity on rapid clicks`)
- `docs`: Perubahan atau penambahan dokumentasi (misal: `docs(prd): update SLA delivery metrics`)
- `refactor`: Perombakan struktur kode tanpa mengubah fungsi bisnis (misal: `refactor(order): extract pricing calculator module`)
- `perf`: Peningkatan performa kode (misal: `perf(catalog): cache categories query with redis ttl`)
- `test`: Penambahan unit, integration, atau e2e test (misal: `test(checkout): add payment idempotency test cases`)
- `chore`: Pembaruan konfigurasi build, dependensi, atau skrip dev (misal: `chore(deps): bump tailwindcss to v4`)

### 2.3 Alur Percabangan Kode (GitFlow Strategy)

```
main (Production Ready - Protected)
  ^
  | [Release PR + Automated Tagging]
release/v1.0.0
  ^
  | [Merge after staging sign-off]
develop (Integration Branch - Protected)
  ^
  +--- feature/FLORA-101-cart-drawer
  +--- feature/FLORA-102-custom-greeting-card
  +--- feature/FLORA-103-lalamove-tracking
```

- **Branch Naming:**
  - `feature/<ISSUE-ID>-<keterangan-singkat>` (contoh: `feature/FLORA-204-qris-webhook`)
  - `bugfix/<ISSUE-ID>-<keterangan>` (contoh: `bugfix/FLORA-210-order-rounding`)
  - `hotfix/<keterangan>` (langsung bercabang dari `main` untuk insiden produksi)
- **Pull Request Rules:**
  - Wajib lulus build & seluruh test suite di GitHub Actions.
  - Minimal 1 persetujuan (*code review approval*) dari Senior Engineer.
  - Branch harus tersinkronisasi (*up-to-date*) dengan target branch sebelum di-*squash and merge*.

---

## 3. Strategi Pengujian (Testing Strategy)

```
        / \
       /   \        E2E Tests (Playwright)
      / E2E \       - Checkout Full Flow, Webhook Simulation, Mobile View
     /-------\
    /         \     Integration Tests (Supertest / Testcontainers)
   /  INTEGR.  \    - API Endpoint -> DB Interaction -> Redis Lock -> Payment Mock
  /-------------\
 /               \  Unit Tests (Jest / Vitest / Go Testing)
/      UNIT       \ - Kalkulasi Diskon, Format Kaligrafi, State Machine Order
-------------------
```

### 3.1 Menjalankan Testing
```bash
# 1. Menjalankan Unit Tests
pnpm test:unit

# 2. Menjalankan Integration Tests dengan Testcontainers
pnpm test:integration

# 3. Menjalankan End-to-End Tests dengan Headless Chromium
pnpm test:e2e
```

---

## 4. Pipeline CI/CD & Deployment Guide (GitHub Actions & AWS EKS)

### 4.1 Alur Pipeline Otomatisasi (CI/CD Flow)
Setiap Pull Request ke branch `develop` atau `main` memicu workflow GitHub Actions:

```mermaid
flowchart LR
    Commit[Git Push / PR] --> LintTest[1. Lint & Static Analysis\nESLint + Prettier + TSC]
    LintTest --> Security[2. Security Audit\nTrivy + SonarQube]
    Security --> Tests[3. Automated Testing\nUnit + Integration + E2E]
    Tests --> Build[4. Multi-Stage Docker Build\nPush to AWS ECR]
    Build --> DeployStaging[5. Deploy to Staging EKS\nAuto-Verification]
    DeployStaging --> ManualApproval[6. Production Gate Approval\nTech Lead Sign-off]
    ManualApproval --> DeployProd[7. Blue/Green Deploy to Production EKS]
```

### 4.2 Contoh Definisi Workflow (`.github/workflows/deploy.yml`)
```yaml
name: CI/CD Pipeline - Premium Flower E-Commerce

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  validate:
    name: Code Quality & Test Suite
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Typecheck & Lint
        run: |
          pnpm typecheck
          pnpm lint

      - name: Execute Unit & Integration Tests
        run: pnpm test -- --coverage
        env:
          DATABASE_URL: "postgresql://postgres:test@localhost:5432/test_db"
          REDIS_URL: "redis://localhost:6379/0"

  build-and-push:
    name: Container Build & ECR Push
    needs: validate
    if: github.ref == 'refs/heads/main' || github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and Push Docker Image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/flora-app:$IMAGE_TAG -t $ECR_REGISTRY/flora-app:latest .
          docker push $ECR_REGISTRY/flora-app:$IMAGE_TAG
          docker push $ECR_REGISTRY/flora-app:latest

  deploy-kubernetes:
    name: GitOps Deployment via Kustomize
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Helm / K8s Manifests
        uses: actions/checkout@v4

      - name: Update Image Tag in Kustomize
        run: |
          cd infra/k8s/overlays/production
          kustomize edit set image flora-app=${{ steps.login-ecr.outputs.registry }}/flora-app:${{ github.sha }}

      - name: Apply Manifests to AWS EKS Cluster
        run: |
          aws eks update-kubeconfig --region ap-southeast-1 --name flora-production-cluster
          kubectl apply -k infra/k8s/overlays/production
          kubectl rollout status deployment/flora-web-deployment -n production --timeout=180s
```

### 4.3 Strategi Rollback & Observabilitas
- **Zero-Downtime Rolling Update:** Kubernetes `maxUnavailable: 0` dan `maxSurge: 25%` menjamin pod lama tetap melayani request sampai pod baru dinyatakan sehat melalui *Readiness Probe* (`/api/health/ready`).
- **Instant Rollback:**
  ```bash
  # Jika terdeteksi anomali pada monitoring Grafana p99 latency
  kubectl rollout undo deployment/flora-web-deployment -n production
  ```
- **Disaster Recovery RPO & RTO:**
  - *Recovery Point Objective (RPO):* $\le 5$ menit (AWS Aurora Continuous Point-in-time Restore).
  - *Recovery Time Objective (RTO):* $\le 15$ menit dengan failover otomatis ke read replica multi-AZ.
