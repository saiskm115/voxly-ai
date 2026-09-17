export const NAV_LINKS = [
  {
    name: 'Product',
    href: '#capabilities',
    dropdown: [
      { title: 'Capabilities', desc: 'What your AI employee can do', href: '#capabilities' },
      { title: 'Build Agent', desc: 'Create an AI employee in minutes', href: '#build' },
      { title: 'Talk to AI', desc: 'Live voice test experience', href: '#talk-to-ai' },
      { title: 'Phone Channels', desc: 'Inbound, outbound & campaigns', href: '#phone' },
    ],
  },
  {
    name: 'Workflows',
    href: '#leads',
    dropdown: [
      { title: 'Lead Engine', desc: 'Turn calls into qualified leads', href: '#leads' },
      { title: 'Bulk Campaigns', desc: 'Dial lists at massive scale', href: '#campaigns' },
      { title: 'Train Your AI', desc: 'Knowledge, prompts & policies', href: '#train' },
      { title: 'AI Team', desc: 'Sales, support, frontdesk & follow-up', href: '#team' },
    ],
  },
  {
    name: 'Intelligence',
    href: '#conversations',
    dropdown: [
      { title: 'Call History', desc: 'Transcripts & sentiment analysis', href: '#conversations' },
      { title: 'Performance', desc: '12k+ calls, resolution & funnels', href: '#analytics' },
      { title: 'Industries', desc: 'Solutions for every vertical', href: '#industries' },
    ],
  },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
];

export const HERO_CONTENT = {
  eyebrow: "AI VOICE EMPLOYEES",
  titleLine1: "Your AI employee for",
  titleHighlight: "every conversation.",
  subtitle: "Create, train and deploy autonomous AI voice employees that make and answer phone calls, qualify leads, and deliver real business results — 24/7, with human-like conversation.",
  ctaPrimary: "Build Your Agent",
  ctaSecondary: "Talk to AI",
  perks: [
    "No coding required",
    "Set up in minutes",
    "Sub-500ms voice response",
  ],
  botTag: "Always On For Your Business",
};

export const AI_EMPLOYEE_CAPABILITIES = [
  {
    id: 'answer-calls',
    title: 'Answer customer calls',
    desc: 'Never miss an inbound lead or inquiry. Pick up on ring one with zero hold times, 24 hours a day, 365 days a year.',
    icon: 'PhoneIncoming',
    badge: 'Inbound',
    highlight: 'Zero hold time',
  },
  {
    id: 'outbound-calls',
    title: 'Make outbound calls',
    desc: 'Reach out to warm inbound prospects in under 60 seconds. Follow up on form submissions, demo requests, and quote inquiries.',
    icon: 'PhoneOutgoing',
    badge: 'Outbound',
    highlight: '< 60s speed to lead',
  },
  {
    id: 'generate-leads',
    title: 'Generate leads',
    desc: 'Engage website visitors, ad respondents, and prospect lists with natural, personalized conversational inquiries.',
    icon: 'Sparkles',
    badge: 'Growth',
    highlight: '+34% pipeline uplift',
  },
  {
    id: 'qualify-prospects',
    title: 'Qualify prospects',
    desc: 'Evaluate budget, timeline, authority, and business requirements before passing deals to your senior account executives.',
    icon: 'CheckCircle2',
    badge: 'Intelligence',
    highlight: 'BANT & MEDDIC ready',
  },
  {
    id: 'book-appointments',
    title: 'Book appointments',
    desc: 'Check live team availability, offer suitable time slots, and schedule meetings directly into Google Calendar and Outlook.',
    icon: 'Calendar',
    badge: 'Scheduling',
    highlight: 'Direct calendar sync',
  },
  {
    id: 'follow-up',
    title: 'Follow up with customers',
    desc: 'Automatically re-engage cold prospects, confirm upcoming consultations, and send post-call SMS confirmations.',
    icon: 'RotateCcw',
    badge: 'Retention',
    highlight: 'Multi-channel SMS/Voice',
  },
  {
    id: 'answer-questions',
    title: 'Answer questions',
    desc: 'Instant, accurate answers trained on your company FAQs, product specifications, pricing matrices, and compliance policies.',
    icon: 'HelpCircle',
    badge: 'Knowledge',
    highlight: '100% grounded in facts',
  },
  {
    id: 'transfer-humans',
    title: 'Transfer to humans',
    desc: 'Detect complex edge cases or customer requests and seamlessly warm-transfer the call to a human agent with live transcript context.',
    icon: 'UserCheck',
    badge: 'Handoff',
    highlight: 'Live context transfer',
  },
];

