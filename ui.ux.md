# Panduan Desain Antarmuka & Pengalaman Pengguna (UI/UX Design System)
## Platform E-Commerce Bunga Premium (Premium Flower E-Commerce Platform)

**Document Version:** 1.0.0  
**Scope:** Design System, Color Palette, Typography, User Journey & Accessibility (WCAG 2.1 AA)  
**Doc ID:** UIUX-FLORA-2026-001  

---

## 1. Filosofi Desain & Arah Visual (Design Philosophy)

Antarmuka **Premium Flower E-Commerce Platform** dirancang dengan prinsip **Boutique Luxury & Artisanal Restraint**. Platform ini menghadirkan suasana galeri bunga prestisius (*high-end Parisian / Kyoto atelier*) dengan sentuhan modern, bersih, dan bebas kekacauan (*clutter-free*).

### Tiga Prinsip Utama Desain:
1. **Fotografi & Bunga sebagai Pusat Perhatian (*Bloom-First Canvas*):** Desain menggunakan ruang putih (*generous whitespace*) yang lega agar warna dan tekstur alami bunga menjadi fokus visual utama.
2. **Ketenangan & Keanggunan Tipografi (*Typographic Grace*):** Pasangan tipografi serif klasik untuk judul (*Playfair Display*) dan sans-serif geometris modern untuk teks tubuh (*Plus Jakarta Sans*).
3. **Sentuhan Humanis & Transparansi Emosional:** Mengutamakan personalisasi kartu ucapan tulisan tangan, segel lilin digital, dan kepastian rasa tenang dalam pengiriman hadiah berharga.

---

## 2. Sistem Warna (Color Token System - 60-30-10 Rule)

Sistem warna mematuhi aturan proporsi 60-30-10 untuk menjaga ketenangan visual dan fokus pada elemen interaktif:

```
[ 60% Dominant Canvas ]      [ 30% Structural Surfaces ]     [ 10% Intent Accents ]
Soft Alabaster / Crisp White   Warm Paper / Deep Slate Charcoal   Rose Gold / Burnished Gold
#FAFAF9 / #FFFFFF             #F5F5F4 / #1C1917                  #B76E79 / #D4AF37
```

| Token Name | Nilai Hex | Fungsi / Penggunaan | Kontras Rasio (ke Background) |
| :--- | :--- | :--- | :--- |
| `canvas-primary` | `#FAFAF9` | Latar belakang utama aplikasi (Stone 50 lembut) | Baseline |
| `surface-card` | `#FFFFFF` | Latar belakang kartu produk, modul checkout, modal | 1.05:1 |
| `surface-subtle` | `#F5F5F4` | Panel samping, drawer keranjang, pembatas section | 1.15:1 |
| `text-primary` | `#1C1917` | Judul produk, harga, teks utama (Deep Charcoal Stone 900) | **13.5:1** (Lolos WCAG AAA) |
| `text-muted` | `#78716C` | Metadata kategori, tips perawatan, petunjuk field | **4.8:1** (Lolos WCAG AA) |
| `accent-gold` | `#B45309` / `#C5A059`| Aksen mewah, garis batas kartu terpilih, bintang rating | **4.9:1** (Lolos WCAG AA) |
| `accent-rose` | `#BE185D` / `#9F1239`| Tombol aksi utama (CTA Buy Now, Tambah ke Keranjang) | **5.2:1** (Lolos WCAG AA) |
| `status-fresh` | `#065F46` | Label jaminan kesegaran (Emerald Deep) | **6.1:1** (Lolos WCAG AA) |
| `border-hairline`| `rgba(0,0,0,0.08)`| Garis batas tipis 1px pemisah section | - |

---

## 3. Tipografi & Skala Hirarki

| Elemen UI | Font Family | Weight | Ukuran & Line-Height | Catatan Gaya |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | Playfair Display | Bold (700) | `clamp(2.5rem, 5vw, 4rem)` / 1.15 | Judul kampanye utama, `text-wrap: balance` |
| **Section Heading** | Playfair Display | SemiBold (600) | `1.75rem - 2.25rem` / 1.25 | Judul koleksi, judul modal |
| **Product Card Title**| Plus Jakarta Sans| SemiBold (600) | `1.0625rem (17px)` / 1.4 | Nama buket bunga |
| **Product Price** | Plus Jakarta Sans| Bold (700) | `1.0rem (16px)` / 1.0 | Menggunakan `tabular-nums` untuk angka sejajar |
| **Body Text** | Plus Jakarta Sans| Regular (400) | `0.9375rem (15px)` / 1.6 | Deskripsi produk, instruksi kurir |
| **Micro Metadata**| Plus Jakarta Sans| Medium (500) | `0.75rem (12px)` / 1.4 | Teks tanpa box pill, pemisah tanda `·` |

---

## 4. Alur Pengguna (User Journey Mapping)

