export interface DocFile {
  id: string;
  filename: string;
  title: string;
  category: 'PRD' | 'Tech Stack' | 'Arsitektur' | 'UI/UX' | 'DevOps Manual';
  badge: string;
  description: string;
  readTime: string;
  sections: Array<{ id: string; title: string }>;
}

export const DOCS_REGISTRY: DocFile[] = [
  {
    id: 'prd',
    filename: 'prd.md',
    title: 'Product Requirement Document (PRD)',
    category: 'PRD',
    badge: 'v1.0.0 · Approved',
    description: 'Visi produk, perumusan masalah kesegaran bunga & kustomisasi, target persona, spesifikasi fitur MVP, dan metrik keberhasilan bisnis.',
    readTime: '6 min read',
    sections: [
      { id: '1-executive-summary', title: '1. Executive Summary & Visi Produk' },
      { id: '2-target-pengguna', title: '2. Target Pengguna & Persona' },
      { id: '3-fitur-utama-mvp', title: '3. Fitur Utama (MVP)' },
      { id: '4-metrik-keberhasilan', title: '4. Metrik Keberhasilan (KPI & Target)' },
      { id: '5-user-stories', title: '5. User Stories & Acceptance Criteria' },
      { id: '6-kepatuhan-hukum', title: '6. Kepatuhan Hukum, Privasi & Keamanan' }
    ]
  },
  {
    id: 'tech_stack',
    filename: 'tech_stack.md',
    title: 'Technology Stack & Rationale',
    category: 'Tech Stack',
    badge: 'Production Grade',
    description: 'Pemilihan Next.js, Go/NestJS microservices, PostgreSQL Aurora & Redis cluster, arsitektur AWS EKS, dan justifikasi performa teknis.',
    readTime: '8 min read',
    sections: [
      { id: '1-ringkasan-eksekutif', title: '1. Ringkasan Eksekutif Arsitektur' },
      { id: '2-matriks-pemilihan', title: '2. Matriks Pemilihan Teknologi Utama' },
      { id: '3-rincian-arsitektur', title: '3. Rincian Komponen & Dual-Engine Strategy' },
      { id: '4-cloud-infrastructure', title: '4. Cloud Infrastructure & Topologi VPC' },
      { id: '5-standar-devops', title: '5. Standar DevOps, Observabilitas & Tooling' }
    ]
  },
  {
    id: 'arsitektur',
    filename: 'arsitektur.md',
    title: 'Arsitektur Sistem & Integrasi',
    category: 'Arsitektur',
    badge: 'Microservices & Event-Driven',
    description: 'Topologi 6 microservices, event broker Kafka/Redis, sequence diagram checkout & pelacakan kurir, serta integrasi Midtrans, Lalamove & WhatsApp.',
    readTime: '9 min read',
    sections: [
      { id: '1-ikhtisar-microservices', title: '1. Ikhtisar Arsitektur Microservices' },
      { id: '2-rincian-layanan', title: '2. Rincian 6 Layanan Mikro' },
      { id: '3-diagram-alur-data', title: '3. Diagram Alur Data & Sequence Diagram' },
      { id: '4-integrasi-pihak-ketiga', title: '4. Rincian Integrasi Pihak Ketiga' },
      { id: '5-keamanan-idempotensi', title: '5. Keamanan Sistem, Idempotensi & Resilience' }
    ]
  },
  {
    id: 'ui_ux',
    filename: 'ui.ux.md',
    title: 'UI/UX Design System & User Journey',
    category: 'UI/UX',
    badge: 'WCAG 2.1 AA Compliant',
    description: 'Estetika boutique atelier, aturan 60-30-10, tipografi Playfair + Plus Jakarta Sans, alur user journey, wireframe komponen, dan aksesibilitas.',
    readTime: '7 min read',
    sections: [
      { id: '1-filosofi-desain', title: '1. Filosofi Desain & Arah Visual' },
      { id: '2-sistem-warna', title: '2. Sistem Warna (Aturan 60-30-10)' },
      { id: '3-tipografi-hirarki', title: '3. Tipografi & Skala Hirarki' },
      { id: '4-alur-pengguna', title: '4. Alur Pengguna (User Journey Mapping)' },
      { id: '5-wireframe-komponen', title: '5. Wireframe & Spesifikasi Komponen UI' },
      { id: '6-standar-aksesibilitas', title: '6. Standar Aksesibilitas (WCAG 2.1 AA)' }
    ]
  },
  {
    id: 'instruction',
    filename: 'instruction.md',
    title: 'DevOps & Engineering Manual',
    category: 'DevOps Manual',
    badge: 'CI/CD Automated',
    description: 'Setup lokal Docker Compose, konfigurasi .env, ESLint & Conventional Commits, GitFlow branching, pengujian multi-tier, dan pipeline GitHub Actions.',
    readTime: '10 min read',
    sections: [
      { id: '1-setup-lingkungan', title: '1. Setup Lingkungan Pengembangan Lokal' },
      { id: '2-standar-koding', title: '2. Standar Koding & Konvensi Rekayasa' },
      { id: '3-strategi-pengujian', title: '3. Strategi Pengujian (Unit, Integrasi, E2E)' },
      { id: '4-pipeline-cicd', title: '4. Pipeline CI/CD & Deployment Guide' }
    ]
  }
];