export const BUILD_AI_EMPLOYEE_STEPS = [
  {
    step: '01',
    title: 'Give it a role',
    desc: 'Define your agent’s title, job description, and core business objective (e.g. Inbound Qualifier, Support Specialist, or FrontDesk).',
    tag: 'Role & Persona',
  },
  {
    step: '02',
    title: 'Give it instructions',
    desc: 'Shape its conversational personality, tone of voice, pacing, greeting phrases, and objection-handling rules.',
    tag: 'Prompts & Tone',
  },
  {
    step: '03',
    title: 'Choose a voice',
    desc: 'Select from over 40+ ultra-realistic neural voices with customizable accents, pitch, gender, and speaking cadence.',
    tag: 'Voice Engine',
  },
  {
    step: '04',
    title: 'Add knowledge',
    desc: 'Upload product catalogs, PDFs, website URLs, and internal FAQ sheets so your employee speaks with absolute authority.',
    tag: 'Knowledge Base',
  },
  {
    step: '05',
    title: 'Connect your tools',
    desc: 'Plug into Salesforce, HubSpot, Calendly, Zapier, or custom webhooks to read and write data during the conversation.',
    tag: 'Integrations',
  },
  {
    step: '06',
    title: 'Deploy',
    desc: 'Attach your AI employee to a real local or toll-free phone number and begin handling live customer calls immediately.',
    tag: 'Instant Live',
  },
];

export const TALK_TO_AI_CONTENT = {
  headline: "Don't take our word for it. Talk to it.",
  subtitle: "Put Voxly to the test right in your browser. Experience human-grade voice latency under 400ms, natural conversational flow, and intelligent objection handling.",
  architecture: {
    top: "AI EMPLOYEE",
    left: "LISTEN",
    right: "RESPOND",
    bottom: "CONVERSATION",
  },
  samplePrompts: [
    "Hi Voxly, what can you do for my sales team?",
    "Can you explain your pricing and credit system?",
    "How do you handle a customer who wants a refund?",
    "Are you able to transfer me to a human representative?",
  ],
};