```
[ 1. Discovery & Search ]
        |
        v  (Pilih filter bunga Holland Rose / Moment Anniversary)
[ 2. Product Detail & Live Builder ]
        |
        +---> Pilih Ukuran Buket (Deluxe / Grand / Royale)
        +---> Pilih Kertas Wrapping & Pita Satin
        +---> Tulis Pesan Kartu Ucapan (Live Calligraphy Preview)
        |
        v  (Klik "Tambah ke Keranjang" -> Slide-over Cart Drawer)
[ 3. Cart & Schedule Delivery ]
        |
        +---> Tentukan Tanggal Kirim & Slot Waktu (Pagi / Siang / Instant Same-Day)
        +---> Isi Detail Alamat Rumah & Nomor Telepon Penerima
        +---> Terapkan Kode Voucher (e.g. "BUNGASEGAR" Diskon 10%)
        |
        v  (Klik "Lanjut ke Pembayaran")
[ 4. Seamless Instant Checkout ]
        |
        +---> Pilih Metode Bayar (QRIS Instant / VA Bank / Kartu Kredit / COD)
        +---> Verifikasi Rincian Pesanan
        |
        v  (Pembayaran Sukses)
[ 5. Confirmation & Live Tracking ]
        |
        +---> Tampilan Invoice Interaktif & Ringkasan Pesanan
        +---> Kirim Salinan ke WhatsApp dengan 1 Klik
        +---> Live Map Status Kurir Berpendingin (Pre-shipment photo & GPS Tracking)
```

---

## 5. Wireframe & Spesifikasi Komponen UI Kunci

### 5.1 Top Navigation Bar (The 3-Zone Contract)
- **Zone 1 (Brand Wordmark):** Teks tunggal `FloraSena` menggunakan font *Playfair Display* dengan serif elegan, `whitespace-nowrap shrink-0`.
- **Zone 2 (Nav Links):** 4 link bersih satu baris (`Katalog Koleksi`, `Bespoke Builder`, `Jadwal Pengiriman`, `Tentang Atelier`) dengan efek hover underline halus.
- **Zone 3 (Primary Action):** Tombol Keranjang Belanja interaktif dengan badge counter jumlah item dan tombol konsultasi florist WhatsApp.

### 5.2 Kartu Produk (Product Card Architecture)
```
+-----------------------------------------------------+
| [ Foto Bunga Segar 4:3 Ratio - 70% Card Height ]    |
| (Efek zoom halus 1.03x saat hover)                  |
|                                                     |
| [Status Kesegaran: Bunga Segar Pilihan]             |
+-----------------------------------------------------+
| Kategori Bunga · Holland Roses                     |
| Buket Scarlet Passion Royale                        |
| 20 Tangkai Mawar Merah Belanda & Baby's Breath      |
|                                                     |
| Rp 650.000 (tabular-nums)     [+ Pilih & Kustom]    |
+-----------------------------------------------------+
```

### 5.3 Live Card Builder (Kartu Ucapan Digital)
- Desain berbingkai linen bertekstur dengan sentuhan segel stempel lilin (*wax seal motif*).
- Form input dinamis:
  - Kepada: Nama penerima hadiah bunga.
  - Dari: Nama pengirim / pengagum rahasia (*anonymous checkbox option*).
  - Momen: Dropdown pilihan momen (Ulang Tahun, Wisuda, Pernikahan, Ucapan Lekas Sembuh, Duka Cita).
  - Isi Pesan: Textarea dengan counter maksimal 250 karakter, dipratinjau seketika dalam font kaligrafi bergaris tepi elegan.

### 5.4 Slide-Over Cart Drawer & Instant Checkout Modal
- **Slide-Over Drawer (Lebar 440px di Desktop):**
  - Daftar item dengan thumbnail foto bunga, rincian varian buket, stepper jumlah (+ / -), tombol hapus.
  - Subtotal pesanan, kalkulasi gratis ongkir (indikator progres jika belanja $\ge \text{Rp } 350.000$).
  - Field kupon diskon dengan verifikasi instan.
- **Checkout Modal Berjenjang:**
  - Tab 1: Alamat Rumah & Slot Tanggal Pengiriman.
  - Tab 2: Personalisasi Kartu Ucapan & Lampiran Tambahan.
  - Tab 3: Opsi Pembayaran QRIS / Bank Transfer dengan instruksi otomatis.

---

## 6. Standar Aksesibilitas (WCAG 2.1 AA Compliance)

1. **Rasio Kontras Warna (Contrast Ratio):**
   - Seluruh teks biasa memiliki rasio kontras $\ge 4.5:1$ terhadap background.
   - Elemen interaktif dan tombol memiliki rasio kontras $\ge 3.0:1$.
2. **Target Sentuh Ramah Mobile (Touch Target Sizing):**
   - Seluruh tombol kontrol, tab kategori, dan stepper kuantitas memiliki area sentuh minimum $44 \times 44\text{ px}$.
3. **Dukungan Pembaca Layar (Screen Reader & ARIA):**
   - Seluruh foto produk bunga menyertakan `alt` deskriptif (contoh: `alt="Buket 20 tangkai mawar merah Holland dengan kertas kraft cokelat dan pita satin rose"`).
   - Modal dan drawer menggunakan atribut `role="dialog"`, `aria-modal="true"`, dan `aria-labelledby`.
4. **Fokus Keyboard & Navigasi (Keyboard Navigation):**
   - Indikator fokus yang jelas menggunakan ring aksen `focus-visible:ring-2 focus-visible:ring-amber-600`.
   - Tombol escape (`ESC`) menutup drawer keranjang dan modal konfirmasi secara instan.
