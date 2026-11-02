# Technology Stack Specification & Architectural Rationale
## Platform E-Commerce Bunga Premium (Premium Flower E-Commerce Platform)

**Document Version:** 1.0.0  
**Scope:** Core Stack, Infrastructure, Data Stores, & Tooling Selection  
**Doc ID:** TECH-STACK-FLORA-2026-001  

---

## 1. Ringkasan Eksekutif Arsitektur Teknologi

Pemilihan teknologi untuk **Premium Flower E-Commerce Platform** dirancang untuk memenuhi empat pilar non-fungsional:
1. **Performa & SEO Unggul:** Skor Core Web Vitals (LCP < 1.2s, CLS < 0.05, FID/INP < 100ms) untuk memaksimalkan ranking organik katalog bunga premium.
2. **Kekuatan Transaksional (ACID & Concurrency):** Menjamin konsistensi alokasi stok bunga potong segar pada jam sibuk (Valentine, Hari Ibu, Wisuda) tanpa risiko *overselling*.
3. **Observabilitas & Ketersediaan Tinggi (High Availability):** Redundansi multi-Availability Zone (AZ) dengan target uptime 99.95%.
4. **Keamanan Data & Skalabilitas Elastis:** Arsitektur terisolasi dalam VPC dengan *Zero-Trust network policies*.

---

## 2. Matriks Pemilihan Teknologi Utama

| Layer / Domain | Pilihan Teknologi | Versi Target | Rationale & Justifikasi Teknis | Alternatif yang Dipertimbangkan |
| :--- | :--- | :--- | :--- | :--- |
| **Frontend Web** | **Next.js (App Router)** | `v15.x` | Hybrid Rendering (SSR/ISR) untuk ribuan halaman katalog produk bunga, dynamic OG Image generation, native Image Optimization untuk foto bunga resolusi tinggi. | Nuxt.js (Vue), Vite SPA (Kurang optimal untuk SEO katalog bunga publik). |
| **Bahasa Frontend** | **TypeScript** | `v5.x` | Type safety end-to-end, integrasi Zod schema sharing antara client dan server, meminimalkan runtime error pada form kustomisasi buket. | Vanilla JavaScript. |
| **State Management** | **Zustand + TanStack Query** | `v5.x` | Zustand untuk client state (keranjang belanja, live 3D customizer), TanStack Query untuk caching data server, automatic refetching, dan optimistic UI updates. | Redux Toolkit (Terlalu verbose), Context API (Risiko re-render berlebih). |
| **Styling & Design System**| **Tailwind CSS + Radix UI**| `v4.x` | Utility-first CSS dengan zero runtime bundle overhead; Radix UI menjamin kepatuhan aksesibilitas WCAG 2.1 AA untuk dialog, popover, dan dropdown. | Styled Components (Runtime cost tinggi), Bootstrap. |
| **Backend Core** | **NestJS (TypeScript)** & **Go (Golang)** | NestJS `v10.x` / Go `v1.23` | **Dual-engine strategy:** NestJS untuk Core Business & Catalog Management (arsitektur modular, DDD, IoC); Go untuk *High-Throughput Order & Real-Time Tracking Engine* (goroutines ringan, low-memory footprint). | Django/Python (Latency I/O lebih tinggi), Spring Boot (Konsumsi memori lebih berat). |
| **Primary Database** | **PostgreSQL (AWS RDS Aurora)** | `v16.x` | Dukungan transaksi ACID ketat, locking row-level `SELECT ... FOR UPDATE` untuk isolasi alokasi stok, extension `PostGIS` untuk kalkulasi jarak radius kurir dan geofencing toko. | MongoDB (Kurang cocok untuk relasi transaksi multi-tabel finansial), MySQL. |
| **In-Memory Cache & MQ** | **Redis (AWS ElastiCache)** | `v7.x` | Sub-millisecond latency untuk caching katalog bunga terpopuler, rate limiting API (sliding window), distributed lock (Redlock) untuk transaksi flash sale, dan Redis Pub/Sub untuk update status live tracking. | Memcached (Tidak ada struktur data kaya atau persistence). |
| **Object Storage** | **Amazon S3 + CloudFront CDN**| Latest | Penyimpanan foto buket resolusi tinggi, foto kartu ucapan kaligrafi, dan foto bukti serah terima kurir (*Proof of Delivery*). CloudFront menjamin pengiriman aset cepat di seluruh kota. | Cloudinary standalone, GCS. |
| **Container & Orchestration**| **Docker + Kubernetes (EKS)** | K8s `v1.31` | Multi-stage Docker build untuk image ramping (< 90MB); AWS EKS dengan Cluster Autoscaler dan HPA (Horizontal Pod Autoscaler) untuk otomatisasi skala saat lonjakan event. | AWS ECS (Cukup baik namun kurang fleksibel untuk multi-cloud/hybrid monitoring), Bare Metal. |
| **Infrastructure as Code** | **Terraform** | `v1.9+` | Deklarasi infrastruktur modular yang dapat direproduksi (VPC, EKS cluster, RDS Aurora, Redis cluster, S3 buckets, IAM roles). | AWS CloudFormation, Pulumi. |
| **CI/CD Pipeline** | **GitHub Actions** | GitHub Enterprise | Otomasi terintegrasi: linting, unit test, build docker image, security scanning (Trivy), push ke ECR, dan deploy GitOps via ArgoCD ke Kubernetes. | GitLab CI, Jenkins. |

---

## 3. Rincian Pemilihan Komponen & Detail Arsitektur