export const PHONE_CHANNELS = [
  {
    id: 'inbound',
    title: 'Inbound',
    icon: 'PhoneIncoming',
    headline: 'Your AI answers incoming calls.',
    desc: 'Eliminate missed calls and long hold queues. Voxly answers on the first ring, greets callers with friendly warmth, understands their intent, answers technical questions, and books meetings.',
    badge: 'Always Available',
    features: [
      'Sub-500ms voice response time',
      'Zero hold time, picks up on ring one',
      'Natural interruption handling',
      'Direct calendar booking during the call',
    ],
    mockCaller: 'David from Apex Logistics',
    mockGoal: 'Enterprise Quote & Architecture Review',
    stat: '99.8% Pickup Rate',
  },
  {
    id: 'outbound',
    title: 'Outbound',
    icon: 'PhoneOutgoing',
    headline: 'Your AI calls customers and prospects.',
    desc: 'Speed to lead is everything. When a prospect fills out a form on your website, Voxly calls them in under 60 seconds while their interest is peak, qualifies their need, and transfers or books.',
    badge: 'Rapid Lead Response',
    features: [
      '< 60-second speed-to-lead automation',
      'Personalized script adapting to CRM fields',
      'Smart voicemail drop detection',
      'Automated retry logic for unanswered calls',
    ],
    mockCaller: 'Instant Form Response',
    mockGoal: 'Qualify B2B Software Buyer',
    stat: '4.2x Faster Response',
  },
  {
    id: 'campaigns',
    title: 'Campaigns',
    icon: 'ListPlus',
    headline: 'Upload a list and let your AI handle calls at scale.',
    desc: 'Launch outbound campaigns to hundreds or thousands of contacts simultaneously. Ideal for renewal reminders, re-engaging dormant leads, event invitations, and patient appointments.',
    badge: 'Bulk Automation',
    features: [
      'Bulk CSV and CRM list uploads',
      'Concurrent multi-line calling capacity',
      'TCPA compliance & National DNC scrubbing',
      'Live disposition and conversion tracking',
    ],
    mockCaller: '5,000 Contact List',
    mockGoal: 'Q3 Policy Renewal Drive',
    stat: '10,000+ Dials / Hour',
  },
];

export const LEAD_PIPELINE = {
  headline: "Every conversation can become an opportunity.",
  subtitle: "Voxly listens to every call, identifies purchase signals, extracts key data points, and categorizes leads automatically so your human sales team focuses only on closing.",
  stages: ['CALL', 'CONVERSATION', 'INTENT', 'QUALIFIED LEAD', 'FOLLOW-UP'],
  cards: [
    {
      title: 'Capture',
      desc: 'Customer information',
      detail: 'Instantly extracts caller names, email addresses, phone numbers, company names, and project requirements directly from speech.',
      icon: 'Target',
      stat: '100% field accuracy',
    },
    {
      title: 'Qualify',
      desc: 'Determine customer intent',
      detail: 'Applies your BANT or custom qualification rubric: evaluates budget limits, authority level, urgency timeframe, and technical fit.',
      icon: 'Filter',
      stat: '84% qualification precision',
    },
    {
      title: 'Organize',
      desc: 'Automatically categorize leads',
      detail: 'Tags leads as Hot, Warm, Nurture, or Disqualified. Synchronizes notes and structured JSON directly into your CRM.',
      icon: 'FolderKanban',
      stat: 'Zero manual CRM entry',
    },
    {
      title: 'Follow Up',
      desc: 'Continue the conversation',
      detail: 'Dispatches automated SMS summaries, calendar invite confirmations, or initiates scheduled warm-callbacks without human delay.',
      icon: 'Send',
      stat: '< 2min post-call action',
    },
  ],
  sampleLead: {
    name: "Rachel Morgan",
    company: "Vanguard Retail Corp",
    role: "VP Customer Experience",
    intent: "Looking to replace legacy IVR across 12 support centers",
    budget: "$60,000 - $80,000 / year",
    score: 96,
    status: "Hot Lead • Ready for AE Demo",
    tags: ["High Intent", "Budget Approved", "SLA Critical"],
  },
};

export const CAMPAIGN_WORKFLOW = {
  headline: "One list. Thousands of conversations.",
  subtitle: "Stop burning human hours on manual dials and voicemails. Upload your contact list, assign your AI employee, and conduct thousands of personalized phone conversations concurrently.",
  steps: [
    { num: '1', title: 'Upload Contacts', desc: 'Import CSV or sync directly from HubSpot / Salesforce list' },
    { num: '2', title: 'Select AI Employee', desc: 'Choose the specialist trained for this specific campaign' },
    { num: '3', title: 'Launch Campaign', desc: 'Set calling windows, pacing, and caller ID reputation' },
    { num: '4', title: 'AI Calls', desc: 'Autonomous simultaneous calls with natural conversations' },
    { num: '5', title: 'Results', desc: 'Live dashboard of answered, qualified, and booked deals' },
  ],
  mockCampaign: {
    name: "Enterprise Q4 Pipeline Surge",
    totalContacts: 2450,
    callsPlaced: 2180,
    connectedCalls: 1840,
    qualifiedLeads: 486,
    meetingsBooked: 214,
    conversionRate: "26.4%",
    avgDuration: "3m 12s",
  },
};

