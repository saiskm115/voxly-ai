# Voxly AI — Interactive 3D Voice Employee Landing Page

> An interactive, enterprise-grade landing page featuring **Voxly**, a real-time 3D AI voice employee. Built around the **Hero UI** design system as its aesthetic and interactive anchor—uniting living 3D character embodiment, sub-500ms Web Audio synthesis, disciplined typography, and Emil Kowalski craft principles.

![Voxly Preview](/public/images/VoxlyBot_preview.png)

---

## ✨ Features

- **🤖 Interactive 3D Robot Mascot (Voxly)**:
  - 3D skeletal rig with animated morph targets, facial expressions (`HAPPY`, `EXCITED`, `THINKING`, `SURPRISED`, `ANGRY`).
  - Procedural arm gestures: friendly single-hand wave, double-hand wave, and 360° celebratory barrel roll.
  - Interactive palm tracking facing the user directly ($+Z$ normal alignment).
  - Smooth cursor tracking with gentle head/body rotation (up to $\pm 60^\circ$).
- **🗣️ Voice & Audio Synthesis**:
  - Web Speech API integration with voice personality and sound effects.
  - Real-time Web Audio API frequency visualizer and mic analyzer.
  - Interactive "Live Mic Chat" modal for conversational AI demonstration.
- **⚡ Autonomous Sequence & Interactive Dialogue**:
  - Auto-play demonstration loop with dialogue bubble for hands-free showcase.
  - Section-aware observer that resets cleanly when scrolling back to the Hero.
  - Responsive multi-click progression with friendly and humorous reactions.
- **💼 Comprehensive Product Showcase**:
  - **Hero Section**: Live 3D robot, quick action chips, and CTAs.
  - **Interactive Workflow Builder**: Visual node configuration for AI call flows.
  - **Live Call Simulator**: Simulated incoming customer calls with audio wave animation.
  - **Knowledge & Training Center**: Multi-source document and prompt training interface.
  - **Enterprise Platform Grid**: Scalability, sub-500ms latency, CRM integrations.
  - **Live Analytics Dashboard**: Real-time resolution metrics and sentiment graphs.
  - **Transparent Pricing**: Scalable tier comparisons.
  - **Interactive FAQ**: Accordion-based answers to common enterprise questions.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **3D Engine**: Three.js + React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Styling**: Tailwind CSS + Custom Glassmorphism & Animations
- **Icons**: Lucide React
- **Audio**: Web Audio API + SpeechSynthesis API

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saiskm115/voxly-ai.git
   cd voxly-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔌 Backend Integration & Admin Dev Panel

Voxly features an enterprise-grade API gateway and developer infrastructure:

### 1. Unified API Gateway (`/api/*`)
All interactions in the user console connect through typed endpoints with JWT Bearer authentication:
- **Auth & Sessions**: `/api/auth/login`, `/api/auth/signup`, `/api/auth/google`, `/api/auth/github`, `/api/auth/session`, `/api/auth/logout`
- **AI Voice Employees**: `/api/agents` (CRUD, status toggle, clone, acoustic tuning)
- **Telephony & Virtual DIDs**: `/api/telephony/numbers` (buy, assign, SIP routing, release, catalog)
- **Call Logs & Transcripts**: `/api/calls` (list, detail with audio turns, outbound dialer trigger)
- **CRM Leads & Pipeline**: `/api/leads` (qualification, stage updates, direct follow-up)
- **Bulk Outbound Campaigns**: `/api/campaigns` (multi-channel pacing, live progress)
- **Minutes Wallet & Billing**: `/api/billing/wallet`, `/api/billing/topup`
- **System Health & Telemetry**: `/api/admin/metrics`

### 2. Instant Mode Switcher (Mock Simulator vs. Live Backend)
- **Mock Simulator Engine**: Full in-memory/localStorage REST engine allowing complete standalone development.
- **Custom Live Backend**: Configure `VITE_API_URL` or enter your backend URL directly in the Admin Dev Panel (`http://localhost:8000/api`).

### 3. Admin & Developer Panel (`#dashboard/admin-dev` or `Ctrl + Shift + D`)
- **API Endpoint Tester**: Interactive request runner with pre-filled JSON payloads and syntax-highlighted responses.
- **JWT Session Manager**: Live token inspection, claim decoding, custom token injection, and role impersonation.
- **Telephony & LLM Health Diagnostics**: Real-time monitoring for PSTN trunks, STT (Deepgram), TTS (Cartesia), and LLM TTFT.
- **Live Network Audit Stream**: Real-time traffic inspection with request/response payloads and millisecond latency timers.
- **OpenAPI 3.0 Export**: Instant copyable OpenAPI 3.0 JSON specification for backend developers.

---

## 📄 License

MIT License — feel free to use and customize for your own projects!
