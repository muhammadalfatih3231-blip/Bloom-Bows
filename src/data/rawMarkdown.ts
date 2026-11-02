export const RAW_DOCS: Record<string, string> = {
  prd: `# Product Requirement Document (PRD)
## Platform E-Commerce Bunga Premium (Premium Flower E-Commerce Platform)

**Document Version:** 1.0.0  
**Status:** Approved for Sprint Planning  
**Target Release:** MVP v1.0.0  
**Doc ID:** PRD-FLORA-2026-001  

---

## 1. Executive Summary & Visi Produk

### 1.1 Visi Produk
Menjadi platform e-commerce bunga premium terdepan yang memadukan keindahan seni floristry mewah (*luxury floral atelier*) dengan keandalan teknologi modern. Platform ini menyediakan buket pesanan khusus (*bespoke & custom 3D arrangement*), pengiriman ekspres pada hari yang sama (*same-day delivery*) dengan rantai pendingin bergaransi kesegaran 48 jam, serta pengalaman berbelanja digital kelas atas yang mulus dan transparan.

### 1.2 Masalah yang Dipecahkan (Problem Statement)
1. **Risiko Bunga Layu & Kerusakan Fisik Saat Pengiriman:** Pengiriman bunga potong segar konvensional sering tidak memperhitungkan suhu iklim tropis dan guncangan kendaraan, menyebabkan bunga layu atau mahkota rontok saat diterima.
2. **Ketiadaan Kustomisasi Real-Time:** Sebagian besar toko bunga online hanya menampilkan katalog statis tanpa opsi melihat simulasi kombinasi bunga, pilihan kertas pembungkus (*wrapping*), warna pita, dan kartu ucapan beraksen kaligrafi secara langsung.
3. **Ketidakpastian Transaksi & Status Kurir:** Pelanggan sering merasa cemas saat memesan untuk momen berharga (ulang tahun, wisuda, lamaran, duka cita) karena waktu tiba kurir yang tidak pasti, bukti serah terima (*proof of delivery*) yang terlambat, dan konfirmasi transfer manual.

### 1.3 Nilai Tambah (Value Proposition)
- **Garansi Kesegaran 48 Jam (*Freshness Guarantee*):** Bunga langsung dipetik dari perkebunan dataran tinggi binaan dan dikirim menggunakan kemasan *water-pack* berinsulasi termo.
- **Live Bespoke Arrangement Builder:** Kustomisasi varian bunga, ukuran buket (*Petite, Classic, Grand, Royale*), dan pratinjau kartu ucapan kaligrafi secara instan.
- **Real-Time GPS Courier Tracking:** Notifikasi WhatsApp instan beserta tautan pelacakan langsung kurir dan foto serah terima bunga di depan pintu penerima.

---

## 2. Target Pengguna & Karakteristik Persona

| Persona | Profil & Demografi | Kebutuhan Utama | Titik Masalah (*Pain Points*) |
| :--- | :--- | :--- | :--- |
| **Affluent Romantic & Gifter** | Pria/Wanita 24–45 thn, eksekutif/profesional, pendapatan menengah ke atas | Buket eksklusif berkelas tinggi, kemasan mewah beraroma elegan, proses order cepat via smartphone | Takut bunga terlihat pasaran, kartu ucapan salah tulis, pengiriman telat pada hari H |
| **Event & Wedding Planner** | Profesional 27–48 thn, penyelenggara pernikahan dan pesta privat | Pemesanan terjadwal presisi, kustomisasi palet warna tematik (*color harmony*), faktur tagihan resmi | Ketersediaan stok tidak pasti, respon admin lambat, sulit memesan bunga langka |
| **Corporate B2B Client** | HR/Sekretaris/Procurement Perusahaan, Agency, Law Firm, Perbankan | Pengiriman bunga papan modern/standing arrangement untuk rekanan bisnis, dukungan faktur pajak, multi-alamat | Sistem invoice lambat, sulit melacak multi-drop shipment, bunga papan konvensional kaku/ketinggalan zaman |
| **Spontaneous Occasion Shopper** | Pria/Wanita 20–38 thn, butuh bunga mendadak (same-day delivery 2–3 jam) | Pengiriman darurat same-day, katalog stok siap kirim (*ready-to-ship*), checkout tanpa registrasi rumit | Kurir reguler tidak melayani hari yang sama, checkout butuh verifikasi lama |

---

## 3. Fitur Utama (Minimum Viable Product - MVP)

### 3.1 Katalog Bunga Premium Interaktif
- **Pencarian Cerdas & Faceted Filter:**
  - Tipe Bunga: *Holland Rose, Colombian Rose, Phalaenopsis Orchid, Dutch Tulip, Peony, Hydrangea, Casablanca Lily, Baby's Breath*.
  - Kategori Produk: Buket Tangan (*Hand Bouquet*), Rangkaian Meja (*Table Arrangement*), *Bloom Box Akrilik*, Anggrek Hidup Pot Keramik, *Modern Standing Flower*.
  - Momen (*Occasion*): Romantis/Anniversary, Wisuda (*Graduation*), Ulang Tahun, Hari Ibu, Kelahiran Bayi, Simpati/Duka Cita, *Grand Opening*.
  - Urutkan: Terpopuler, Harga Terendah/Tertinggi, Varietas Musiman Terbatas (*Limited Seasonal*).
- **Indikator Stok Dinamis & Ketersediaan Musiman:**
  - Menampilkan stok real-time yang terhubung langsung dengan inventaris ruang dingin (*cold-storage warehouse*).

### 3.2 Bespoke Bouquet Customizer & Live Card Preview
- **Live Variant Customizer:**
  - Pilihan Ukuran Buket: *Deluxe (15-20 tangkai)*, *Grand (30-40 tangkai)*, *Royale Sovereign (50+ tangkai)*.
  - Pilihan Kertas Wrapping: *Matte Cream Kraft, Frosted Rose Blush, Deep Slate Velvet, Royal Gold Accent*.
  - Pilihan Pita: *Raw Silk Ivory, Emerald Green Satin, Blush Velvet, Classic Gold*.
  - Pilihan Add-on: Vas Kaca Fluted Kristal, *Moisturizing Flower Nutrient Pack*, Balon Foil Personal, Boneka Wisuda Mini.
- **Pratinjau Kartu Ucapan Instan (*Interactive Greeting Card*):**
  - Pemilihan amplop segel lilin (*wax seal*) digital.
  - Template teks ucapan (Romantis, Formal B2B, Doa Simpati, Selamat Wisuda).
  - Preview teks bergaya tipografi kaligrafi sebelum checkout.

### 3.3 Penjadwalan Pengiriman & Alamat Presisi
- **Pilihan Slot Waktu Terkendali:**
  - *Instant Same-Day (2-3 Jam tiba)* untuk radius operasional <= 25 km.
  - *Slot Pagi (08:00 - 11:00 WIB)*.
  - *Slot Siang (12:00 - 15:00 WIB)*.
  - *Slot Sore/Senja (16:00 - 19:00 WIB)*.
  - *Midnight Surprise (23:45 - 00:15 WIB)* khusus anniversary/ulang tahun.
- **Penyemat Lokasi Maps & Catatan Kurir Khusus:**
  - Integrasi Geocoding Google Maps untuk akurasi alamat gedung perkantoran, lobi apartemen, atau nomor rumah.
  - Field instruksi kurir: "Titipkan di resepsionis", "Jangan telepon penerima karena kejutan", "Hubungi security terlebih dahulu".

### 3.4 Sistem Keranjang Belanja & Multi-Drop Order
- **Persistent Cart:** Tersimpan di local storage dan akun user (Redis cached).
- **Multi-item Customization:** Setiap item dalam keranjang dapat memiliki kartu ucapan dan slot tanggal pengiriman yang berbeda jika ditujukan ke alamat lain.
- **Validasi Kupon & Diskon:** Voucher potongan harga, gratis ongkos kirim minimum belanja.

### 3.5 Pembayaran Online Instan
- Gateway terintegrasi: QRIS Otomatis, Virtual Account (BCA, Mandiri, BNI, BRI), Kartu Kredit 3D-Secure, e-Wallet (GoPay, OVO, ShopeePay).
- Kedaluwarsa tagihan terotomatisasi (*auto-expiry countdown 15 menit*) untuk menjaga alokasi reservasi bunga segar.

### 3.6 Pelacakan Kurir Real-Time & Notifikasi Multi-Channel
- **Live Map Tracking:** Halaman pelacakan publik terenkripsi (tanpa perlu login) yang menampilkan posisi kurir armada berpendingin secara real-time.
- **Automated WhatsApp Business Webhook:**
  1. Pesanan Diterima & Bunga Sedang Dirangkai oleh Florist Atelier.
  2. Foto Bunga Jadi dikirimkan ke WhatsApp pemesan sebelum dikirim (*Pre-shipment approval photo*).
  3. Kurir Berangkat menuju alamat tujuan dengan link live tracking.
  4. Bunga Diterima beserta foto bukti serah terima (*Proof of Delivery*).

---

## 4. Metrik Keberhasilan (KPI & Target)

| Metrik Kunci | Formula / Pengukuran | Target MVP (Bulan 1–3) |
| :--- | :--- | :--- |
| **Conversion Rate (CR)** | (Total Transaksi Sukses / Total Unique Visitors) * 100% | **>= 3.5%** |
| **On-Time Delivery SLA** | (Pesanan Tiba dalam Rentang Waktu / Total Pesanan) * 100% | **>= 98.0%** |
| **Freshness Damage Rate** | (Klaim Bunga Layu atau Rusak / Total Pengiriman) * 100% | **< 0.5%** |
| **Customer Satisfaction (CSAT)** | Rata-rata bintang penilaian ulasan pelanggan pasca penerimaan | **>= 4.8 / 5.0** |
| **Net Promoter Score (NPS)** | Persentase Promoters dikurangi Persentase Detractors | **>= 70** |
| **Cart Abandonment Rate** | (Keranjang yang tidak dicheckout / Total Keranjang Aktif) * 100% | **< 55%** |
| **Repeat Purchase Rate (90 Days)** | Pelanggan dengan >= 2 kali order dalam jangka 3 bulan | **>= 25%** |

---

## 5. User Stories & Kriteria Penerimaan (Acceptance Criteria)

### US-01: Personalisasi Buket & Pesan Kartu Ucapan
- **Sebagai** pelanggan yang ingin memberikan kejutan romantis,
- **Saya ingin** memilih ukuran mawar, kertas wrapping, dan menulis kartu ucapan dengan live preview,
- **Agar** bunga yang tiba terasa sangat personal dan mewah.

### US-02: Penjadwalan Slot Pengiriman Same-Day
- **Sebagai** pembeli hadiah mendadak,
- **Saya ingin** memilih slot pengiriman instan same-day (2-3 jam),
- **Agar** bunga sampai sebelum acara wisuda atau makan malam selesai.

### US-03: Pelacakan Kurir Real-Time & Foto Konfirmasi
- **Sebagai** pengirim hadiah yang berada di luar kota,
- **Saya ingin** menerima tautan live GPS kurir dan notifikasi foto serah terima bunga di WhatsApp,
- **Agar** saya merasa tenang mengetahui hadiah telah diterima dengan baik.

---

## 6. Kepatuhan Hukum, Privasi & Keamanan
1. **Perlindungan Data Pribadi (UU PDP No. 27/2022):** Enkripsi nomor telepon, alamat rumah, dan nama penerima di database at-rest menggunakan AES-256.
2. **Kepatuhan Transaksi PCI-DSS:** Seluruh data kartu kredit dan transaksi perbankan ditangani langsung oleh Payment Gateway berlisensi Bank Indonesia tanpa menyimpan detail CVV di server aplikasi.
3. **SLA Ketersediaan Layanan (Uptime):** Target availability platform 99.9% dengan arsitektur multi-AZ auto-scaling.`,

  tech_stack: `# Technology Stack Specification & Architectural Rationale
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

| Layer / Domain | Pilihan Teknologi | Versi Target | Rationale & Justifikasi Teknis |
| :--- | :--- | :--- | :--- |
| **Frontend Web** | **Next.js (App Router)** | \`v15.x\` | Hybrid Rendering (SSR/ISR) untuk katalog produk bunga, dynamic OG Image, native Image Optimization. |
| **Bahasa Frontend** | **TypeScript** | \`v5.x\` | Type safety end-to-end, Zod schema validation, proteksi runtime error. |
| **State Management** | **Zustand + TanStack Query** | \`v5.x\` | Zustand untuk keranjang belanja & live 3D customizer; TanStack Query untuk caching data server. |
| **Styling & Design System**| **Tailwind CSS + Radix UI**| \`v4.x\` | Zero runtime bundle styling + kepatuhan aksesibilitas WCAG 2.1 AA. |
| **Backend Core** | **NestJS & Go (Golang)** | NestJS \`v10.x\` / Go \`v1.23\` | Dual-engine: NestJS untuk Core Business & Catalog; Go untuk High-Throughput Order & Real-Time Driver GPS. |
| **Primary Database** | **PostgreSQL (AWS RDS Aurora)** | \`v16.x\` | Transaksi ACID ketat, \`SELECT ... FOR UPDATE\` lock alokasi stok, ekstensi \`PostGIS\` untuk radius kurir. |
| **In-Memory Cache & MQ** | **Redis (AWS ElastiCache)** | \`v7.x\` | Sub-millisecond latency cache katalog, sliding-window rate limiting, Redlock distributed lock, Redis Streams. |
| **Object Storage** | **Amazon S3 + CloudFront CDN**| Latest | Penyimpanan foto buket resolusi tinggi dan foto bukti serah terima kurir (Proof of Delivery). |
| **Container & Orchestration**| **Docker + Kubernetes (EKS)** | K8s \`v1.31\` | Multi-stage Docker build (< 90MB), EKS Cluster Autoscaler & HPA (Horizontal Pod Autoscaler). |
| **Infrastructure as Code** | **Terraform** | \`v1.9+\` | Deklarasi infrastruktur modular (VPC, EKS, RDS Aurora, ElastiCache, S3, IAM). |
| **CI/CD Pipeline** | **GitHub Actions** | GitHub Enterprise | Otomasi linting, testing, security scan Trivy, docker push ECR, dan deploy GitOps via ArgoCD. |

---

## 3. Rincian Pemilihan Komponen & Detail Arsitektur

### 3.1 Frontend Architecture (Next.js & React 19)
- **SSG & ISR:** Revalidasi halaman katalog bunga berkala (\`revalidate: 3600\`).
- **SSR Dinamis:** Validasi ketersediaan stok bunga potong segar secara real-time (\`cache: 'no-store'\`).
- **Asset Optimization:** Otomatisasi format gambar generasi terbaru WebP dan AVIF melalui CloudFront Edge.

### 3.2 Backend Service Breakdown & Language Allocation
- **NestJS Services:** Auth, Customer Profile, Catalog Management, dan Greeting Card Engine.
- **Go Services:** Order Intake, Inventory Reservation State Machine, dan Driver GPS WebSocket streaming.

### 3.3 Data Layer & Caching Topology
- **PostgreSQL Partitioning:** Range partitioning bulanan pada tabel \`orders\` dan \`order_events\`.
- **Redis Multi-Layer:** L1 Product Catalog Cache (TTL 15m), L2 Ephemeral Cart Cache (TTL 7d), Distributed Mutex Lock (Redlock).

---

## 4. Cloud Infrastructure & Topologi Jaringan (AWS Baseline)
- **Public Subnet:** Application Load Balancer (ALB) Multi-AZ.
- **Private Subnet:** Pods Kubernetes (Next.js, NestJS, Go Order Service).
- **Isolated DB Subnet:** RDS Aurora PostgreSQL & ElastiCache Redis tanpa akses publik.`,

  arsitektur: `# Arsitektur Sistem & Spesifikasi Integrasi (System Architecture)
## Platform E-Commerce Bunga Premium (Premium Flower E-Commerce Platform)

**Document Version:** 1.0.0  
**Scope:** Microservices Blueprint, Data Flow, Event-Driven Topology & 3rd-Party Integrations  
**Doc ID:** ARCH-FLORA-2026-001  

---

## 1. Ikhtisar Arsitektur Microservices

Platform E-Commerce Bunga Premium menggunakan pola arsitektur **Microservices Event-Driven** yang memisahkan tanggung jawab bisnis (*separation of concerns*).

### Rincian 6 Layanan Mikro Utama:
1. **Auth & Customer Service:** Manajemen akun pelanggan, JWT session, address book penerima bunga.
2. **Catalog & Product Service:** Manajemen 20+ varian bunga, formula ukuran buket, stok bunga segar.
3. **Order & Checkout Engine (Go):** State machine pesanan, alokasi reservasi bunga 15 menit, kalkulasi subtotal.
4. **Payment Processing Service:** Integrasi Midtrans/Stripe, verifikasi HMAC-SHA512 webhook, rekonsiliasi.
5. **Fleet & Logistics Service (Go + PostGIS):** Validasi alamat via Google Maps API, dispatch Lalamove API, streaming kurir GPS.
6. **Notification Worker:** WhatsApp Business HSM templates, transactional email receipt, push notification.

---

## 2. Diagram Alur Data & Transaksi

### 2.1 Alur Transaksi Pemesanan hingga Pembayaran Berhasil
1. Pelanggan mengirimkan payload pesanan ke API Gateway.
2. Order Service melakukan pengecekan dan penguncian stok bunga di Catalog Service via gRPC.
3. Payment Service membuat tagihan snap token di Midtrans (QRIS / VA).
4. Pelanggan melakukan pembayaran. Midtrans mengirimkan webhook bertanda tangan HMAC.
5. Payment Service memvalidasi signature dan mempublikasikan event \`payment.confirmed\` ke Kafka/Redis Event Bus.
6. Order Service mengubah status pesanan menjadi \`PAYMENT_CONFIRMED\`.
7. Notification Worker mengirimkan konfirmasi rincian pesanan ke WhatsApp pelanggan.

### 2.2 Alur Pemenuhan & Pelacakan Kurir Real-Time
1. Florist Atelier merangkai bunga segar dan mengunggah foto buket jadi (*Pre-shipment approval*).
2. Fleet Service memicu dispatch kurir Lalamove / GrabExpress armada berpendingin (*thermal insulated box*).
3. Kurir melakukan scan QR pick-up dan status berubah menjadi \`OUT_FOR_DELIVERY\`.
4. Posisi GPS kurir disiarkan secara berkala ke live tracking map.
5. Kurir menyerahkan bunga ke penerima di rumah dan mengunggah foto bukti serah terima (*Proof of Delivery*).

---

## 3. Rincian Integrasi Pihak Ketiga (Third-Party Integrations)

### 3.1 Payment Gateway: Midtrans & Stripe
- Protokol HTTPS REST dengan HMAC-SHA512 Signature Verification.
- Metode: QRIS Real-Time, Virtual Account BCA/Mandiri/BRI, Kartu Kredit 3DS, GoPay.
- Idempotency key di setiap request untuk mencegah double-charge.

### 3.2 Logistik & Kurir: Lalamove & GrabExpress API
- Armada mobil MPV ber-AC untuk standing flowers dan rangkaian meja besar.
- Motor bertas khusus insulasi pendingin untuk buket tangan.
- Webhook status penjemputan dan live driver coordinates.

### 3.3 Notifikasi: Meta WhatsApp Business Cloud API
- Template pesan resmi: \`order_confirmation\`, \`pre_shipment_photo\`, \`live_tracking_link\`, \`delivery_success\`.

### 3.4 Geocoding & Radius: Google Maps Platform
- Google Places Autocomplete untuk alamat rumah dan apartemen.
- Distance Matrix API untuk estimasi waktu tempuh (ETA) kurir.`,

  ui_ux: `# Panduan Desain Antarmuka & Pengalaman Pengguna (UI/UX Design System)
## Platform E-Commerce Bunga Premium (Premium Flower E-Commerce Platform)

**Document Version:** 1.0.0  
**Scope:** Design System, Color Palette, Typography, User Journey & Accessibility (WCAG 2.1 AA)  
**Doc ID:** UIUX-FLORA-2026-001  

---

## 1. Filosofi Desain & Arah Visual

Desain platform mengusung estetika **Boutique Luxury & Artisanal Restraint**. Menghadirkan ketenangan galeri bunga mewah dengan fokus utama pada keindahan visual bunga segar, ruang putih yang lega, dan keanggunan tipografi.

---

## 2. Sistem Warna (Color Token System - Aturan 60-30-10)

- **60% Dominant Neutral Canvas:** Alabaster White (\`#FAFAF9\`) dan Crisp White (\`#FFFFFF\`).
- **30% Structural Surfaces:** Warm Stone Paper (\`#F5F5F4\`) dan Deep Charcoal (\`#1C1917\`).
- **10% Intent Accents:** Burnished Gold (\`#C5A059\`) dan Velvet Rose (\`#9F1239\`).

---

## 3. Tipografi & Skala Hirarki

- **Display Headline:** *Playfair Display* (Bold / SemiBold) untuk judul hero dan nama koleksi prestisius.
- **Body & Controls:** *Plus Jakarta Sans* untuk teks deskripsi, label form, dan tombol navigasi.
- **Tabular Figures:** \`font-mono tabular-nums\` pada seluruh harga produk untuk keselarasan vertikal angka.

---

## 4. Alur Pengguna (User Journey Mapping)

\`\`\`
Discovery & Search (Filter Bunga / Momen)
    |
    v
Detail Produk & Live Builder (Ukuran Buket, Kertas Wrapping, Pita, & Kartu Ucapan)
    |
    v
Keranjang Belanja Geser (Slide-Over Cart Drawer + Diskon Kupon)
    |
    v
Penjadwalan Pengiriman (Pilih Tanggal, Slot Waktu Pagi/Siang/Same-Day, & Alamat Rumah)
    |
    v
Instant Checkout (QRIS / Transfer Bank / COD)
    |
    v
Invoice & Live Driver GPS Tracking (Foto Sebelum Kirim & Foto Bukti Penerimaan)
\`\`\`

---

## 5. Standar Aksesibilitas (WCAG 2.1 AA Compliance)
- **Kontras Warna Tinggi:** Rasio kontras teks ke background minimal 4.5:1 (warna teks utama mencapai 13.5:1).
- **Target Sentuh Ramah Mobile:** Seluruh tombol dan kontrol filter minimal 44x44px.
- **Dukungan Screen Reader:** Seluruh gambar memiliki alt-text deskriptif dan dialog modal memiliki atribut ARIA lengkap.`,

  instruction: `# Panduan Pengembangan Sistem & Standar DevOps (DevOps & Engineering Manual)
## Platform E-Commerce Bunga Premium (Premium Flower E-Commerce Platform)

**Document Version:** 1.0.0  
**Scope:** Local Setup, Docker Compose, Coding Standards, GitFlow, Testing & CI/CD Deployment  
**Doc ID:** DEV-INSTR-FLORA-2026-001  

---

## 1. Setup Lingkungan Pengembangan Lokal (Local Setup)

### 1.1 Prasyarat Sistem
- Node.js \`v20.x\` / \`v22.x\` LTS
- pnpm \`v9.x\` atau npm \`v10.x\`
- Go \`v1.23+\`
- Docker Desktop & Docker Compose \`v26.0+\`

### 1.2 Langkah Instalasi & Container Lokal
\`\`\`bash
# 1. Kloning repositori
git clone https://github.com/flora-sena/premium-flower-ecommerce.git
cd premium-flower-ecommerce

# 2. Instalasi dependensi
pnpm install

# 3. Salin environment variables
cp .env.example .env.local

# 4. Jalankan PostgreSQL, PostGIS, & Redis lokal
docker compose -f docker-compose.dev.yml up -d

# 5. Jalankan migrasi dan data bibit 20 produk bunga
pnpm db:migrate
pnpm db:seed
\`\`\`

---

## 2. Standar Koding & Konvensi Rekayasa

### 2.1 Linter, Formatter & Type Safety
- **Zero Any:** Dilarang menggunakan tipe \`any\`. Gunakan Zod untuk validasi skema runtime.
- **ESLint & Prettier:** Jalankan \`pnpm lint\` dan \`pnpm format\` sebelum membuka Pull Request.

### 2.2 Conventional Commits & GitFlow
- Format: \`feat(scope): description\`, \`fix(scope): description\`, \`docs(scope): description\`.
- Branching: \`main\` (produksi), \`develop\` (integrasi), \`feature/FLORA-xxx\` (fitur baru).

---

## 3. Strategi Pengujian (Testing Strategy)
- **Unit Tests:** Menggunakan Vitest / Jest untuk kalkulasi harga, diskon, dan format pesan kartu.
- **Integration Tests:** Menggunakan Supertest dan Testcontainers untuk database transactions.
- **End-to-End Tests:** Menggunakan Playwright untuk simulasi alur checkout lengkap.

---

## 4. Pipeline CI/CD & Deployment Guide
1. Push ke \`develop\` memicu build container di GitHub Actions dan deploy ke staging cluster AWS EKS.
2. Tagging rilis ke \`main\` memicu pipeline Blue/Green deployment ke cluster produksi dengan zero-downtime rolling update.
3. Otomatisasi rollback seketika melalui command:
\`\`\`bash
kubectl rollout undo deployment/flora-web-deployment -n production
\`\`\``
};