export const AI_TEAM_MEMBERS = [
  {
    id: 'harish-sales',
    name: 'Harish Patel',
    role: 'Sales Agent',
    title: 'Senior Outbound Lead Qualifier',
    avatar: 'HP',
    desc: 'Qualifies new leads, handles pricing and objection questions, and books qualified discovery meetings with your sales team.',
    badge: 'Revenue Engine',
    voice: 'Marcus Bold (Male)',
    metrics: { qualified: '91%', meetings: '340/mo', rating: '4.9/5' },
    sampleDialogue: "Hi there! I noticed your team requested a walkthrough of our automated voice platform. Are you looking to handle inbound support, or outbound sales calls?",
    tags: ['B2B Sales', 'Objection Handling', 'Demo Booking'],
  },
  {
    id: 'swathi-support',
    name: 'Swathi Reddy',
    role: 'Support Agent',
    title: '24/7 Tier-1 Technical Support Specialist',
    avatar: 'SR',
    desc: 'Handles customer questions, verifies account details, troubleshoots issues, and processes refund or billing requests without human delay.',
    badge: 'Customer Care',
    voice: 'Priya Warm (Female)',
    metrics: { resolution: '84%', firstContact: '92%', csat: '98%' },
    sampleDialogue: "Welcome back! I see your account recently updated to the Pro tier. How can I help resolve your API webhook configuration today?",
    tags: ['Billing & Usage', 'Technical FAQ', 'Ticket Triage'],
  },
  {
    id: 'maya-reception',
    name: 'Maya Chen',
    role: 'Receptionist',
    title: 'Executive FrontDesk Coordinator',
    avatar: 'MC',
    desc: 'Answers calls, provides company information, screens inquiries, and schedules appointments with the right team members.',
    badge: 'FrontDesk',
    voice: 'Elena Smooth (Female)',
    metrics: { pickup: '100%', accuracy: '99.2%', holdTime: '0s' },
    sampleDialogue: "Thank you for calling Acme Enterprise! Who would you like me to connect you with, or would you like to schedule a consultation with our lead partner?",
    tags: ['Call Routing', 'Calendar Scheduling', 'Caller Screening'],
  },
  {
    id: 'alex-followup',
    name: 'Alex Vance',
    role: 'Follow-up Agent',
    title: 'Customer Retention & Re-engagement',
    avatar: 'AV',
    desc: 'Reconnects with prospects after demos, follows up on pending proposals, sends policy renewal alerts, and surveys client satisfaction.',
    badge: 'Retention',
    voice: 'Julian Crisp (Male)',
    metrics: { reengaged: '38%', reviews: '4.8/5', recovery: '$140k' },
    sampleDialogue: "Hi Alex here from Voxly! Just checking in on the voice demo proposal we sent across Tuesday. Did you and the team have any questions on the SLA?",
    tags: ['Proposal Follow-up', 'Churn Prevention', 'Feedback Surveys'],
  },
];

