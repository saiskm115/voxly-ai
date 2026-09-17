# Voxly AI — Pre-Launch Production Audit & Design Transformation Blueprint

> **Target Codebase**: `d:\Antigravity` (`voxly-ai`)  
> **Evaluation Framework**: Production Readiness (Legal, Security, SEO, Performance, Accessibility, Conversion) + **Emil Kowalski Design Philosophy** (Craft, Restraint, Visual Hierarchy, Anti-Pattern Elimination)  
> **Status**: Comprehensive Audit & Action Plan  

---

## Executive Summary

This document serves as the single source of truth for auditing, refining, and transitioning **Voxly AI** from a prototype with high-energy landing page sections into an elite, production-ready enterprise product.

### Core Objectives
1. **Eliminate "Vibecoded" / AI-Generated SaaS Tropes**: Transition away from purple gradients, colored-border cards, decorative pills, and generic glassmorphism toward a mature, editorial, high-craft product design inspired by Emil Kowalski.
2. **Remove Unwanted Redundant Sections**: Completely excise `PhoneNumbersSection.jsx` (Dedicated Phone Numbers & Collaborative Handoff) from [`App.jsx`](file:///d:/Antigravity/src/App.jsx) and navigation.
3. **Execute Full Pre-Launch Hardening**: Address all 15 production audit pillars—implement legal pages, complete SEO metadata (`robots.txt`, `sitemap.xml`, Open Graph), fix broken links, enforce single-goal CTA conversion hierarchy, add accessible error states, and optimize the 3D WebGL asset pipeline without removing the 3D mascot.

---

## Part 1: Emil Kowalski Design Critique & 19 Anti-Pattern Audit

A rigorous evaluation of Voxly's current UI against the 19 anti-patterns of generic, AI-generated SaaS design:

| # | Anti-Pattern | Current Status in Voxly | Required Remediation |
|---|---|---|---|
| **1** | **Purple-to-blue gradients** | `bg-gradient-to-r from-[#7657E8] to-[#9B7BF7]` applied to buttons, cards, and backgrounds across 8 components. | Replace with solid, high-contrast brand neutrals: rich dark `#0F0E17`, crisp white `#FFFFFF`, subtle stone borders `#E4E2EB`, and restrained violet `#6344E7` as an accent. |
| **2** | **Gradient-colored hero text** | `.gradient-text-lavender` used on primary `<h1>` and section titles in [`Hero.jsx`](file:///d:/Antigravity/src/components/Hero.jsx), [`AiEmployeeSection.jsx`](file:///d:/Antigravity/src/components/AiEmployeeSection.jsx), etc. | Remove all text clipping gradients. Use solid, high-contrast typography (`#0F0E17` in light mode, `#F7F7FB` on dark panels) for superior legibility. |
| **3** | **Emojis in headings** | Emojis present in badges and headers (e.g. `🤖`, `📞`, `⚡`, `👩‍💼`). | Remove all emojis from headings, navigation, and badges. Use curated monochrome icons or pure typographic weight. |
| **4** | **Defaulting to Inter everywhere** | System font stack defaults to standard Inter/Plus Jakarta Sans without typographic contrast. | Establish a clear typographic scale: Plus Jakarta Sans for crisp display headings, balanced with clean body geometry and monospace accents for telemetry data. |
| **5** | **Excessive colored-border cards** | Almost every card uses `border-[#7657E8]/15` or `border-[#7657E8]/40`. | Replace tinted borders with neutral hairline borders (`border-black/5` or `border-neutral-200`). Use whitespace and elevation rather than colored outlines. |
| **6** | **Generic glassmorphism cards** | Extensive use of `backdrop-blur-xl`, `bg-white/10`, and `bg-white/5` with semi-transparent borders. | Replace glass cards with solid, opaque surfaces (`#FFFFFF` on `#FAF9FD`, or clean dark `#13121D`). Reserve blur strictly for sticky navigation. |
| **7** | **Low-contrast dark mode** | Several dark modules use low-contrast text (`text-white/40`, `text-white/50` on dark grey). | Ensure all body text meets WCAG AA 4.5:1 minimum contrast. Lighten secondary text to `#A19EAD` or `#D1CFDB`. |
| **8** | **Repetitive 3-card & 4-card grids** | Sections 2, 4, 5, 8, and 12 rely on repetitive identical card boxes with top icons. | Break monotony: use varied asymmetric editorial layouts—split feature columns, data tables, interactive workbench split-views, and narrative horizontal bands. |
| **9** | **Unnecessary badges above headlines** | Almost every section begins with an eyebrow pill badge (`Sparkles`, `Bot`, `Zap`, `Brain`). | Eliminate decorative eyebrow badges where they add no information. Let bold, direct section titles drive the hierarchy. |
| **10** | **Lucide icons everywhere** | Over 40 decorative icons placed in small colored rounded rectangles above text. | Remove decorative icon containers. Icons should only exist where they directly aid navigation or clarify functionality (e.g. Play, Mic, Check). |
| **11** | **Default/shallow styling** | Reliance on standard Tailwind rounded pills (`rounded-full`) and basic shadow utilities. | Use tailored border radiuses (`rounded-xl` / `rounded-2xl` max), bespoke micro-shadows (`box-shadow: 0 1px 2px rgba(0,0,0,0.04)`), and crisp 1px borders. |
| **12** | **Generic fade-in animations** | Multiple `animate-in fade-in zoom-in-95` classes scattered throughout components. | Remove non-functional entrance animations. Keep animations functional: smooth state transitions, audio waveforms, and 3D character interactions. |
| **13** | **Unnecessary cursor-following effects** | Floating blur orbs following mouse or static ambient blur blobs. | Remove blurred decorative background blobs (`blur-3xl`, `blur-[140px]`). Ground the page in clean negative space. |
| **14** | **Fade/opacity-only button hovers** | Buttons rely on `hover:opacity-90` or simple background shifts. | Implement tactile, purposeful button states: subtle active depression (`active:scale-[0.98]`), micro-border illumination, and distinct keyboard focus rings. |
| **15** | **Inconsistent spacing system** | Varying section padding (`py-24`, `py-32`, varying gaps `gap-6`, `gap-8`, `gap-10`). | Enforce an 8pt spatial rhythm: consistent section padding (`py-20` sm: `py-28`), standard container max-width (`max-w-6xl`), and consistent component margins. |
| **16** | **Excessive em dashes in copy** | Copy frequently uses "—" as an empty conversational pause. | Replace em dashes with crisp, professional sentence structures and bulleted specifications. |
| **17** | **Generic AI/SaaS buzzwords** | Phrases like "Supercharge workflows", "Autonomous magic", "Deliver 10x results". | Replace with concrete operational terminology: "Sub-500ms call latency", "BANT qualification", "Direct SIP trunking", "Zero hold times". |
| **18** | **Forced serif-italic accents** | Occasional italicized typography without brand purpose. | Keep typographic styling clean, upright, and legible throughout. |
| **19** | **Arbitrary font combinations** | Caveat handwriting font loaded in `index.html` without cohesive product utility. | Unload unused fonts (`Caveat`) to save bandwidth and maintain typographic discipline. |

---

## Part 2: Detailed 15-Pillar Pre-Launch Audit

### 1. Legal & Trust
- [ ] **Missing Legal Pages**: No Privacy Policy (`/privacy`) or Terms of Service (`/terms`) exist; links in [`Footer.jsx`](file:///d:/Antigravity/src/components/Footer.jsx) point to `#` or `#faq`.
- [ ] **Voice Telephony Data Disclosure**: Because the product records, transcribes, and synthesizes human voice, explicit terms must clarify data processing, audio retention policies, and GDPR/CCPA consumer rights.
- [ ] **Cookie Consent**: Missing cookie notice / consent mechanism for session tracking and audio permission caching.
- [ ] **Compliance Claims**: Remove uncertified marketing statements (e.g. "100% HIPAA BAA certified") unless verified; replace with precise technical statements regarding encryption in transit (TLS 1.3) and secure WebRTC streams.

### 2. Security
- [ ] **Client-Side Environment Variables**: Audit [`src/services/voiceAgent.js`](file:///d:/Antigravity/src/services/voiceAgent.js) to guarantee no hardcoded API keys, bearer tokens, or sensitive webhooks exist.
- [ ] **Form Input Sanitization**: Newsletter and lead form inputs in [`Footer.jsx`](file:///d:/Antigravity/src/components/Footer.jsx) must sanitize input to prevent XSS.
- [ ] **Microphone Permissions**: Ensure microphone access requests via `navigator.mediaDevices.getUserMedia` handle denial gracefully without leaking console errors.
- [ ] **Production Build Sanitization**: Ensure Vite build removes all `console.log` and debug markers (`drop: ['console', 'debugger']`).

### 3. SEO & Discoverability
- [ ] **Outdated Document Title**: [`index.html`](file:///d:/Antigravity/index.html) has outdated title `"Voxly — Turn Conversations Into Opportunities"` instead of the current brand headline `"Voxly — The AI Employee for Every Conversation"`.
- [ ] **Missing Metadata Files**:
  - Missing [`public/robots.txt`](file:///d:/Antigravity/public/robots.txt)
  - Missing [`public/sitemap.xml`](file:///d:/Antigravity/public/sitemap.xml)
- [ ] **Social Sharing Cards**: Missing Twitter Card tags (`twitter:card`, `twitter:site`, `twitter:creator`, `twitter:image`) and Open Graph image (`og:image`).
- [ ] **Canonical URL**: Missing `<link rel="canonical" href="https://voxly.ai" />`.
- [ ] **Structured Data (JSON-LD)**: Missing `SoftwareApplication` and `Organization` schema markup in `index.html`.

### 4. Performance & 3D WebGL Optimization
- [ ] **3D Asset Weight**: The 3D model at [`public/models/VoxlyBot_AIEmployee_Interactive.glb`](file:///d:/Antigravity/public/models/VoxlyBot_AIEmployee_Interactive.glb) is 2.1 MB. It must remain intact as the central product visual, but:
  - Verify WebGL fallback in [`VoxlyScene.jsx`](file:///d:/Antigravity/src/three/VoxlyScene.jsx) renders cleanly when WebGL fails.
  - Pause Three.js mixer updates and canvas rendering when the Hero section is not in the viewport.
- [ ] **Font Loading Optimization**: Remove unused `Caveat` font from Google Fonts link in [`index.html`](file:///d:/Antigravity/index.html) to eliminate render-blocking stylesheet latency.
- [ ] **Image Optimization**: Convert images in `public/images/` to optimized WebP format with explicit `width` and `height` dimensions to prevent layout shifts (CLS).

### 5. Accessibility (WCAG 2.1 AA)
- [ ] **Contrast Deficiencies**:
  - Secondary text `#6F6B7D` on `#FAF9FD` background fails 4.5:1 ratio for small text. Darken to `#524E5E` or `#4A4656`.
  - Light purple pill text `#EDE7FF` on white fails contrast.
- [ ] **Missing ARIA Labels**: Icon buttons in [`Hero.jsx`](file:///d:/Antigravity/src/components/Hero.jsx), [`Navbar.jsx`](file:///d:/Antigravity/src/components/Navbar.jsx), and [`Footer.jsx`](file:///d:/Antigravity/src/components/Footer.jsx) lack `aria-label`.
- [ ] **Keyboard Navigation**: Interactive custom tabs in [`AiEmployeeSection.jsx`](file:///d:/Antigravity/src/components/AiEmployeeSection.jsx) and [`PhoneChannelsSection.jsx`](file:///d:/Antigravity/src/components/PhoneChannelsSection.jsx) must support Tab and arrow-key focus with visible focus rings (`focus-visible:ring-2`).
- [ ] **Reduced Motion**: Wrap continuous 3D floating and pulsing CSS animations in `@media (prefers-reduced-motion: reduce)`.

### 6. Responsive Design
- [ ] **Mobile Viewport (375px–420px)**:
  - Verify 3D canvas container scales down appropriately (`h-[360px]`) so text and CTA are visible above the fold.
  - Prevent dialogue popup in [`Hero.jsx`](file:///d:/Antigravity/src/components/Hero.jsx) from overflowing on narrow screens.
- [ ] **Horizontal Scroll Check**: Confirm zero horizontal overflow (`overflow-x-hidden`) across all viewports.
- [ ] **Touch Targets**: Ensure every interactive button and card has a minimum hit area of 44x44px.

### 7. Error States & Handling
- [ ] **Missing 404 Experience**: Standalone or modal fallback for unknown URL paths.
- [ ] **Speech API Denial**: Graceful, friendly fallback state when microphone permissions are denied in [`TalkToMeModal.jsx`](file:///d:/Antigravity/src/components/TalkToMeModal.jsx) or browser lacks Web Speech support.
- [ ] **WebGL Unavailable Fallback**: Display a high-resolution preview image of Voxly if hardware acceleration is disabled.

### 8. Forms & Lead Capture
- [ ] **Footer Newsletter Form**: Currently has an inert `<input>` and `<button>` with no submit handler, no validation, and no success confirmation.
- [ ] **Form Validation**: Add regex email validation, error messages, and immediate visual success state ("Thank you for subscribing").

### 9. Spam Protection
- [ ] **Honeypot Field**: Add hidden anti-bot honeypot field (`aria-hidden="true" style="display:none"`) to all public input forms.
- [ ] **Client-Side Debouncing**: Debounce rapid multi-clicks to prevent duplicate submissions.

### 10. Analytics & Event Instrumentation
- [ ] **Unified Telemetry Helper**: Create a clean, privacy-friendly analytics dispatcher (`src/services/analytics.js`) logging key milestones:
  - `page_view`
  - `cta_build_agent_click`
  - `voice_demo_started`
  - `voice_test_prompt_clicked`
  - `plan_selected`
  - `newsletter_subscribed`

### 11. Conversion & Single Primary CTA Strategy
- [ ] **CTA Fragmentation**: Currently mixed between "Get Started", "Build Your Agent", "Create your AI employee", "Deploy Pro Fleet", "Start 14-Day Free Trial".
- [ ] **Enforce Unified Hierarchy**:
  - **Primary CTA**: `"Build Your Agent"` (or `"Build Your AI Agent"`) throughout the entire page.
  - **Secondary CTA**: `"Talk to AI"` (triggering live audio demonstration).
  - Eliminate competing tertiary CTA labels.

### 12. Link & Navigation Integrity
- [ ] **Dead Navigation Anchors**:
  - [`Navbar.jsx`](file:///d:/Antigravity/src/components/Navbar.jsx) and [`Footer.jsx`](file:///d:/Antigravity/src/components/Footer.jsx) contain old anchors (`#builder`, `#simulator`, `#platform`).
  - Update all navigation items to match active section IDs:
    - `#capabilities` (Capabilities)
    - `#build` (Build Agent)
    - `#talk-to-ai` (Talk to AI)
    - `#phone` (Phone Channels)
    - `#leads` (Lead Engine)
    - `#campaigns` (Bulk Campaigns)
    - `#train` (Train Your AI)
    - `#team` (AI Team)
    - `#conversations` (Call History)
    - `#analytics` (Performance)
    - `#industries` (Industries)
    - `#how-it-works` (How It Works)
    - `#pricing` (Pricing)
    - `#faq` (FAQ)

### 13. Content Quality & Brand Tone
- [ ] **Tone Alignment**: Replace marketing fluff with authoritative, precise operational language.
- [ ] **Remove Em Dashes**: Clean up excessive punctuation dashes in body copy.
- [ ] **Remove Unsubstantiated Claims**: Remove ungrounded statistics and clarify exact technical capabilities.

### 14. Voice Agent-Specific UX
- [ ] **Instant Understanding**: Ensure a first-time visitor grasps within 5 seconds that Voxly is an autonomous voice phone agent—not a chat widget, not a text prompt tool, but an AI that talks over telephone networks.
- [ ] **Clear Inbound vs. Outbound Separation**: Highlight the duality of receiving inbound calls and placing outbound campaign dials.

### 15. Final Technical Health
- [ ] Production build succeeds with 0 errors (`npm run build`).
- [ ] Clean bundle output with no duplicate dependencies.
- [ ] Clean console without Three.js deprecation or hydration warnings.

---

## Part 3: Mandatory Architecture & Code Changes

### 1. Remove PhoneNumbersSection & Collaborative Handoff
As explicitly mandated, delete / remove the dedicated phone numbers and collaborative handoff component:
- **Remove Component File**: Delete [`src/components/PhoneNumbersSection.jsx`](file:///d:/Antigravity/src/components/PhoneNumbersSection.jsx).
- **Update [`App.jsx`](file:///d:/Antigravity/src/App.jsx)**: Remove import and rendering of `<PhoneNumbersSection />`.
- **Update [`Navbar.jsx`](file:///d:/Antigravity/src/components/Navbar.jsx)** & [`siteContent.js`](file:///d:/Antigravity/src/data/siteContent.js): Remove links to `#numbers` and phone numbers submenu items.
- *Rationale*: Collaborative handoff and telephony numbers are already cleanly addressed inside `PhoneChannelsSection` ("Inbound", "Outbound", "Campaigns") and `AiEmployeeSection` ("Transfer to humans"). Having a separate standalone phone numbers block creates redundancy and clutter.

### 2. Streamlined 15-Section Product Flow
With the removal of `PhoneNumbersSection`, the streamlined landing page flow becomes:
1. `Hero` (AI Voice Agent + 3D Mascot)
2. `AiEmployeeSection` (What Can Your AI Employee Do? + Build in Minutes)
3. `TalkToAiSection` (Interactive Live Voice Experience)
4. `PhoneChannelsSection` (Inbound, Outbound, Campaigns)
5. `LeadEngineSection` (Turn Calls into Opportunities)
6. `CampaignScaleSection` (Run Campaigns at Scale)
7. `TrainingSection` (Teach It How Your Business Works)
8. `AiTeamSection` (Build an AI Team: Sales, Support, Receptionist, Follow-up)
9. `ConversationHistorySection` (Every Conversation in One Place)
10. `AnalyticsSection` (Performance Dashboard)
11. `IndustriesSection` (One Platform, Every Vertical)
12. `HowItWorksSection` (5 Steps + Transparent Usage & Billing)
13. `PricingSection` (Transparent Pricing Tiers)
14. `FAQSection` (Technical & Operational FAQ)
15. `FinalCTA` (Final High-Impact Call to Action)

---

## Part 4: Component-by-Component Remediation Matrix

| Component | Priority | Identified Issues | Concrete Remediation |
|---|---|---|---|
| [`index.html`](file:///d:/Antigravity/index.html) | **Critical** | Outdated title, missing meta description tags, missing Open Graph image, unused font (`Caveat`) loaded, missing `robots.txt`/`sitemap.xml`. | Update title, add comprehensive SEO meta tags, remove Caveat font, create `public/robots.txt` and `public/sitemap.xml`. |
| [`App.jsx`](file:///d:/Antigravity/src/App.jsx) | **Critical** | Still imports and renders `<PhoneNumbersSection />`; missing legal modal routing. | Remove `<PhoneNumbersSection />`; wire Privacy Policy and Terms of Service modals. |
| [`Hero.jsx`](file:///d:/Antigravity/src/components/Hero.jsx) | **High** | Gradient text on headline (`gradient-text-lavender`), decorative badge above headline, purple gradient CTA buttons. | Refactor to solid deep navy headline (`#0F0E17`), remove decorative badge, restyle buttons to solid high-contrast Emil Kowalski style (`bg-[#6344E7]` or `#0F0E17`). |
| [`AiEmployeeSection.jsx`](file:///d:/Antigravity/src/components/AiEmployeeSection.jsx) | **High** | 8 identical colored-border cards, purple gradient text, decorative badges, repetitive icons in colored boxes. | Redesign into an asymmetric workbench layout: clean hairline borders, remove decorative pills, use solid typography, and improve step navigation. |
| [`TalkToAiSection.jsx`](file:///d:/Antigravity/src/components/TalkToAiSection.jsx) | **High** | Heavy glowing background blobs (`blur-[140px]`), gradient text, low-contrast text. | Simplify dark container to solid `#111019` with hairline border, increase text contrast, streamline waveform animation to clean physical audio meters. |
| [`PhoneChannelsSection.jsx`](file:///d:/Antigravity/src/components/PhoneChannelsSection.jsx) | **Medium** | Redundant tree diagram, pill tabs with heavy gradient. | Streamline tabs to clean segmented control (`bg-[#F0EEF6]` with sliding active pill), integrate clear telephony specs. |
| [`LeadEngineSection.jsx`](file:///d:/Antigravity/src/components/LeadEngineSection.jsx) | **Medium** | Repetitive 4-card grid with Lucide icons in colored boxes. | Redesign into a structured horizontal pipeline with structured data tables showing real extracted fields. |
| [`CampaignScaleSection.jsx`](file:///d:/Antigravity/src/components/CampaignScaleSection.jsx) | **Medium** | 5 identical numbered cards in a row. | Convert into an interactive campaign timeline and realistic telemetry monitor. |
| [`TrainingSection.jsx`](file:///d:/Antigravity/src/components/TrainingSection.jsx) | **Medium** | Bouncing arrow animation, decorative pills. | Replace with a clean architectural schematic showing vector ingestion, RAG pipeline, and guardrails. |
| [`AiTeamSection.jsx`](file:///d:/Antigravity/src/components/AiTeamSection.jsx) | **Medium** | 4 identical cards with emoji avatars. | Upgrade agent profiles with polished typography, realistic audio sample triggers, and structured role specifications. |
| [`ConversationHistorySection.jsx`](file:///d:/Antigravity/src/components/ConversationHistorySection.jsx) | **Medium** | Dark right panel contrast could be crisper. | Enhance transcript readability with clear speech bubbles and instant audio playback. |
| [`AnalyticsSection.jsx`](file:///d:/Antigravity/src/components/AnalyticsSection.jsx) | **Medium** | Chart tabs and bar heights can feel more realistic. | Refine SVG charts with clean grid lines and precise percentages. |
| [`IndustriesSection.jsx`](file:///d:/Antigravity/src/components/IndustriesSection.jsx) | **Medium** | Repetitive 6 cards with identical icon boxes. | Create a tabbed vertical showcase with real enterprise workflow examples. |
| [`HowItWorksSection.jsx`](file:///d:/Antigravity/src/components/HowItWorksSection.jsx) | **Medium** | Dark usage card with purple gradient header. | Redesign as a crisp billing transparency card with precise per-second accounting details. |
| [`PricingSection.jsx`](file:///d:/Antigravity/src/components/PricingSection.jsx) | **High** | Plan CTA buttons have inconsistent wording ("Build Your Agent" vs "Deploy Pro Fleet"). | Standardize primary CTA to `"Build Your Agent"` across all tiers. Clarify included minutes and overage rates. |
| [`Footer.jsx`](file:///d:/Antigravity/src/components/Footer.jsx) | **High** | Dead `#` links for Privacy Policy, Terms, and Cookie Settings; newsletter form is non-functional; links reference old section IDs. | Connect legal links to real modals, add working newsletter submission with validation, fix all anchor links. |
| [`LegalModals.jsx`](file:///d:/Antigravity/src/components/LegalModals.jsx) | **Critical** (New) | Missing legal documents. | Create clean, comprehensive Privacy Policy and Terms of Service modal dialogues. |

---

## Part 5: Implementation Roadmap

### Phase 1: Structural Cleanup & Deletion
1. Delete [`src/components/PhoneNumbersSection.jsx`](file:///d:/Antigravity/src/components/PhoneNumbersSection.jsx).
2. Remove references to `PhoneNumbersSection` from [`App.jsx`](file:///d:/Antigravity/src/App.jsx), [`Navbar.jsx`](file:///d:/Antigravity/src/components/Navbar.jsx), and [`siteContent.js`](file:///d:/Antigravity/src/data/siteContent.js).

### Phase 2: Design System Overhaul (Emil Kowalski Principles)
1. **Palette Restraint**: Update [`tailwind.config.js`](file:///d:/Antigravity/tailwind.config.js) and [`globals.css`](file:///d:/Antigravity/src/styles/globals.css) to eliminate gradient utilities and establish crisp neutral tokens (`#0F0E17`, `#524E5E`, `#E4E2EB`, `#FAF9FD`, accent `#6344E7`).
2. **Typography & Contrast**: Remove `Caveat` font; establish clean Plus Jakarta Sans hierarchy with solid colors and zero gradient text clipping.
3. **Card & Surface Simplification**: Replace generic glassmorphism and colored outlines with solid white cards, 1px neutral hairline borders, and refined micro-shadows.

### Phase 3: Core Section Redesign
1. **Hero**: Remove gradient text; refine CTA buttons to solid high-contrast states; preserve full 3D robot interaction and mouse tracking.
2. **AiEmployeeSection**: Replace repetitive card grid with asymmetric workbench view; polish 6-step builder.
3. **TalkToAiSection**: Clean up dark panel; replace heavy glowing blobs with sleek physical audio meters and functional speech test prompts.
4. **LeadEngine & CampaignScale**: Replace generic icon cards with structured pipeline tables and realistic dial telemetry.
5. **AiTeam**: Replace emoji headers with professional multi-agent profiles.

### Phase 4: Production Hardening (SEO, Legal, Forms, Security)
1. **SEO**: Update `index.html` with title, meta tags, and Open Graph; generate `public/robots.txt` and `public/sitemap.xml`.
2. **Legal**: Create `LegalModals.jsx` containing comprehensive Privacy Policy and Terms of Service; wire to `Footer.jsx`.
3. **Forms & Links**: Fix newsletter form with validation; audit and fix all anchor links.
4. **Analytics**: Implement lightweight event tracking service (`src/services/analytics.js`).

### Phase 5: Verification & Production Build
1. Verify `npm run build` generates 0 warnings/errors.
2. Verify responsive design from 375px to 1440px.
3. Commit and sync all production changes to GitHub repository.