### 3.1 Frontend Architecture (Next.js & React 19)
- **Rendering Strategy:**
  - **Static Site Generation (SSG) + Incremental Static Regeneration (ISR):** Digunakan pada halaman beranda, artikel perawatan bunga (*flower care guides*), dan halaman kategori dengan revalidasi berkala (`revalidate: 3600`).
  - **Server-Side Rendering (SSR):** Digunakan pada halaman detail produk buket yang membutuhkan validasi ketersediaan stok bunga potong segar secara real-time (`cache: 'no-store'`).
  - **Client-Side Interactive Modules:** Digunakan pada *3D / Live Bouquet Builder*, pemilihan tanggal/slot pengiriman, dan modul keranjang belanja geser (*slide-over cart drawer*).
- **Asset Optimization Pipeline:**
  - Menggunakan format gambar generasi terbaru `WebP` dan `AVIF` yang di-serve melalui CDN dengan kompresi adaptif berdasarkan kecepatan koneksi pengguna.

### 3.2 Backend Service Breakdown & Language Allocation

```
+------------------------------------------------------------------------+
|                          API Gateway (Kong / Envoy)                    |
+-----------------------------------+------------------------------------+
                                    |
          +-------------------------+-------------------------+
          | gRPC / REST (Internal)                            |
          v                                                   v
+-------------------------------+           +----------------------------------+
|      Order & Tracking Core    |           |    Catalog & Identity Service    |
|        Language: Go           |           |       Language: Node.js (NestJS) |
|  - Concurrency Order Intake   |           |  - Catalog & Category Hierarchy  |
|  - Live Driver GPS WebSocket  |           |  - RBAC & Customer Profiles      |
|  - Inventory Reservation      |           |  - Greeting Card Template Engine |
|  - PostGIS Proximity Engine   |           |  - Review & Rating Moderation    |
+---------------+---------------+           +-----------------+----------------+
                |                                             |
                +---------------------+-----------------------+
                                      |
                     +----------------v---------------+
                     |  PostgreSQL 16 Multi-AZ Aurora |
                     |  + Redis Cluster 7 (ElastiCache)
                     +--------------------------------+
```

1. **NestJS Services:**
   - Menyediakan arsitektur Enterprise dengan TypeScript decorators, Swagger/OpenAPI auto-generation, dependency injection, serta integrasi Prisma/TypeORM untuk data modeling yang terstruktur.
2. **Go Services:**
   - Dikhususkan untuk menangani *Order Processing Pipeline* dan *WebSocket Live Courier Location Broadcasting*. Mampu melayani puluhan ribu koneksi WebSocket bersamaan dengan konsumsi RAM yang sangat efisien (< 200MB per pod).

### 3.3 Data Layer & Caching Topology
- **PostgreSQL Partitioning:**
  - Tabel `orders` dan `order_events` dipartisi secara bulanan (*range partitioning by created_at*) untuk menjaga performa query transaksi historis tetap optimal.
- **Redis Multi-Layer Caching:**
  - **L1 Cache (Katalog Bunga):** TTL 15 menit dengan mekanisme *cache invalidation* berbasis event saat admin memperbarui harga atau stok bunga.
  - **L2 Cache (Session & Ephemeral Cart):** TTL 7 hari untuk keranjang belanja guest dengan identifier cookie unik.
  - **Distributed Locks (Redlock):** Mencegah *race condition* saat dua pelanggan memilih varian bunga potong langka yang tersisa 1 tangkai terakhir.

---

## 4. Cloud Infrastructure & Topologi Jaringan (AWS Baseline)

```
[ Internet Traffic ]
        |
        v
[ CloudFront CDN + AWS WAF (DDoS Mitigation, Rate Limiting) ]
        |
        v
[ Application Load Balancer (ALB) - Public Subnet Multi-AZ ]
        |
        +---> [ EKS Node Group (Private App Subnet) ]
                    |-- Pod: Next.js Frontend
                    |-- Pod: NestJS Catalog API
                    |-- Pod: Go Order Service
                    |-- Pod: Notification Worker
                    |
                    +---> [ Data Tier (Isolated DB Subnet - No Internet Access) ]
                                |-- AWS RDS Aurora PostgreSQL (Writer + Reader Replica)
                                |-- AWS ElastiCache Redis Multi-AZ Cluster
```

- **Keamanan VPC:**
  - Subnet publik hanya menampung Application Load Balancer (ALB).
  - Seluruh pod aplikasi Kubernetes berjalan di Private Subnets.
  - Database PostgreSQL dan Redis berjalan di Isolated Subnets tanpa akses internet keluar, diakses hanya melalui Security Group spesifik port 5432 dan 6379.
- **Penyimpanan Media S3:**
  - Bucket dikonfigurasi dengan *Block Public Access* 100%, hanya dapat diakses melalui *CloudFront Origin Access Control (OAC)*.
  - *Lifecycle Policy*: Gambar serah terima kurir (*Proof of Delivery*) dipindahkan ke S3 Glacier setelah 90 hari untuk efisiensi biaya penyimpanan.

---

## 5. Standar DevOps, Observabilitas & Tooling

| Domain | Alat / Standar | Fungsi & Spesifikasi |
| :--- | :--- | :--- |
| **Logging Terpusat** | **FluentBit + Grafana Loki** | Log terstruktur dalam format JSON dengan korelasi `trace_id` di setiap request. |
| **Metrik & Monitoring** | **Prometheus + Grafana** | Monitoring utilisasi CPU, Memory, HTTP status codes, p95/p99 latency, dan order throughput. |
| **Distributed Tracing** | **OpenTelemetry + Jaeger** | Menelusuri alur request dari frontend Next.js melalui API Gateway, microservices, hingga query database. |
| **Error Tracking** | **Sentry** | Pemantauan crash runtime JavaScript di browser pelanggan dan unhandled exception di backend. |
| **Security Scanning** | **SonarQube, Trivy, Snyk** | Scanning static code (SAST), vulnerability container Docker, dan audit lisensi dependencies. |
