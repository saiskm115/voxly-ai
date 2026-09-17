export const NAV_LINKS = [
  {
    name: 'Product',
    href: '#product',
    dropdown: [
      { title: 'AI Voice Builder', desc: 'Visual prompt & persona creator', href: '#builder' },
      { title: 'Knowledge Engine', desc: 'Train on PDFs, FAQs & URLs', href: '#train' },
      { title: 'Live Call Simulator', desc: 'Test conversations in real time', href: '#simulator' },
      { title: 'Conversation Intelligence', desc: 'Real-time sentiment & action items', href: '#intelligence' },
    ],
  },
  {
    name: 'Solutions',
    href: '#solutions',
    dropdown: [
      { title: 'Lead Qualification', desc: 'Filter high-intent buyers in seconds', href: '#usecases' },
      { title: 'Inbound Support', desc: 'Resolve queries 24/7 without hold times', href: '#usecases' },
      { title: 'Outbound Campaigns', desc: 'Scale automated follow-ups compliant with DNC', href: '#usecases' },
      { title: 'Appointment Booking', desc: 'Direct two-way calendar synchronization', href: '#usecases' },
    ],
  },
  { name: 'Pricing', href: '#pricing' },
  {
    name: 'Resources',
    href: '#resources',
    dropdown: [
      { title: 'Documentation', desc: 'API reference & telephony webhooks', href: '#faq' },
      { title: 'Security & Compliance', desc: 'SOC2 Type II, HIPAA & GDPR compliant', href: '#platform' },
      { title: 'Telephony Guide', desc: 'Connecting Twilio, Vonage & SIP trunks', href: '#platform' },
    ],
  },
];

export const HERO_CONTENT = {
  eyebrow: "AI VOICE EMPLOYEES",
  titleLine1: "Turn Conversations",
  titleHighlight: "Into Opportunities",
  subtitle: "Create, deploy and scale AI voice employees that make and receive calls, qualify leads and deliver real business results — 24/7, with human-like conversations.",
  ctaPrimary: "Get Started →",
  ctaSecondary: "Watch Demo",
  perks: [
    "No coding required",
    "Set up in minutes",
    "Scale instantly",
  ],
  botTag: "Always On For Your Business",
};

export const BOT_STATES_GRID = [
  { id: 'IDLE', label: 'Idle', icon: 'Bot', desc: 'Float & eye blink' },
  { id: 'GREETING', label: 'Greeting', icon: 'Sparkles', desc: 'Friendly wave gesture' },
  { id: 'WAVE', label: 'Wave', icon: 'Hand', desc: 'Articulated arm wave' },
  { id: 'THINKING', label: 'Thinking', icon: 'Brain', desc: 'Inquisitive head tilt' },
  { id: 'EXCITED', label: 'Excited', icon: 'Flame', desc: 'Dynamic happy expression' },
  { id: 'TALKING', label: 'Talking', icon: 'Mic', desc: 'Real-time lip sync' },
];

export const EMPLOYEE_PRESETS = [
  {
    id: 'maya',
    name: 'Maya Chen',
    role: 'SaaS Inbound Qualifier',
    avatar: '👩‍💼',
    voice: 'Alloy Warm (Female)',
    accent: 'American Neutral',
    latency: '340ms avg',
    temperament: 'Empathetic, consultative, decisive',
    primaryGoal: 'Qualify B2B inbound leads with budget >$20k and book demo',
    systemPrompt: "You are Maya, a senior qualification specialist for Acme Cloud. Speak concisely, confirm current tech stack, detect buying authority, and suggest scheduling an executive demo.",
    metrics: { qualified: '92%', avgCall: '2m 45s', rating: '4.9/5' },
  },
  {
    id: 'alex',
    name: 'Alex Vance',
    role: 'Customer Success & Support',
    avatar: '👨‍💻',
    voice: 'Echo Smooth (Male)',
    accent: 'British Crisp',
    latency: '310ms avg',
    temperament: 'Patient, methodical, reassuring',
    primaryGoal: 'Triage tier-1 billing & onboarding support tickets with zero wait time',
    systemPrompt: "You are Alex, support engineer for Voxly. Help customers reset credentials, resolve webhook timeout errors, and explain usage metering with step-by-step clarity.",
    metrics: { firstCallResolution: '86%', csat: '98.2%', holdTime: '0s' },
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Outbound Appointment Booker',
    avatar: '👩‍⚕️',
    voice: 'Nova Energetic (Female)',
    accent: 'Mid-Atlantic',
    latency: '360ms avg',
    temperament: 'Friendly, persuasive, respectful',
    primaryGoal: 'Confirm patient checkups and reschedule cancelled slots',
    systemPrompt: "You are Elena from Metro Health. Greet patients warmly, confirm their upcoming checkup for Tuesday, and handle date shifts with immediate EHR calendar sync.",
    metrics: { showUpRate: '+42%', slotsFilled: '94%', compliance: '100% HIPAA' },
  },
];