export const CONVERSATIONS_DATA = {
  headline: "Every conversation, in one place.",
  subheadline: "See every conversation. Understand every outcome.",
  callNumber: "CALL #2841",
  duration: "03:42",
  caller: "+1 (415) 890-3412 • Enterprise Software Buyer",
  agent: "Maya Chen (Sales AI)",
  sentiment: "Positive",
  transcript: [
    { speaker: 'Customer', text: "Hi, I'm interested in your service. We run a logistics company and our dispatchers are overwhelmed with calls." },
    { speaker: 'AI Employee', text: "Absolutely. What are you looking to achieve? Are you aiming to handle supplier check-ins, or automate load status updates?" },
    { speaker: 'Customer', text: "Mainly load tracking and driver check-ins. We handle around 4,000 calls a day and need sub-second response times." },
    { speaker: 'AI Employee', text: "Our infrastructure delivers 320ms latency and scales to over 100,000 concurrent lines. I can arrange an executive demo with our logistics solution architect for tomorrow at 2 PM. Does that work for you?" },
    { speaker: 'Customer', text: "That would be fantastic. Send the invite to david@apexlogistics.com." },
  ],
  outcomes: [
    { label: "Intent detected", status: "Logistic Load Tracking & Dispatch Automation" },
    { label: "Lead captured", status: "David Miller • VP Operations ($45k Budget Est.)" },
    { label: "Follow-up scheduled", status: "Executive Demo Confirmed for Tomorrow 2:00 PM" },
  ],
  filters: ['All', 'Positive', 'Neutral', 'Negative'],
  recentCalls: [
    { id: '#2841', caller: 'David Miller', company: 'Apex Logistics', sentiment: 'Positive', duration: '3m 42s', outcome: 'Demo Booked', agent: 'Maya Chen' },
    { id: '#2840', caller: 'Sarah Jenkins', company: 'FinScale Corp', sentiment: 'Positive', duration: '2m 15s', outcome: 'Resolved Inquiry', agent: 'Swathi Reddy' },
    { id: '#2839', caller: 'Marcus Vance', company: 'CloudWave Tech', sentiment: 'Neutral', duration: '1m 50s', outcome: 'Callback Requested', agent: 'Harish Patel' },
    { id: '#2838', caller: 'Elena Rostova', company: 'Metro Health', sentiment: 'Positive', duration: '4m 05s', outcome: 'Appointment Confirmed', agent: 'Swathi Reddy' },
    { id: '#2837', caller: 'Thomas Wright', company: 'Solaris Inc', sentiment: 'Negative', duration: '1m 12s', outcome: 'Transferred to Human', agent: 'Alex Vance' },
  ],
};

export const PERFORMANCE_STATS = {
  headline: "Your AI gets better when you can see everything.",
  subtitle: "Comprehensive call analytics, resolution metrics, conversion funnels, and business hours heatmaps in one unified command center.",
  metrics: [
    { label: 'CALLS', value: '12,482', change: '+18.4% this month' },
    { label: 'RESOLUTION', value: '82%', change: '+6.2% vs last month' },
    { label: 'AVG. DURATION', value: '03:42', change: '-24s efficiency gain' },
    { label: 'LEADS', value: '1,842', change: '26.8% conversion rate' },
  ],
  charts: {
    callsOverTime: [
      { month: 'May', calls: 6400, resolved: 5120 },
      { month: 'Jun', calls: 8200, resolved: 6700 },
      { month: 'Jul', calls: 9800, resolved: 8100 },
      { month: 'Aug', calls: 11200, resolved: 9350 },
      { month: 'Sep', calls: 12482, resolved: 10235 },
    ],
    funnel: [
      { stage: 'Total Dials', count: 12482, pct: '100%' },
      { stage: 'Answered', count: 9860, pct: '79%' },
      { stage: 'Conversations (>1m)', count: 7640, pct: '61%' },
      { stage: 'Qualified Leads', count: 2480, pct: '20%' },
      { stage: 'Booked Meetings', count: 1842, pct: '15%' },
    ],
    outcomes: [
      { label: 'Resolved by AI', pct: 82, color: '#7657E8' },
      { label: 'Follow-up Sent', pct: 12, color: '#20B486' },
      { label: 'Human Transfer', pct: 6, color: '#F59E0B' },
    ],
  },
};

