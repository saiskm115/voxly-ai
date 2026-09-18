# Voxly AI — Comprehensive Product, Telephony & Engineering Blueprint
## Master Specification: Public Platform, Authenticated Voice OS, Carrier Telephony, DID Marketplace & Payment Systems

> **Target Codebase**: `d:\Antigravity` (`voxly-ai`)  
> **Core Architectural Benchmark**: Emil Kowalski Craft Standards, Hero UI Design Benchmark, Sub-400ms Voice Orchestration, and Carrier-Grade Telephony Reliability (RFC 3261 / RFC 5589).  
> **Status**: Authoritative Master Engineering Blueprint & Product Specification  

---

# PART 1: Public Landing Page & Design System (Completed Reference)

> **CRITICAL DIRECTIVE**: The existing public landing page ([`src/App.jsx`](file:///d:/Antigravity/src/App.jsx), [`src/components/Hero.jsx`](file:///d:/Antigravity/src/components/Hero.jsx), Three.js 3D mascot, and all 15 marketing sections) is **fully completed, hardened, and locked**.  
> **DO NOT** redesign, replace, or break the public landing page. All specifications in Part 2 onward define the **authenticated user console** (`/dashboard` and nested routes) that authenticated users access after signing in.

### Completed 15-Section Marketing Architecture:
1. `Hero` (AI Voice Agent with live 3D robot mascot, gestures, speech synthesis, and dual CTAs `[ Build Your Agent ]` & `[ Talk to AI ]`)
2. `AiEmployeeSection` (What Can Your AI Employee Do? Asymmetric workbench with live execution telemetry)
3. `TalkToAiSection` (Interactive Live Voice Studio with physical audio meters and scenario prompts)
4. `PhoneChannelsSection` (Inbound, Outbound, and Bulk Campaign telephony tabs)
5. `LeadEngineSection` (Autonomous Lead Qualification Engine & real extracted CRM table)
6. `CampaignScaleSection` (Campaign scale monitor & live telemetry dashboard)
7. `TrainingSection` (Proprietary Knowledge Integration RAG architecture schematic)
8. `AiTeamSection` (Specialized Voice Employees with neutral monogram badges and audio previews)
9. `ConversationHistorySection` (Live Transcript Feed with sentiment filters)
10. `AnalyticsSection` (Operational Intelligence clean SVG charts)
11. `IndustriesSection` (High-stakes operational vertical solution cards)
12. `HowItWorksSection` (Production voice roadmap & billing transparency widget)
13. `PricingSection` (Predictable fleet economics & monthly/annual billing switch)
14. `FAQSection` (Monochrome FAQ accordion with structured data)
15. `FinalCTA` (High-contrast enclosure with standardized dual CTAs)
16. `Footer` & `LegalModals` (Validated newsletter form, Privacy Policy, Terms of Service, and Telephony disclosures)

---

# PART 2: Industry-Standard PSTN Telephony & Call Flow Architecture

Voxly AI bridges standard telecommunications carrier networks (PSTN / Cellular / VoIP) with sub-400ms artificial intelligence. All call orchestration adheres to standard telecommunication RFC protocols.

## 2.1 High-Level Telecom Architecture

```
                                  VOXLY TELEPHONY BACKBONE
┌───────────────────────┐         ┌────────────────────────┐         ┌────────────────────────┐
│ Global Telecom        │         │ Session Border         │         │ Streaming Media Engine │
│ Carriers (Tier 1 DIDs)│ ──SIP─► │ Controller (SBC) Clust.│ ──RTP─► │ (Opus / G.711u / PCM)  │
│ Twilio/Telnyx/Bandwdth│ ◄─TLS── │ Kamailio + FreeSWITCH  │ ◄─SRTP─ │ WebRTC Audio Gateway   │
└───────────────────────┘         └────────────────────────┘         └───────────┬────────────┘
                                                                                 │ Dual WebSocket
                                                                                 ▼
                                                                     ┌────────────────────────┐
                                                                     │ Sub-400ms Voice Orchestr│
                                                                     │ Silero VAD (40ms)      │
                                                                     │ Streaming STT (100ms)  │
                                                                     │ LLM Orchestrator (120ms│
                                                                     │ Streaming TTS (110ms)  │
                                                                     └────────────────────────┘
```

## 2.2 Complete Inbound PSTN Call Flow (RFC 3261 SIP Ladder)

```
Caller Phone           Carrier Trunk            Voxly SBC              Media Engine          Voice Agent
     │                      │                       │                       │                     │
     │─── Inbound Call ────►│                       │                       │                     │
     │                      │─── SIP INVITE (SDP) ─►│                       │                     │
     │                      │◄── 100 Trying ────────│                       │                     │
     │                      │                       │── Check DID & KYC ───►│                     │
     │                      │                       │◄─ Active Agent Conf ──│                     │
     │                      │◄── 183 Session Prog ──│                       │                     │
     │                      │    (Early Media)      │                       │                     │
     │                      │◄── 200 OK (SDP) ──────│                       │                     │
     │                      │─── ACK ──────────────►│                       │                     │
     │                      │                       │── Initialize Session ─►                     │
     │                      │                       │                       │── WS Stream Open ──►│
     │                      │                       │                       │   (Bi-dir 16kHz PCM)│
     │◄════ RTP 2-way Audio Stream (G.711u / Opus) ════════════════════════►│                     │
     │                      │                       │                       │── Split Channels ──►│ S3/GCS
     │                      │                       │                       │   Ch 0: Caller      │ Stereo
     │                      │                       │                       │   Ch 1: Agent       │ Rec.
     │                      │                       │                       │                     │
     │ "Hello, I need help" │                       │                       │                     │
     │═════════════════════════════════════════════════════════════════════►│── VAD Silence (40ms)│
     │                      │                       │                       │── Streaming STT ───►│
     │                      │                       │                       │   (Nova-2: 95ms)    │
     │                      │                       │                       │                     │── RAG/LLM (120ms)
     │                      │                       │                       │                     │── TTS (110ms)
     │                      │                       │                       │◄─ Streaming Audio ──│
     │◄════ "Hi there! I can help you with that." ══════════════════════════│   (Chunks: 20ms)    │
     │                      │                       │                       │                     │
```

## 2.3 Sub-400ms Real-Time Latency Budget Breakdown

| Phase | Component & Technology | Target Latency | Strict Ceiling | Optimization Technique |
| :--- | :--- | :--- | :--- | :--- |
| **A. Packet Reception** | Telecom Jitter Buffer + RTP Ingestion | 20ms | 35ms | Adaptive jitter buffer with zero re-encoding |
| **B. Speech Boundary** | Silero VAD (Voice Activity Detection) | 40ms | 60ms | Sliding acoustic energy window (32ms frames) |
| **C. Speech-to-Text** | Deepgram Nova-2 / Whisper v3 Turbo | 95ms | 130ms | Streaming interim tokens via persistent WebSockets |
| **D. Decision & LLM** | Groq Llama 3.3 70B / Claude 3.5 Haiku | 120ms | 160ms | Speculative decoding, first-token streaming |
| **E. Text-to-Speech** | Cartesia Sonic / ElevenLabs Turbo 2.5 | 95ms | 120ms | Chunk-based streaming (starts audio at 1st token) |
| **F. RTP Packetizing**| G.711u / Opus SIP Packetizer | 15ms | 25ms | Direct payload insertion to carrier RTP bridge |
| **TOTAL BUDGET** | **End-to-End Perceived Acoustic Turn** | **385ms** | **530ms** | **Sub-500ms guaranteed human conversational benchmark** |

## 2.4 Outbound Predictive Dialer, STIR/SHAKEN & Answering Machine Detection (AMD)

```
                            OUTBOUND CAMPAIGN DIALER
                                       │
                        ┌──────────────┴──────────────┐
                        ▼                             ▼
              [ TCPA Window Check ]        [ National DNC Registry ]
              (08:00 - 21:00 Local)        (Suppression list check)
                        │                             │
                        └──────────────┬──────────────┘
                                       │
                                       ▼
                       [ STIR/SHAKEN A-Level Signing ]
                       (Cryptographic Identity Token)
                                       │
                                       ▼
                       [ High-Concurrency SIP INVITE ]
                                       │
                                       ▼
                     [ Answering Machine Detection (AMD) ]
                     - Acoustic energy duration analysis (<1.2s)
                     - Spectral flux pattern matching
                                       │
                     ┌─────────────────┴─────────────────┐
                     ▼                                   ▼
             [ Human Answered ]                 [ Machine Detected ]
             - Greeting: "Hello?" (<1.5s)       - Greeting: >2.8s ("Please leave...")
             - Silence pause detected           - Beep frequency detected (1000Hz)
                     │                                   │
                     ▼                                   ├─► Option A: Hangup immediately (0 min)
         [ Instant Agent Speech ]                        └─► Option B: Drop Voicemail Audio
         Inject speech within <150ms
```

## 2.5 Attended (Warm) & Blind (Cold) Transfer Flows (RFC 5589 SIP REFER)

### Blind (Cold) Transfer:
1. Agent triggers `transfer_call(target_phone_number)`.
2. Voxly SBC sends a `SIP REFER` request to the upstream carrier.
3. Carrier accepts with `202 Accepted` and sends `NOTIFY` events.
4. Call leg is handed off cleanly to the destination; Voxly session terminates immediately.

### Attended (Warm) Transfer with Whisper Briefing:
1. **Hold Leg**: Inbound caller is placed on high-fidelity hold with branded waiting audio.
2. **Consultation Leg**: Voxly SBC originates a new outbound SIP call to the human specialist.
3. **Acoustic Whisper**: Before bridging the caller, the AI synthesizes a confidential 6-second summary heard only by the specialist:
   > *"Incoming warm transfer from Sarah Connor regarding Enterprise SLA pricing. Budget verified at $40,000/yr."*
4. **Specialist Action**:
   - Press `1` or speak "Accept": Carrier bridges caller and specialist into a 2-party conference. AI drops off.
   - Press `2` or No Answer (20s timeout): Specialist leg is released; AI returns to customer: *"Our senior engineer is currently tied up, but I have sent a calendar invite for 2 PM."*

## 2.6 Dual-Channel Stereo Recording, PII/PCI-DSS Redaction & HIPAA Compliance
- **Stereo Separation**: Caller audio is captured on Channel 0 (Left); AI audio on Channel 1 (Right). This enables 100% accurate acoustic sentiment analysis and isolated transcript reconstruction.
- **PCI-DSS Card Masking**: When the agent enters a payment collection state, audio recording is paused or dtmf tones are masked with white noise.
- **Automated PII Redaction**: Real-time transcript engine strips credit card numbers, SSNs, and dates of birth before committing to the database.
- **Storage**: Audio is encrypted with AES-256-GCM and stored in HIPAA-compliant isolated buckets with configurable retention (30, 60, 90 days, or permanent).

---

# PART 3: Virtual Number Buying (DID Marketplace), LNP Porting & Elastic SIP Trunking

## 3.1 Global DID Procurement Engine & Number Classifications

Voxly provides direct, self-service provisioning of virtual numbers across 100+ countries:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ DID CLASSIFICATION MATRIX                                                              │
├───────────────┬────────────────────┬─────────────────┬───────────────────┬─────────────┤
│ Number Type   │ Geographic Reach   │ Monthly Fee     │ Inbound Surcharge │ SMS Enabled │
├───────────────┼────────────────────┼─────────────────┼───────────────────┼─────────────┤
│ Local DID     │ Specific Area Code │ $1.50 – $2.50   │ $0.0085 / min     │ Yes (US/CA) │
│ Toll-Free     │ Nationwide         │ $3.50 – $5.00   │ $0.0180 / min     │ Yes (US/CA) │
│ Mobile DID    │ National Mobile    │ $2.50 – $4.00   │ $0.0120 / min     │ Yes         │
│ National      │ Non-geographic     │ $3.00 – $4.50   │ $0.0110 / min     │ Voice Only  │
│ Vanity Block  │ Custom Spelling    │ $15.00 setup    │ Standard          │ Yes         │
└───────────────┴────────────────────┴─────────────────┴───────────────────┴─────────────┘
```

## 3.2 Country-Specific KYC & Regulatory Compliance Matrix

To adhere to international telecommunications laws, purchasing phone numbers requires compliance verification:

- **United States & Canada**:
  - **A2P 10DLC Registration**: Brand registration (EIN, Legal Business Name) and Campaign use-case declaration for SMS-enabled numbers.
  - **E911 Address**: Physical emergency dispatch address registration for every two-way voice number.
- **Germany (Bundesnetzagentur - BNetzA)**:
  - Local address proof in the corresponding city/area code required within 14 days.
- **France (ARCEP)**:
  - Corporate registration certificate (Kbis) + Proof of local presence for geographic (01-05) prefixes.
- **United Kingdom (Ofcom)**:
  - Proof of physical address for local geographic numbers (01/02 prefixes).
- **India (DoT / TRAI)**:
  - Corporate KYC, Certificate of Incorporation, authorized signatory passport/Aadhaar, and TRAI Distributed Ledger Technology (DLT) registration.
- **Australia (ACMA)**:
  - Proof of identity and address for geographic (02, 03, 07, 08) numbers.

## 3.3 Dynamic Local Presence Engine
For outbound sales campaigns, the dialer dynamically selects a DID matching the recipient's area code from the workspace's pool of numbers:
- Recipient in Chicago (`312`) -> Caller ID displays `+1 (312) 847-XXXX`.
- Increases call pickup rates from standard 11% to over 34%.

## 3.4 Local Number Portability (LNP) Self-Service Workflow

A 5-step self-service wizard to migrate existing business lines to Voxly:
1. **Eligibility Check**: Enter E.164 numbers; automated system queries Neustar/NPAC to identify current losing carrier (OCN).
2. **Account Verification**: Enter losing carrier account number and porting PIN.
3. **LOA Generation**: System generates standardized Letter of Authorization (LOA); operator signs digitally in-browser.
4. **Statement Upload**: Upload recent telephone bill (dated within last 30 days) displaying billing name and address.
5. **FOC Tracking**: Visual milestone tracker:
   - `Submitted` -> `Carrier Review` -> `FOC Date Confirmed` -> `Cutover Complete`.
   - Automated failover call forwarding maintains zero downtime during port execution.

## 3.5 Bring-Your-Own-Carrier (BYOC) & Elastic SIP Trunks

For enterprise clients with existing master service agreements (Twilio, Telnyx, Bandwidth, Cisco, Avaya):
- **Inbound SIP URI**: `sip:agent-uuid@inbound.voxly.ai:5060;transport=tls`
- **Outbound Termination**: IP Access Control Lists (ACLs) or SIP Digest Authentication (Username + Password).
- **Codecs Supported**: Opus (48kHz), G.711u (PCMU), G.711a (PCMA), G.722, AMR-WB.
- **Security**: Mandatory TLS 1.3 signaling and SRTP (AES-128-CM-HMAC-SHA1) media encryption.

---

# PART 4: Payment Systems, Prepaid Wallet & Micro-Metering Architecture

Phone calls cannot fail mid-sentence due to a synchronous credit card decline. Voxly operates on an **Enterprise Prepaid Fleet Wallet with Automated Micro-Replenishment**.

## 4.1 Prepaid Wallet Ledger & Cost Composition

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ REAL-TIME USAGE & MICRO-BILLING FORMULA                                                │
│                                                                                        │
│ Total Call Cost = Telecom Leg + Voice Engine (STT + LLM + TTS) + Add-ons              │
│                                                                                        │
│ • Telecom Leg:                                                                         │
│   Inbound:  $0.0085 / 60s  = $0.00014167 per second                                   │
│   Outbound: $0.0120 / 60s  = $0.00020000 per second                                   │
│                                                                                        │
│ • Voice Engine Compute:                                                                │
│   Standard Model (Llama 3.3 + Deepgram Nova-2 + Cartesia Sonic):  $0.05 / min         │
│   Premium Model  (Claude 3.5 Haiku + Whisper + ElevenLabs Turbo): $0.08 / min         │
│                                                                                        │
│ • Exact 1/1 Second Metering:                                                           │
│   A 47-second connected call is billed for exactly 47 seconds. Zero minute-rounding.   │
│   Zero charges for unanswered rings, busy signals, or failed connections.              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

## 4.2 Automated Replenishment State Machine

```
                        [ NORMAL OPERATION ]
                        Wallet Balance > $25.00
                                  │
                                  ▼ (Balance drops below threshold, e.g. $25.00)
                     [ AUTO-RECHARGE TRIGGERED ]
                     Calls Stripe / Razorpay API: Charge $100.00
                                  │
                  ┌───────────────┴───────────────┐
                  ▼ (Success)                     ▼ (Card Declined)
       [ BALANCE REPLENISHED ]           [ SOFT DECLINE GRACE STATE ]
       - Credits updated instantly       - 15-minute emergency overdraft buffer
       - Receipt emailed to billing      - Urgent SMS & Dashboard Banner
       - Return to Normal                - In-progress calls ARE NOT dropped
                                                  │
                                                  ▼ (After 15 min or max $20 overdraft)
                                         [ HARD CAP / SUSPENDED ]
                                         - New outbound calls blocked
                                         - Inbound calls routed to voicemail
```

## 4.3 Payment Methods & Global Gateway Matrix
- **Credit / Debit Cards**: Visa, MasterCard, American Express via Stripe Elements (PCI-DSS Level 1).
- **Mobile Wallets**: Apple Pay and Google Pay via one-touch biometric authorization.
- **ACH Direct Debit (US)**: Stripe Financial Connections for bank debit (0.8% fee capped at $5.00). Ideal for $1,000+ wallet top-ups.
- **SEPA Direct Debit (EU)**: Eurozone bank account payments with automated SEPA mandate generation.
- **UPI / Netbanking / RuPay (India)**: Native Razorpay gateway integration for Indian enterprises with instant INR to USD settlement.
- **Enterprise Invoicing (Net-30 / Net-60)**: Wire transfer / ACH invoicing for fleets spending >$2,500/month.

## 4.4 Global Tax & Compliance Engine
- **US Telecommunications Taxes**: Calculates Federal Universal Service Fund (USF), State PUC fees, and local 911 surcharges based on the physical billing address.
- **EU VAT**: Automated VIES database verification for B2B VAT Reverse Charge.
- **Indian GST**: Automated SAC code `9984` (Telecommunications Services) tax invoicing with 18% GST and GSTIN validation.

## 4.5 Call Detail Records (CDR) Ledger Schema
Every phone interaction writes an immutable CDR record:
```json
{
  "call_uuid": "c98b1a72-4d10-482a-9e12-88f912c918a0",
  "workspace_id": "ws_acme_prod",
  "agent_id": "agent_sarah_sdr",
  "direction": "inbound",
  "from_number": "+14159821049",
  "to_number": "+18005550199",
  "sip_call_id": "a984b2@sbc.voxly.ai",
  "start_time": "2026-09-18T10:14:02.108Z",
  "connect_time": "2026-09-18T10:14:05.412Z",
  "end_time": "2026-09-18T10:16:32.812Z",
  "duration_seconds": 147,
  "billing_seconds": 147,
  "telecom_cost_usd": 0.0208,
  "ai_compute_cost_usd": 0.1225,
  "total_cost_usd": 0.1433,
  "disposition": "human_completed",
  "recording_url": "s3://voxly-recordings/ws_acme/c98b1a72.wav",
  "sentiment": "positive",
  "lead_qualified": true
}
```

---

# PART 5: Individual AI Employee Creation & Multi-Step Scalable Wizard

Scaling from a solo operator creating their first inbound receptionist to an enterprise provisioning 5,000 distributed outbound SDRs requires a standardized, frictionless 8-step wizard.

```
   ① IDENTITY ──► ② VOICE ──► ③ BRAIN ──► ④ KNOWLEDGE ──► ⑤ TOOLS ──► ⑥ PHONE ──► ⑦ TEST ──► ⑧ DEPLOY
```

## 5.1 Deep Configuration Options Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STEP 1: IDENTITY & ROLE SPECIFICATION                                                  │
├───────────────────┬──────────────┬───────────────┬─────────────────────────────────────┤
│ Field Name        │ Type         │ Default       │ Description & Operational Impact    │
├───────────────────┼──────────────┼───────────────┼─────────────────────────────────────┤
│ `name`            │ String       │ "Sarah"       │ Internal & spoken agent persona     │
│ `role`            │ Dropdown     │ "Inbound SDR" │ Role category (Support, Sales, etc.)│
│ `avatar_type`     │ Radio        │ "3d_robot"    │ 3D Mascot / Headshot / Monogram     │
│ `primary_goal`    │ Textarea     │ "Qualify..."  │ Single-sentence core mandate        │
│ `concurrency_max` │ Number (1-5k)│ 10            │ Max simultaneous PSTN channels      │
└───────────────────┴──────────────┴───────────────┴─────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STEP 2: ACOUSTIC ENGINE & VOICE TUNING                                                 │
├───────────────────┬──────────────┬───────────────┬─────────────────────────────────────┤
│ Field Name        │ Type         │ Default       │ Description & Operational Impact    │
├───────────────────┼──────────────┼───────────────┼─────────────────────────────────────┤
│ `tts_provider`    │ Select       │ "cartesia"    │ Cartesia Sonic, ElevenLabs, Deepgram│
│ `voice_id`        │ Voice Picker │ "sonic-en-01" │ Acoustic voice identifier           │
│ `language`        │ Select       │ "en-US"       │ Supported: en-US, en-IN, te-IN, etc.│
│ `speaking_speed`  │ Slider       │ 1.05x         │ Range: 0.80x to 1.35x (0.01 step)   │
│ `pitch_shift`     │ Slider       │ 0.00 st       │ Semitone pitch modulation (-6 to +6)│
│ `barge_in_ms`     │ Slider       │ 220ms         │ Interruption sensitivity (100-500ms)│
│ `turn_timeout_ms` │ Slider       │ 650ms         │ Silence pause before AI speaks      │
│ `pronunciation`   │ Key-Value    │ {}            │ Custom phonetic acronym overrides   │
└───────────────────┴──────────────┴───────────────┴─────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STEP 3: BRAIN, REASONING & GUARDRAILS                                                  │
├───────────────────┬──────────────┬───────────────┬─────────────────────────────────────┤
│ Field Name        │ Type         │ Default       │ Description & Operational Impact    │
├───────────────────┼──────────────┼───────────────┼─────────────────────────────────────┤
│ `llm_model`       │ Select       │ "llama-3.3-70b│ Groq Llama 3.3, Claude 3.5 Haiku    │
│ `system_prompt`   │ Code Editor  │ Template      │ Primary system instructions         │
│ `temperature`     │ Slider       │ 0.3           │ Range: 0.0 to 1.0 (Low = factual)   │
│ `dynamic_vars`    │ Token list   │ [caller_name] │ Variables injected from CRM / SIP   │
│ `hallucination_bar│ Toggle       │ Enabled       │ Enforce strict "I don't know" rule  │
│ `profanity_filter`│ Toggle       │ Enabled       │ Automatic de-escalation filter      │
└───────────────────┴──────────────┴───────────────┴─────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STEP 4: KNOWLEDGE BASE & RAG INGESTION                                                 │
├───────────────────┬──────────────┬───────────────┬─────────────────────────────────────┤
│ Field Name        │ Type         │ Default       │ Description & Operational Impact    │
├───────────────────┼──────────────┼───────────────┼─────────────────────────────────────┤
│ `kb_collections`  │ Multi-Select │ []            │ Linked knowledge vector collections │
│ `rag_top_k`       │ Number       │ 3             │ Max semantic chunks retrieved       │
│ `confidence_score`│ Slider       │ 0.75          │ Minimum cosine similarity threshold │
│ `test_query`      │ Input + Run  │ ""            │ Real-time RAG chunk citation tester │
└───────────────────┴──────────────┴───────────────┴─────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STEP 5: TOOLS & FUNCTION CALLING                                                       │
├───────────────────┬──────────────┬───────────────┬─────────────────────────────────────┤
│ Field Name        │ Type         │ Default       │ Description & Operational Impact    │
├───────────────────┼──────────────┼───────────────┼─────────────────────────────────────┤
│ `calendar_sync`   │ Toggle       │ Disabled      │ Cal.com / Google Calendar live slot │
│ `crm_sync`        │ Toggle       │ Disabled      │ Salesforce / HubSpot lead push      │
│ `sms_confirmation`│ Toggle       │ Disabled      │ Send Twilio/Telnyx SMS during call  │
│ `custom_webhooks` │ Tool List    │ []            │ User-defined REST API tools         │
└───────────────────┴──────────────┴───────────────┴─────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STEP 6: PHONE ASSIGNMENT & ROUTING                                                     │
├───────────────────┬──────────────┬───────────────┬─────────────────────────────────────┤
│ Field Name        │ Type         │ Default       │ Description & Operational Impact    │
├───────────────────┼──────────────┼───────────────┼─────────────────────────────────────┤
│ `assigned_did`    │ DID Selector │ None          │ Choose from pool or buy new number  │
│ `business_hours`  │ Time Range   │ "24/7"        │ Active window for inbound routing   │
│ `voicemail_action`│ Select       │ "record_vm"   │ Record audio, transcribe, or SMS    │
│ `human_transfer`  │ Phone/SIP    │ None          │ Warm escalation destination number  │
└───────────────────┴──────────────┴───────────────┴─────────────────────────────────────┘
```

---

# PART 6: Comprehensive 13-Module Console UI & Layout Specification

All modules strictly follow the Emil Kowalski craft guidelines: hairline borders, neutral surfaces, tactile micro-feedback, and high-density typography.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ AUTHENTICATED VOICE OS CONSOLE — 13 CORE SECTIONS                                      │
├────┬─────────────────────────────┬─────────────────────────────────────────────────────┤
│ 01 │ Overview Dashboard          │ KPI cards, live telemetry, activity chart, calls    │
│ 02 │ AI Employees Roster         │ Employee grid/list, status toggles, quick-talk      │
│ 03 │ Agent Studio Workspace      │ 8-tab deep-dive per agent (Brain, Voice, Telemetry) │
│ 04 │ Real-Time Voice Sandbox     │ 3D reactive mascot, waveform, STT/TTS latency meter │
│ 05 │ Calls & Audio Player        │ Dual-channel audio, synced transcript, CRM actions  │
│ 06 │ Leads & Opportunities       │ BANT score table, transcript summary, CRM sync      │
│ 07 │ Outbound Campaigns          │ CSV mapper, AMD classifier, calling hours, dialer   │
│ 08 │ Phone Numbers & DID Market  │ Buy numbers, E911, LNP porting, Elastic SIP trunks  │
│ 09 │ Brain & Training Hub        │ System prompt editor, token budget, RAG retriever   │
│ 10 │ Knowledge Base Repository   │ Documents, web crawl, chunk inspector, health score │
│ 11 │ Custom Tools & Webhooks     │ API schemas, parameter builder, live tester         │
│ 12 │ Billing, Wallet & Usage     │ Prepaid wallet, auto-recharge, CDR micro-billing    │
│ 13 │ Workspace Settings & Profile│ Team roles, STIR/SHAKEN, TCPA compliance, API keys  │
└────┴─────────────────────────────┴─────────────────────────────────────────────────────┘
```

## 6.1 Application Shell Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ APP SHELL WIREFRAME                                                                    │
├──────────────────────────┬─────────────────────────────────────────────────────────────┤
│ [Logo] Acme Corp ▼       │ [Search ⌘K]  [● Carrier: 99.98%]  [$248.50]  [Talk AI] [User] │
├──────────────────────────┼─────────────────────────────────────────────────────────────┤
│ OVERVIEW                 │                                                             │
│ • Dashboard              │                                                             │
│                          │                                                             │
│ AI WORKFORCE             │                     MAIN VIEWPORT                           │
│ • AI Employees           │               (Dynamic Module Rendering)                    │
│ • Knowledge Base         │                                                             │
│ • Training & Brain       │                                                             │
│                          │                                                             │
│ COMMUNICATIONS           │                                                             │
│ • Calls & Transcripts    │                                                             │
│ • Outbound Campaigns     │                                                             │
│ • Phone Numbers (DID)    │                                                             │
│                          │                                                             │
│ REVENUE & OPS            │                                                             │
│ • Leads & CRM            │                                                             │
│ • Analytics              │                                                             │
│                          │                                                             │
│ SETTINGS                 │                                                             │
│ • Custom Tools           │                                                             │
│ • Billing & Wallet       │                                                             │
│ • Workspace Settings     │                                                             │
├──────────────────────────┤                                                             │
│ Balance: $248.50 (2,485m)│                                                             │
│ [+ Add Funds] [Pro Plan] │                                                             │
└──────────────────────────┴─────────────────────────────────────────────────────────────┘
```

### Topbar Elements:
- **Workspace Switcher**: Monogram icon + Organization name with fast dropdown for multi-client agency switching.
- **Global Search (`⌘K`)**: Modal search index covering agents, phone numbers, leads, call records, and documentation.
- **PSTN Telephony Status**: `● 99.98% Operational` pill with green indicator dot. Hover reveals latency metrics.
- **Prepaid Balance Pill**: Displays live remaining balance `$248.50 (~2,485 min)`. Clicking opens instant recharge drawer.
- **"Talk to AI" Quick Launcher**: Primary branded button `[ ⚡ Talk to AI ]` opening the browser voice sandbox from anywhere.
- **Profile / Avatar**: User monogram with dropdown: My Profile, API Keys, Documentation, Log Out.

---

## 6.2 Module 01: Overview Dashboard

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ OVERVIEW DASHBOARD WIREFRAME                                                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ "Good morning, Alex. Your AI fleet is operating across 4 active phone numbers."        │
│                                                   [ + Create AI Employee ]  [ Export ] │
├───────────────────┬───────────────────┬───────────────────┬────────────────────────────┤
│ TOTAL CALLS       │ VOICE MINUTES     │ QUALIFIED LEADS   │ FIRST-CALL RESOLUTION      │
│ 14,842            │ 28,490 min        │ 2,418             │ 84.2%                      │
│ ▲ +18.4% vs last  │ ▲ +12.1% vs last  │ ▲ +24.6% conv     │ ▲ +3.1%                    │
├───────────────────┴───────────────────┴───────────────────┴────────────────────────────┤
│ CALL TRAFFIC & CONCURRENCY (LAST 7 DAYS)                         [ Today | 7D | 30D ]  │
│ ┌────────────────────────────────────────────────────────────────────────────────────┐ │
│ │  [ Clean SVG Area / Bar Chart showing Inbound vs Outbound volume per hour/day ]    │ │
│ └────────────────────────────────────────────────────────────────────────────────────┘ │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│ ACTIVE AI EMPLOYEES                       │ RECENT LIVE CALLS STREAM                   │
│ ┌───────────────────────────────────────┐ │ ┌────────────────────────────────────────┐ │
│ │ [●] Sarah - SDR    | +1 (415) 890-2341│ │ │ +1 (212) 489-0128  | Sarah SDR | 2m 14s│ │
│ │ 1,248 calls today  | [ Talk ] [Studio]│ │ │ +1 (512) 782-9901  | Maya Care | 4m 02s│ │
│ ├───────────────────────────────────────┤ │ │ +1 (650) 332-1184  | David Out | 1m 20s│ │
│ │ [●] Maya - Support | +1 (800) 555-0199│ │ │ +1 (415) 902-8822  | Sarah SDR | 3m 45s│ │
│ │ 840 calls today    | [ Talk ] [Studio]│ │ │ [ View All 14,842 Calls in Log → ]     │ │
│ └───────────────────────────────────────┘ │ └────────────────────────────────────────┘ │
└───────────────────────────────────────────┴────────────────────────────────────────────┘
```

---

## 6.3 Module 02: AI Employees Roster

- **Filter Tabs**: `All (6)`, `Active (4)`, `Training (1)`, `Paused (1)`.
- **Search Bar**: Instant filter by employee name, assigned DID, or target role.
- **Card Layout**:
  - Employee Avatar (3D robot mascot variant or monogram).
  - Status Indicator: Green (Live on PSTN), Amber (Draft / Training), Grey (Paused).
  - Primary Details: Name, Role Badge (`SDR`, `Support`, `Reception`), Acoustic Voice Engine (`Cartesia • Indian English`).
  - Operational Stats: Calls handled, Average talk time, BANT qualification rate.
  - Assigned Phone DID: Clickable pill copying number to clipboard.
  - Action Row: `[ ⚡ Talk ]` (Opens sandbox), `[ Configure Studio ]`, `[ ... More ]` (`Duplicate`, `Pause`, `Delete`).

---

## 6.4 Module 03: Agent Studio (Dedicated Workspace)

Clicking an AI employee opens their dedicated 8-tab studio:
1. **Overview**: Individual performance charts, call volume trends, sentiment breakdown.
2. **Brain**: System prompt editor with token budget gauge, temperature slider, and variable list.
3. **Voice & Acoustics**: TTS provider dropdown, voice picker with audio preview player, speed slider (0.8x-1.35x), barge-in sensitivity slider (100-500ms).
4. **Knowledge**: Linked vector document collections with individual health scores.
5. **Tools**: Toggles for Calendar Booking, CRM Sync, and custom REST API webhooks.
6. **Phone & Routing**: Inbound DID assignment, after-hours fallback, and warm transfer number.
7. **Sandbox**: Direct embedded browser voice conversation with real-time debug telemetry.
8. **Audit Log**: Chronological version history of prompt edits, voice changes, and tool updates.

---

## 6.5 Module 04: Real-Time Voice Sandbox ("Talk to AI")

The benchmark testing workbench for voice architects:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ REAL-TIME VOICE SANDBOX WIREFRAME                                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Active Agent: Sarah Miller (SDR)               Scenario: "Pricing & Enterprise SLA"    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│                                    [ 3D MASCOT ]                                       │
│                               (Articulated Mouth & Ears)                               │
│                                                                                        │
│                          ─── ── ─── ───── ─── ── ───                                  │
│                          Acoustic Amplitude Audio Meter                                │
│                                                                                        │
│                      [ ● Connected | Latency: 340ms ]                                  │
│                                                                                        │
│             [ 🎤 Mute Mic ]     [ ⏹ End Call ]     [ 🔄 Reset Dialogue ]               │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ LATENCY TELEMETRY STRIP                                                                │
│ STT: 85ms (Deepgram Nova-2) │ LLM TTFT: 140ms (Groq 70B) │ TTS: 95ms (Cartesia) │ Total: 320ms │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ SYNCHRONIZED STREAMING TRANSCRIPT                                                      │
│ [10:14:02] You: "Hi, do you offer custom enterprise invoicing?"                        │
│ [10:14:03] Sarah: "Yes, we support Net-30 and Net-60 wire invoicing for enterprise     │
│                   fleets spending over $2,500 monthly. Would you like me to send..."   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6.6 Module 05: Calls Log & Dual-Channel Audio Player Drawer

- **Filterable Table**: `All Calls`, `Inbound`, `Outbound`, `Missed / Busy`.
- **Table Columns**: Caller ID, Direction, Agent, Duration, Sentiment Tag (`Positive`, `Neutral`, `Escalated`), Outcome (`Qualified Lead`, `Demo Booked`), Timestamp.
- **Call Detail Drawer** (Slides out smoothly upon row click):
  - **Dual-Channel Audio Player**:
    - Stereo Waveform Scrubber: Top wave represents Caller (Left channel), bottom wave represents Agent (Right channel).
    - Play/Pause, 10s skip forward/back, Playback speed (`1x`, `1.25x`, `1.5x`, `2x`).
  - **Synchronized Transcript**: Clicking any transcript turn jumps audio playback to that exact second.
  - **Executive Summary Card**: Auto-generated 3-bullet AI briefing.
  - **Extracted BANT Matrix**: Budget, Authority, Need, and Timeline pills.
  - **Raw CDR Telemetry**: Exact duration, telecom cost, AI engine cost, latency logs.

---

## 6.7 Module 06: Autonomous Leads & Opportunities Engine

- **CRM Table View**:
  - Columns: Prospect Name, Company Name, Phone, Email, Assigned AI Employee, BANT Score (`88/100`), Stage (`New`, `Qualified`, `Demo Booked`, `Nurture`), Created Date.
- **Lead Detail Modal / Drawer**:
  - Direct call recording playback embedded.
  - Extracted fields: Company size, Current telephony stack, Target launch date, Key objections.
  - Quick Actions: `[ 📞 Call Now with AI ]`, `[ Push to Salesforce / HubSpot ]`, `[ Mark as Closed Won ]`.

---

## 6.8 Module 07: Outbound Campaigns & Mass Dialing Engine

- **Campaign Monitor**:
  - Progress bar (`2,180 / 2,500 contacts reached`), Connected rate (`48.2%`), Conversion rate (`18.4%`), Spend (`$142.80`).
- **Campaign Creation Flow (Modal / Stepper)**:
  1. Campaign Title & Objectives.
  2. Agent Selection: Assign single agent or load-balanced agent pool.
  3. Contact List Upload: CSV/Excel drag-and-drop.
  4. Column Mapper: Map CSV headers to agent variables (`First Name` -> `{{caller_name}}`, `Balance` -> `{{balance}}`).
  5. Local Presence Caller ID Pool: Select area code strategy.
  6. Permitted Calling Windows: Enforce local recipient time constraints (e.g. 09:00 - 17:00).
  7. Concurrency Throttle: Set max simultaneous lines (10 to 500 channels).
  8. Answering Machine Detection (AMD) sensitivity setting.
  9. Pre-Flight Test & Launch.

---

## 6.9 Module 08: Phone Numbers, DID Marketplace & Porting Console

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PHONE NUMBERS & DID MARKETPLACE WIREFRAME                                              │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [ Active Numbers (4) ]   [ DID Marketplace ]   [ LNP Porting (1) ]   [ Elastic SIP ]   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ACTIVE NUMBERS TABLE                                              [ + Buy Number ]     │
│ Phone Number       Country/Area          Type        Assigned Agent     Status  Monthly│
│ +1 (415) 890-2341  🇺🇸 San Francisco, CA  Local       Sarah - SDR        Active  $2.00  │
│ +1 (800) 555-0199  🇺🇸 Toll-Free US       Toll-Free   Maya - Support     Active  $4.50  │
│ +44 20 7946 0991   🇬🇧 London, UK         National    Oliver - UK Sales  Active  $3.00  │
│ +91 80 4012 8821   🇮🇳 Bangalore, KA      Local       Kavya - Admissions Active  $2.50  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ DID MARKETPLACE MODAL (Opens on "+ Buy Number")                                        │
│ Country: [ United States 🇺🇸 ▼ ]    Number Type: (●) Local  ( ) Toll-Free  ( ) Mobile   │
│ Search by Area Code or City: [ 415            ]                                        │
│                                                                                        │
│ AVAILABLE INVENTORY:                                                                   │
│ • +1 (415) 230-9182  San Francisco, CA   Voice + SMS   $2.00/mo  [ Buy with Wallet ]   │
│ • +1 (415) 230-9183  San Francisco, CA   Voice + SMS   $2.00/mo  [ Buy with Wallet ]   │
│ • +1 (415) 340-8812  San Francisco, CA   Voice + SMS   $2.00/mo  [ Buy with Wallet ]   │
│                                                                                        │
│ E911 Emergency Address Registration: [ 100 Montgomery St, Suite 400, San Francisco ]   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6.10 Module 09: Brain & Prompt Engineering Hub
- Global prompt repository with version history.
- Context window visualizer: Displays token consumption breakdown (System Prompt, RAG context, Tools schema, Dialogue history).
- Hallucination prevention rule toggles:
  - Enforce strict negative constraints ("Never quote pricing above $50k without manager approval").
  - Automated citation requirement.

---

## 6.11 Module 10: Knowledge Base & Vector Document Repository
- Document collections: Product Specs, Help Center Docs, Policy Manuals, Pricing Sheets.
- File Ingestion: PDF, DOCX, Markdown, CSV, and Live Website Sitemap Crawling.
- Chunk Inspector: View exact text chunks, token lengths, and vector embeddings.
- "Test Query" Workbench: Enter a prospective customer question and view the top-3 retrieved chunks with cosine similarity confidence scores.

---

## 6.12 Module 11: Custom Tools & Webhook Function Calling Builder
- Visual tool builder allowing agents to call external REST APIs mid-conversation:
  - Tool Name: e.g. `check_inventory_level`.
  - Trigger Description: "Execute when the caller asks if a product is in stock."
  - HTTP Method: `GET` / `POST` / `PUT`.
  - Endpoint URL: `https://api.acme.com/v1/warehouse/check`.
  - Authentication: Bearer Token, API Key, Basic Auth.
  - JSON Parameters Schema Builder: Define field names, data types (`string`, `number`, `boolean`), and required flags.
  - Live Testing Console: Enter sample JSON parameters, click `[ Send Test Request ]`, and inspect raw response.

---

## 6.13 Module 12: Billing, Wallet & Usage Analytics

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ PREPAID FLEET WALLET & BILLING CONSOLE WIREFRAME                                       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CURRENT PREPAID BALANCE             AUTO-REPLENISHMENT STATUS                          │
│ $248.50                             Active: +$100.00 when balance falls below $25.00   │
│ ~2,485 remaining voice minutes      Card: Visa ending in 4242                          │
│ [ + Add Funds to Wallet ]           [ Configure Auto-Recharge Rules ]                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ MONTHLY SPEND BREAKDOWN                                                                │
│ Total Spend: $842.20                                                                   │
│ • Voice AI Compute (STT/LLM/TTS):  $580.40  (68.9%)                                    │
│ • PSTN Telecom Carrier Minutes:    $212.80  (25.3%)                                    │
│ • Phone Number DID Subscriptions:  $24.00   (2.8%)                                     │
│ • Regulatory & Telecom Taxes:      $25.00   (3.0%)                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TRANSACTION HISTORY & CDR EXPORT                                  [ Download CDR CSV ] │
│ Date         Description                         Type        Amount    Balance Receipt │
│ 2026-09-18   Auto-Recharge (Visa •••• 4242)      Credit     +$100.00   $248.50 [PDF]   │
│ 2026-09-17   Outbound Campaign "Q3 Outreach"     Usage       -$48.20   $148.50 [CDR]   │
│ 2026-09-01   DID Monthly Renewal (4 Numbers)     DID Rent     -$11.50  $196.70 [PDF]   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6.14 Module 13: Workspace Settings, Team Roles & Compliance
- **Team & Permissions**: Invite team members with granular roles (`Owner`, `Admin`, `Agent Architect`, `Billing Manager`, `Read-Only Analyst`).
- **Telephony & TCPA Compliance**:
  - Mandatory Call Recording Disclosure: Enable automated audio chime or verbal statement ("This call is recorded for quality assurance").
  - Do-Not-Call (DNC) Suppression List Management: Upload CSV of numbers to permanently block.
  - STIR/SHAKEN Identity Certificate verification status.
- **Developer API Keys & Webhooks**:
  - Production Keys (`vox_live_...`) and Sandbox Keys (`vox_test_...`).
  - Webhook Endpoint URL with event subscriptions (`call.started`, `call.ended`, `lead.qualified`, `recording.ready`).

---

# PART 7: Emil Kowalski UI Design System, Tokens & Component Specifications

The authenticated console must maintain the exact design discipline codified in Part 1. It must **never** degrade into a generic template.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ EMIL KOWALSKI DESIGN PRINCIPLES FOR THE CONSOLE                                        │
├────────────────────────────┬───────────────────────────────────────────────────────────┤
│ 1. Surface Hierarchy       │ Clean, solid surfaces (#FFFFFF on #FAF9FD, or #111019 for │
│                            │ dark terminals) with crisp hairline borders (#E4E2EB).    │
├────────────────────────────┼───────────────────────────────────────────────────────────┤
│ 2. Tactile Feedback        │ Subtle active depressions (active:scale-[0.98]), visible  │
│                            │ focus rings (ring-[#6344E7]), and crisp micro-shadows.    │
├────────────────────────────┼───────────────────────────────────────────────────────────┤
│ 3. Restraint Over Clutter  │ Zero gratuitous purple gradients, zero generic emoji      │
│                            │ headings, zero decorative blur orbs. Clean negative space.│
├────────────────────────────┼───────────────────────────────────────────────────────────┤
│ 4. Compact Data Density    │ High-density tables, monospace telemetry tags, clear      │
│                            │ typographic hierarchy (Plus Jakarta Sans + JetBrains Mono)│
├────────────────────────────┼───────────────────────────────────────────────────────────┤
│ 5. Purposeful Animation    │ Animations communicate physical state (waveforms, latency │
│                            │ spinners, audio meters). No decorative entrance bounce.   │
└────────────────────────────┴───────────────────────────────────────────────────────────┘
```

### 7.1 Core Color & Elevation Palette
- **Primary Ink**: `#0F0E17` (Deep obsidian; high legibility)
- **Muted Ink**: `#524E5E` (WCAG AA compliant contrast > 5.5:1)
- **Hairline Border**: `#E4E2EB` (Crisp 1px borders)
- **Subtle Surface**: `#FAF9FD` (Workbench canvas)
- **Card Surface**: `#FFFFFF` (Solid cards with `box-shadow: 0 1px 3px rgba(15,14,23,0.06)`)
- **Accent Brand**: `#6344E7` (Royal indigo accent)
- **Status Success**: `#16A34A` (PSTN operational green)
- **Status Warning**: `#D97706` (Low credit alert amber)
- **Status Error**: `#DC2626` (Failed connection red)

---

# PART 8: Step-by-Step Engineering Implementation Roadmap

```
   PHASE 1: APP SHELL & ROUTER ──► PHASE 2: AGENTS & STUDIO ──► PHASE 3: VOICE & SANDBOX ──► PHASE 4: TELEPHONY & BILLING
```

### Phase 1: Authentication Boundary & Console Shell
- Configure client-side routing (`/` for Public Landing Page, `/dashboard/*` for Authenticated Console).
- Build `AppShell.jsx`, `Sidebar.jsx`, `Topbar.jsx`, and `CommandPalette.jsx` (`Cmd+K`).
- Wire `AuthContext` to protect `/dashboard` routes and redirect unauthenticated visitors.

### Phase 2: Core Overview & AI Employee Studio
- Implement `OverviewDashboard.jsx` with KPI metrics, SVG activity charts, and recent calls stream.
- Implement `AiEmployeesRoster.jsx` with card/table views and status toggles.
- Implement `CreateEmployeeWizard.jsx` (8-step guided wizard).
- Implement `AgentStudio.jsx` (8-tab deep dive).

### Phase 3: Real-Time Voice Sandbox & Audio Player
- Implement `VoiceTestingStudio.jsx` ("Talk to AI" real-time voice sandbox with Three.js mascot reactivity, audio waveform, and latency telemetry).
- Implement `CallsSection.jsx` and `CallDetailDrawer.jsx` with dual-channel audio scrubber, synced transcript, and CRM action log.
- Implement `LeadsSection.jsx` with BANT scoring and contact detail inspection.

### Phase 4: Telephony, DID Marketplace & Outbound Campaigns
- Implement `PhoneNumbersSection.jsx` with virtual number marketplace, DID procurement modal, and LNP porting status.
- Implement `CampaignsSection.jsx` with CSV column mapper, AMD tuning, and live outbound dialer progress.
- Implement `BrainTrainingSection.jsx` and `KnowledgeBaseSection.jsx` with RAG query testing.
- Implement `CustomToolsSection.jsx` with JSON schema builder and live webhook tester.

### Phase 5: Wallet, Billing & Production Hardening
- Implement `BillingWalletSection.jsx` with prepaid balance, auto-recharge drawer, invoice table, and CDR export.
- Implement `SettingsSection.jsx` with team roles, TCPA compliance, and API keys.
- Comprehensive verification: desktop, tablet, mobile responsiveness, empty states, loading skeletons, and zero build warnings (`npm run build`).