export const CALL_SIMULATOR_SCENARIOS = [
  {
    id: 'inbound_lead',
    title: 'B2B Enterprise Lead Qualification',
    type: 'Inbound',
    caller: 'David Miller (VP of Operations at Apex Logistics)',
    phone: '+1 (555) 382-9012',
    conversation: [
      { speaker: 'Voxly', text: "Hello, thank you for calling Acme Solutions! My name is Maya, your AI specialist. How can I assist your logistics operations today?", time: '0:02' },
      { speaker: 'Caller', text: "Hi Maya. We are currently scaling to 40 distribution centers and our dispatchers are overwhelmed with supplier calls. Can you handle 10,000 calls a day?", time: '0:08' },
      { speaker: 'Voxly', text: "Absolutely, David. Our distributed voice infrastructure handles over 250,000 concurrent calls with 320ms latency. Are your dispatchers currently using TMS software like Samsara or McLeod?", time: '0:16' },
      { speaker: 'Caller', text: "Yes, we are on Samsara. How quickly can we run a pilot?", time: '0:22' },
      { speaker: 'Voxly', text: "We have a pre-built Samsara webhook connector. I can schedule a 20-minute architecture review with our logistics lead for tomorrow at 2 PM Eastern. Does that work for you?", time: '0:29' },
      { speaker: 'Caller', text: "2 PM tomorrow sounds perfect. Send the invite to david@apexlogistics.com.", time: '0:34' },
      { speaker: 'Voxly', text: "Calendar invite sent! I've also pre-filled your team's Samsara notes. Looking forward to speaking tomorrow!", time: '0:40' },
    ],
    intelligence: {
      sentiment: 'Highly Positive (96%)',
      qualification: 'Tier 1 Enterprise (Qualified)',
      budgetEst: '$45,000/yr',
      nextAction: 'Calendar Invite Sent • Sync to Salesforce',
      leadScore: 94,
    },
  },
  {
    id: 'support_triage',
    title: 'Tier 1 Billing & Usage Support',
    type: 'Support',
    caller: 'Sarah Jenkins (CTO at FinScale)',
    phone: '+1 (555) 714-2299',
    conversation: [
      { speaker: 'Voxly', text: "Welcome to FinScale support! This is Alex. I can see you're calling regarding the invoice dated September 15th. Is that correct?", time: '0:02' },
      { speaker: 'Caller', text: "Yes, Alex. We noticed an unexpected spike in API voice minutes over the weekend.", time: '0:07' },
      { speaker: 'Voxly', text: "I just pulled up your telemetry. You ran a successful high-volume campaign on Saturday with 4,200 connected calls. All tiered volume discounts of 18% were automatically applied.", time: '0:15' },
      { speaker: 'Caller', text: "Oh, got it! That explains the spike. Can you email me the itemized breakdown?", time: '0:21' },
      { speaker: 'Voxly', text: "Sent to sarah@finscale.io right now. Is there anything else I can help verify for your team today?", time: '0:26' },
    ],
    intelligence: {
      sentiment: 'Satisfied (92%)',
      qualification: 'Resolved • No Escalation Needed',
      budgetEst: 'Existing Customer',
      nextAction: 'Invoice breakdown dispatched • Ticket closed',
      leadScore: 88,
    },
  },
];

export const PLATFORM_PILLARS = [
  {
    category: "Telephony & Number Management",
    title: "Global Numbers & Instant Provisioning",
    desc: "Deploy local, toll-free, and vanity phone numbers across 100+ countries with one click, or bring your existing SIP trunk.",
    badge: "Telephony",
    items: ["Instant US, UK, EU, AU local DID numbers", "BYO SIP Trunk (Twilio, Telnyx, Plivo)", "High-fidelity Opus & G.711 codec support", "Automated caller ID reputation & STIR/SHAKEN"],
  },
  {
    category: "Compliance & Safety",
    title: "Enterprise Compliance & Real-Time DNC",
    desc: "Built-in protection against TCPA violations with automated National Do-Not-Call registry scrubbing and instant opt-outs.",
    badge: "Compliance",
    items: ["Federal & State Do-Not-Call list checking", "Automated verbal opt-out detection", "SOC 2 Type II certified infrastructure", "HIPAA Business Associate Agreement (BAA)"],
  },
  {
    category: "Enterprise Billing & GST",
    title: "Transparent Metering & Business Invoicing",
    desc: "Pay strictly for connected seconds. Generate GST-compliant corporate invoices with department cost-center attribution.",
    badge: "Billing",
    items: ["Per-second accurate billing with zero rounding", "GST & VAT localized invoices with tax ID validation", "Auto-recharge thresholds and spending limits", "Multi-workspace seat and credit allocation"],
  },
  {
    category: "Developer Ecosystem",
    title: "Webhooks, API & CRM Synchronization",
    desc: "Trigger bidirectional actions during the call. Fetch customer records from your CRM and update databases mid-sentence.",
    badge: "Integrations",
    items: ["Sub-50ms HTTP webhook triggers during live calls", "Bi-directional Salesforce, HubSpot & Zoho sync", "Real-time SSE event stream for live dashboards", "Zapier & Make native app integrations"],
  },
];