export const INDUSTRIES_DATA = [
  {
    id: 'sales',
    title: 'Sales',
    subtitle: 'Lead qualification & outbound calls',
    desc: 'Never let warm inbound inquiries go cold. Voxly engages prospects instantly, screens for budget and authority, and books discovery calls directly with your account executives.',
    stat: '4.2x Faster Lead Response',
    icon: 'TrendingUp',
    examples: ['B2B SaaS qualification', 'Speed-to-lead form follow-up', 'Quote follow-up calls'],
  },
  {
    id: 'support',
    title: 'Customer Support',
    subtitle: '24/7 customer conversations',
    desc: 'Eliminate hold music forever. Answer customer inquiries around the clock, resolve tier-1 technical and billing questions, and escalate complex issues gracefully.',
    stat: '82% First Call Resolution',
    icon: 'Headphones',
    examples: ['Order status & tracking', 'Billing & subscription support', 'Password & credential reset'],
  },
  {
    id: 'real-estate',
    title: 'Real Estate',
    subtitle: 'Property enquiries & lead qualification',
    desc: 'Capture after-hours buyers and renters calling yard signs or portal listings. Answer pricing and amenity questions and book property viewings.',
    stat: '94% Inquiry Capture Rate',
    icon: 'Building2',
    examples: ['Listing inquiry response', 'Buyer budget qualification', 'Showing & viewing scheduling'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    subtitle: 'Appointments & reminders',
    desc: 'Drastically reduce clinic no-shows with automated confirmation calls. Help patients schedule appointments, reschedule slots, and receive pre-visit instructions.',
    stat: '-42% No-Show Reductions',
    icon: 'Stethoscope',
    examples: ['Patient appointment booking', 'Pre-op reminder calls', 'Prescription refill routing'],
  },
  {
    id: 'insurance',
    title: 'Insurance',
    subtitle: 'Customer enquiries & follow-ups',
    desc: 'Gather initial claims data, provide policy renewal reminders, and collect required underwriting information with empathetic, fully compliant conversations.',
    stat: '100% Compliance Logging',
    icon: 'ShieldCheck',
    examples: ['First Notice of Loss (FNOL)', 'Policy renewal reminders', 'Coverage inquiry triage'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    subtitle: 'Orders & support',
    desc: 'Turn phone inquiries into completed checkouts. Answer product questions, assist with shipping delays, and recover abandoned carts with courteous outbound calls.',
    stat: '+28% Cart Recovery Rate',
    icon: 'ShoppingBag',
    examples: ['Abandoned cart follow-up', 'Return & exchange assistance', 'Product recommendation calls'],
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Create your agent',
    desc: 'Name your employee, define its persona, and give it a mission for your business in our visual studio.',
  },
  {
    step: '02',
    title: 'Teach it your business',
    desc: 'Upload your website URL, sales FAQs, product manuals, and objection guidelines to build its memory.',
  },
  {
    step: '03',
    title: 'Choose a voice',
    desc: 'Select from 40+ human-grade neural voices with custom cadence, warmth, and multilingual accents.',
  },
  {
    step: '04',
    title: 'Connect a number',
    desc: 'Claim a local or toll-free phone number, or connect your existing business SIP trunk in 2 clicks.',
  },
  {
    step: '05',
    title: 'Start calling',
    desc: 'Go live! Take incoming calls and launch automated outbound campaigns with real-time analytics.',
  },
];

export const BILLING_USAGE_PREVIEW = {
  headline: "Pay for conversations. Know exactly what you're spending.",
  tagline: "Transparent usage. No surprises.",
  credits: "20,500",
  minutesUsed: "1,284",
  currentUsage: "$128.40",
  remainingMinutes: "19,216 min",
  billingPerSec: "Accurate per-second billing with zero rounding",
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
    cta: 'Build Your Agent',
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
    cta: 'Build Your Agent',
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
    cta: 'Build Your Agent',
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
    a: "Yes! Click 'Talk to AI' in the hero or test the interactive voice section directly on this page to have a live conversation through your web browser.",
  },
];
