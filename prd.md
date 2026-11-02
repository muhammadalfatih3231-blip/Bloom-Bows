# Product Requirement Document (PRD)
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
  - *Instant Same-Day (2-3 Jam tiba)* untuk radius operasional $\le 25\text{ km}$.
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
| **Conversion Rate (CR)** | (Total Transaksi Sukses / Total Unique Visitors) $\times 100\%$ | **$\ge 3.5\%$** |
| **On-Time Delivery SLA** | (Pesanan Tiba dalam Rentang Waktu / Total Pesanan) $\times 100\%$ | **$\ge 98.0\%$** |
| **Freshness Damage Rate** | (Klaim Bunga Layu atau Rusak / Total Pengiriman) $\times 100\%$ | **$< 0.5\%$** |
| **Customer Satisfaction (CSAT)** | Rata-rata bintang penilaian ulasan pelanggan pasca penerimaan | **$\ge 4.8 / 5.0$** |
| **Net Promoter Score (NPS)** | Persentase Promoters dikurangi Persentase Detractors | **$\ge 70$** |
| **Cart Abandonment Rate** | (Keranjang yang tidak dicheckout / Total Keranjang Aktif) $\times 100\%$ | **$< 55\%$** |
| **Repeat Purchase Rate (90 Days)** | Pelanggan dengan $\ge 2$ kali order dalam jangka 3 bulan | **$\ge 25\%$** |

---

## 5. User Stories & Kriteria Penerimaan (Acceptance Criteria)

### US-01: Personalisasi Buket & Pesan Kartu Ucapan
- **Sebagai** pelanggan yang ingin memberikan kejutan romantis,
- **Saya ingin** memilih ukuran mawar, kertas wrapping, dan menulis kartu ucapan dengan live preview,
- **Agar** bunga yang tiba terasa sangat personal dan mewah.
- **Acceptance Criteria (Gherkin):**
  - *Given* pengguna berada di halaman detail produk buket mawar,
  - *When* pengguna mengubah ukuran ke "Royale (50 Tangkai)" dan memilih pita "Rose Velvet",
  - *Then* subtotal harga terbarui seketika dalam waktu $\le 100\text{ms}$ tanpa reload halaman,
  - *And* pratinjau kartu ucapan menampilkan nama penerima dan teks ucapan secara proporsional.

### US-02: Penjadwalan Slot Pengiriman Same-Day
- **Sebagai** pembeli hadiah mendadak,
- **Saya ingin** memilih slot pengiriman instan same-day (2-3 jam),
- **Agar** bunga sampai sebelum acara wisuda atau makan malam selesai.
- **Acceptance Criteria:**
  - *Given* waktu saat ini pukul 14:00 WIB dan alamat pengiriman berjarak 12 km dari workshop hub,
  - *When* pengguna masuk ke langkah pengiriman,
  - *Then* sistem mengizinkan pemilihan slot "Sore 16:00 - 19:00 WIB" atau "Same-Day Instant 2 Jam",
  - *And* jika stok bunga tidak mencukupi untuk same-day, sistem memberi label peringatan yang jelas dan menawarkan alternatif.

### US-03: Pelacakan Kurir Real-Time & Foto Konfirmasi
- **Sebagai** pengirim hadiah yang berada di luar kota,
- **Saya ingin** menerima tautan live GPS kurir dan notifikasi foto serah terima bunga di WhatsApp,
- **Agar** saya merasa tenang mengetahui hadiah telah diterima dengan baik.
- **Acceptance Criteria:**
  - *Given* status pesanan berubah menjadi `OUT_FOR_DELIVERY`,
  - *When* kurir mengaktifkan tracking,
  - *Then* pemesan menerima pesan WhatsApp dengan link token pelacakan yang menampilkan peta interaktif posisi kurir,
  - *And* ketika pesanan ditandai `DELIVERED`, foto bukti serah terima muncul di dashboard pelacakan.

---

## 6. Kepatuhan Hukum, Privasi & Keamanan
1. **Perlindungan Data Pribadi (UU PDP No. 27/2022):** Enkripsi nomor telepon, alamat rumah, dan nama penerima di database at-rest menggunakan AES-256.
2. **Kepatuhan Transaksi PCI-DSS:** Seluruh data kartu kredit dan transaksi perbankan ditangani langsung oleh Payment Gateway berlisensi Bank Indonesia tanpa menyimpan detail CVV di server aplikasi.
3. **SLA Ketersediaan Layanan (Uptime):** Target availability platform 99.9% dengan arsitektur multi-AZ auto-scaling.