export const ANALYTICS_DATA = {
  totalCalls: "1,248,390",
  answerRate: "78.4%",
  qualificationRate: "38.2%",
  avgCallDuration: "2m 18s",
  costPerMinute: "$0.14",
  humanSavings: "74%",
  trends: [
    { day: "Mon", calls: 14200, qualified: 5400 },
    { day: "Tue", calls: 18900, qualified: 7200 },
    { day: "Wed", calls: 24100, qualified: 9350 },
    { day: "Thu", calls: 22800, qualified: 8900 },
    { day: "Fri", calls: 26500, qualified: 10400 },
    { day: "Sat", calls: 11200, qualified: 4100 },
    { day: "Sun", calls: 9800, qualified: 3600 },
  ],
};

export const PRICING_TIERS = [
  {
    name: 'Starter',
    badge: 'Seed & Early Startups',
    priceMonthly: 49,
    priceAnnual: 39,
    description: 'Perfect for small teams testing their first automated voice employee.',
    features: [
      '1 Dedicated AI Voice Employee',
      '500 Included Call Minutes / month',
      '$0.14/min overage rate',
      'Web-based voice testing simulator',
      'Standard low-latency voice models',
      'HubSpot & Zapier basic connectors',
      'Community & email support',
    ],
    cta: 'Start 14-Day Free Trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    badge: 'Most Popular',
    priceMonthly: 199,
    priceAnnual: 159,
    description: 'For growing revenue teams scaling inbound qualification and outbound follow-ups.',
    features: [
      '5 Dedicated AI Voice Employees',
      '2,500 Included Call Minutes / month',
      '$0.11/min overage rate',
      'Custom Voice Cloning & Tone Tuning',
      'Ultra-low 300ms latency routing',
      'Live Webhooks & Two-Way CRM Sync',
      'Do-Not-Call (DNC) Registry Scrubbing',
      'Priority 24/7 Slack support',
    ],
    cta: 'Deploy Pro Fleet',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    badge: 'Scale & High Volume',
    priceMonthly: 699,
    priceAnnual: 549,
    description: 'High-volume call centers and global enterprises requiring custom security and SLAs.',
    features: [
      'Unlimited AI Voice Employees',
      '10,000+ Included Call Minutes',
      'Volume discounts down to $0.06/min',
      'Bring-Your-Own SIP Trunk & Carriers',
      'Dedicated Private Cloud Instance',
      'Custom LLM Fine-Tuning on Past Recordings',
      'SOC2 Type II, HIPAA BAA & GDPR SLA',
      'Dedicated Telephony Solution Architect',
    ],
    cta: 'Contact Enterprise Sales',
    highlighted: false,
  },
];

export const FAQS = [
  {
    q: "How does Voxly sound so natural and human-like?",
    a: "Voxly utilizes state-of-the-art neural acoustic models with sub-350 millisecond round-trip response times. It understands natural interruptions, speech disfluencies, pauses, and tone modulation so the customer never feels like they are waiting on a robotic IVR.",
  },
  {
    q: "Does Voxly require engineering or coding knowledge to deploy?",
    a: "None at all. You can build, prompt, and train an AI voice employee in under 5 minutes using our visual persona builder. Simply paste your website URL, upload your sales FAQ documents, or select from pre-tuned templates.",
  },
  {
    q: "Can Voxly integrate directly with our phone numbers and existing CRM?",
    a: "Yes. You can instantly provision local phone numbers across 100+ countries, port your existing business lines, or connect your SIP trunk (Twilio, Telnyx, Plivo). Voxly natively logs call recordings, transcripts, and qualified deal stages straight into Salesforce, HubSpot, and Zoho.",
  },
  {
    q: "What happens if a customer asks a question outside the bot's knowledge?",
    a: "You can configure graceful fallback rules: Voxly can intelligently warm-transfer the caller to a live human rep along with a synthesized context summary, or capture the contact details for guaranteed callback.",
  },
  {
    q: "How are compliance and Do-Not-Call (DNC) rules enforced?",
    a: "Voxly features automated national and state DNC registry scrubbing before any outbound campaign initiates, plus real-time verbal opt-out detection. If a recipient says 'remove me from your list', the system immediately registers the block across your fleet.",
  },
  {
    q: "Can I test the voice bot right now before signing up?",
    a: "Yes! Click 'Watch Demo' at the top of this page or tap 'Talk to me' on the 3D robot to test a live conversation directly through your web browser.",
  },
];
