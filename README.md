# 🌸 Bloom&Bows — Florist & Flower Delivery Atelier

> **Platform E-Commerce Bunga Segar Online & Delivery Terpercaya**  
> Didesain dengan estetika modern, fitur kustomisasi ukuran dengan ilustrasi visual nyata, opsi pita dan vas kristal, kartu ucapan personal, serta alur belanja dan checkout interaktif.

---

## 📋 Daftar Isi

1. [Tentang Proyek](#-tentang-proyek)
2. [Fitur Utama](#-fitur-utama)
3. [Ilustrasi & Pilihan Varian Ukuran](#-ilustrasi--pilihan-varian-ukuran)
4. [Struktur Harga & Voucher Kupon](#-struktur-harga--voucher-kupon)
5. [Tech Stack & Arsitektur](#-tech-stack--arsitektur)
6. [Struktur Direktori Proyek](#-struktur-direktori-proyek)
7. [Panduan Menjalankan di VS Code](#-panduan-menjalankan-di-vs-code)
8. [Tanya Jawab (FAQ) & File `bun.lock`](#-tanya-jawab-faq--file-bunlock)
9. [Perintah Scripts (CLI)](#-perintah-scripts-cli)
10. [Lisensi](#-lisensi)

---

## 💐 Tentang Proyek

**Bloom&Bows** adalah aplikasi web toko bunga modern (*fresh flower atelier*) yang memudahkan pelanggan memesan buket bunga mawar segar, bunga meja hias, bloom box kado, dan karangan bunga papan ucapan langsung dari rumah.

Website ini menghadirkan pengalaman belanja premium seperti mengunjungi toko bunga eksklusif secara langsung, lengkap dengan transparansi jumlah tangkai bunga (*stem count*), visualisasi ukuran, garansi kesegaran 48 jam, dan opsi pengiriman hari yang sama (*Same-Day Delivery*).

---

## ✨ Fitur Utama

- **Katalog 20 Produk Bunga Segar**:
  - **Buket Bunga Segar (`buket`)**: *Rosé Radiance, Sunset Whisper, Scarlet Romance, Pure Elegance, Lavender Mist, Sweet Marshmallow, Sapphire Blossom, Peach Sorbet, Sunbeam Joy, Golden Autumn*.
  - **Bunga Meja & Vas Kristal (`meja`)**: *Emerald Symphony, Victorian Grace, Peony Whispers, Bohemian Sunset*.
  - **Bloom Box Hadiah Mewah (`box`)**: *Crimson Majesty Box, Mon Amour Velvet Box, Pastel Dreams Box, Parisian Noir Box*.
  - **Bunga Papan Ucapan Acara (`papan`)**: *Eternal Embrace Bunga Papan, Forever Begins Bunga Papan*.
- **Kustomisasi Ukuran Interaktif (Visual Size Selector)**:
  - Pelanggan dapat membandingkan ukuran secara visual lewat foto komparasi nyata.
  - Opsi: **Standar (Classic)**, **Deluxe**, dan **Grand Royale**.
- **Opsi Vas Kaca Kristal Otomatis (Smart Logic)**:
  - Tersedia opsi tambahan Vas Kaca Kristal Teardrop (+Rp 75.000).
  - *Smart check*: Fitur vas otomatis disembunyikan untuk produk yang tidak memerlukannya (misalnya Bunga Papan Ucapan).
- **Pemilihan Pita Satin & Velvet Eksklusif**:
  - Pilihan warna pita: *Rose Velvet, Gold Champagne, Dusty Rose, Emerald Silk*.
- **Kartu Ucapan Gratis (*Complimentary Card*)**:
  - Kustomisasi nama penerima, nama pengirim, momen (Ulang Tahun, Romantis, Wisuda, dll.), dan pesan khusus.
- **Sistem Keranjang & Checkout Lengkap**:
  - Perhitungan subtotal otomatis secara real-time.
  - Validasi kode kupon promo langsung di kasir.
  - Kebijakan **Bebas Ongkos Kirim** untuk pesanan mulai dari Rp 350.000 (ongkir reguler Rp 35.000).
  - Pilihan slot pengiriman: *Instant Same-Day (2-3 jam)*, *Slot Pagi (08:00-11:00)*, *Slot Siang (13:00-16:00)*, dan *Slot Sore (17:00-20:00)*.
  - Multi-metode pembayaran: QRIS Instan, Transfer Bank BCA, Mandiri Virtual Account, dan COD (Bayar di Tempat).
- **Pencarian & Filter Cepat**:
  - Filter kategori bunga (Buket, Bunga Meja, Bloom Box, Bunga Papan).
  - Pencarian fleksibel berdasarkan nama bunga, jenis bunga, dan momen acara.
  - Urutan harga (*Termurah, Termahal, Paling Populer*).

---

## 📐 Ilustrasi & Pilihan Varian Ukuran

Setiap produk dilengkapi dengan 3 varian ukuran yang dapat dipilih di menu kustomisasi modal, disertai foto ilustrasi rimbunnya bunga:

| Varian Ukuran | Estimasi Jumlah Bunga | Rasio Pengali | Keterangan & Karakteristik |
| :--- | :--- | :---: | :--- |
| **Standar (Classic)** | 10 – 12 Tangkai | 1.0x (Harga Dasar) | Proporsional, manis, anggun untuk kejutan harian atau ucapan selamat wisuda. |
| **Deluxe** *(Paling Diminati)* | 20 – 25 Tangkai | 1.35x | Rangkaian padat, rimbun, dan penuh warna. Cocok untuk hadiah perayaan atau ulang tahun. |
| **Grand Royale** *(Eksklusif)* | 40 – 50 Tangkai | 1.85x | Format ekstra megah, bervolume tinggi, dan mewah untuk momen sakral, anniversary, atau lamaran. |

---

## 🏷️ Struktur Harga & Voucher Kupon

### 💰 Standar Harga Realistis & Berimbang
Seluruh katalog produk telah disesuaikan agar tidak terlalu murah (tetap menjaga standar *fresh cut flowers* impor dan premium lokal) dan tidak terlalu mahal (menghilangkan lonjakan harga ekstrim jutaan rupiah):
- **Buket Bunga Segar**: Rp 275.000 – Rp 375.000 (Standar)
- **Bunga Meja & Vas**: Rp 395.000 – Rp 485.000 (Standar)
- **Bloom Box Hadiah**: Rp 425.000 – Rp 520.000 (Standar)
- **Bunga Papan Ucapan (2x1.25m)**: Rp 595.000 – Rp 645.000 (Standar)
- **Add-on Vas Kristal**: +Rp 75.000

### 🎟️ Kode Kupon Promo yang Dapat Digunakan
Pelanggan dapat memasukkan kode kupon berikut pada langkah ringkasan checkout:

| Kode Kupon | Potongan | Keterangan |
| :--- | :---: | :--- |
| `BLOOM10` | **Diskon 10%** | Berlaku untuk semua pesanan bunga segar. |
| `BUNGASEGAR` | **Diskon 10%** | Kupon promo musiman bunga potong segar. |
| `BLOOMBOWS` | **Potongan Rp 50.000** | Voucher potongan langsung tanpa minimum belanja. |

---

## 🛠️ Tech Stack & Arsitektur

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) dengan plugin `@tailwindcss/vite`
- **Icon Pack**: [Lucide React](https://lucide.dev/)
- **Animasi**: [Motion](https://motion.dev/)
- **State Management**: React Hooks murni (`useState`, `useMemo`, `useEffect`) tanpa overhead eksternal.

---

## 📂 Struktur Direktori Proyek

```text
├── index.html                   # HTML Entry point & meta SEO
├── package.json                 # Konfigurasi dependensi & skrip npm
├── vite.config.ts               # Konfigurasi bundler Vite + Tailwind plugin
├── tsconfig.json                # Konfigurasi TypeScript compiler
├── metadata.json                # Metadata & capabilities proyek
├── bun.lock                     # Lockfile cepat bawaan environment
│
├── src/
│   ├── main.tsx                 # Root React entry point
│   ├── App.tsx                  # Komponen utama Bloom&Bows (UI, Cart, Checkout, Modal)
│   ├── index.css                # Global styles & Tailwind import directives
│   │
│   ├── types/
│   │   └── flower.ts            # Type definition TypeScript (Product, Cart, Order, dll.)
│   │
│   ├── data/
│   │   ├── products.ts          # 20 Data produk bunga lengkap beserta spesifikasi
│   │   ├── docsContent.ts       # Dokumentasi & panduan teknis
│   │   └── rawMarkdown.ts       # Raw spec markdown loader
│   │
│   └── assets/
│       └── images/              # Aset visual foto produk & ilustrasi ukuran
│           ├── hero_florist_real.jpg
│           ├── size_standard_bouquet_*.jpg
│           ├── size_deluxe_bouquet_*.jpg
│           ├── size_grande_royale_*.jpg
│           └── products/
│
└── README.md                    # Dokumentasi lengkap proyek ini
```

---

## 💻 Panduan Menjalankan di VS Code

Ikuti langkah-langkah mudah di bawah ini untuk membuka dan menjalankan proyek ini di laptop atau komputer Anda menggunakan **Visual Studio Code**:

### 1. Prasyarat Sistem
Pastikan perangkat Anda sudah terpasang:
- **Node.js**: Versi LTS 18 atau 20+ ([Unduh Node.js](https://nodejs.org/))
- **Visual Studio Code**: Versi terbaru ([Unduh VS Code](https://code.visualstudio.com/))
- **Git** (opsional, jika meng-clone repositori)

### 2. Membuka Folder Proyek di VS Code
1. Ekstrak atau buka folder hasil unduhan aplikasi ini.
2. Buka Visual Studio Code.
3. Klik menu **File** > **Open Folder...** (atau tekan `Ctrl + K, Ctrl + O` di Windows / `Cmd + O` di Mac).
4. Pilih folder root aplikasi ini.
5. Anda juga bisa membuka via terminal dengan mengetik:
   ```bash
   code .
   ```

### 3. Ekstensi VS Code yang Direkomendasikan
Untuk pengalaman coding terbaik, pasang ekstensi resmi berikut di VS Code (tekan `Ctrl + Shift + X`):
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) — auto-complete class styling.
- **ESLint** (`dbaeumer.vscode-eslint`) — pemeriksaan linting otomatis.
- **Prettier - Code formatter** (`esbenp.prettier-vscode`) — format kode otomatis saat simpan.

### 4. Instalasi Dependensi
Buka Terminal terintegrasi di VS Code (`Ctrl + ~` atau menu **Terminal** > **New Terminal**), lalu jalankan:

```bash
npm install
```

> *Atau jika Anda menggunakan package manager lain:*  
> `pnpm install` atau `bun install`

### 5. Menjalankan Server Pengembangan Lokal
Setelah proses instalasi selesai, jalankan server pengembangan:

```bash
npm run dev
```

Terminal akan menampilkan pesan:
```text
  VITE v8.x.x  ready in 250 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```

Klik link tersebut atau buka peramban web (Chrome, Edge, Firefox) dan akses:  
👉 **`http://localhost:3000`**

---

## ❓ Tanya Jawab (FAQ) & File `bun.lock`

### Kenapa ada file `bun.lock` di dalam kode?
- **Asal-usul**: File `bun.lock` dibuat secara otomatis ketika lingkungan kontainer atau builder menggunakan **Bun** untuk resolusi paket dependensi berkecepatan tinggi.
- **Apakah mempengaruhi penggunaan `npm` di VS Code?**: **Sama sekali tidak berpengaruh buruk.**
- Anda tetap dapat menggunakan `npm install` dengan normal. `npm` akan membaca file `package.json` dan membuat file `package-lock.json` di komputer Anda tanpa mengganggu stabilitas proyek.
- File `bun.lock` aman dibiarkan di repositori sebagai penanda lockfile jika proyek di-build menggunakan Bun runner.

### Bagaimana jika port 3000 bentrok dengan aplikasi lain?
Vite sudah dikonfigurasi pada port `3000`. Jika port sedang digunakan aplikasi lain di komputer Anda, Anda dapat menggantinya sementara di terminal:
```bash
npx vite --port 3001
```

---

## 🚀 Perintah Scripts (CLI)

Tabel skrip yang tersedia di dalam `package.json`:

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan local development server dengan hot reload di port 3000 |
| `npm run build` | Melakukan kompilasi produksi ke direktori `/dist` |
| `npm run preview` | Menjalankan server lokal untuk menguji hasil build produksi |
| `npm run lint` | Menjalankan verifikasi tipe TypeScript (`tsc --noEmit`) tanpa error |
| `npm run clean` | Menghapus folder `dist` dan file build sementara |

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah lisensi **Apache-2.0**. Dibuat untuk menghadirkan pengalaman belanja bunga berkualitas tinggi dan menyenangkan.

Selamat merangkai kebahagiaan bersama **Bloom&Bows**! 🌹✨
