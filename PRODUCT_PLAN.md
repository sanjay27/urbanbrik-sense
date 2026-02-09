# Bayutak - UAE Property Consultant WhatsApp Agent
## Full Product Plan

---

## 1. Executive Summary

**Bayutak** is an AI-powered WhatsApp property consultant agent for the UAE real estate market. It serves HNW individuals, family offices, relocating families, and businesses by providing expert-level property advisory through WhatsApp — the region's dominant messaging platform.

**Core Principle:** Zero hallucination tolerance. Every recommendation is grounded in a verified knowledge base with full source attribution. When the system doesn't know, it says so.

**Business Model:** B2B SaaS — property consultancies, brokerages, and agencies subscribe and receive API keys to deploy the agent on their WhatsApp Business accounts, serving their investor/buyer base.

---

## 2. WhatsApp as Frontend — Feasibility Confirmation

### Verdict: YES — WhatsApp works as the frontend UI

WhatsApp Business API (Cloud API) fully supports this use case:

| Capability | Status |
|---|---|
| Two-way conversational messaging | Supported |
| Rich media (images, PDFs, videos) | Supported (images 5MB, docs 100MB, video 16MB) |
| Interactive buttons (up to 3) | Supported |
| List messages (up to 10 options) | Supported |
| WhatsApp Flows (multi-step forms) | Supported |
| Location sharing | Supported |
| 24-hour free service window | Supported (resets on each user message) |
| 72-hour free window via Click-to-WhatsApp ads | Supported |

### Critical Compliance Note (Jan 15, 2026 Policy)

Meta now **bans general-purpose AI chatbots** on WhatsApp. However, **purpose-specific bots are allowed**. Bayutak qualifies because it provides:
- Structured property search and recommendations
- Scheduled viewings and follow-ups
- Market data and area insights
- Lead qualification with defined intents

**Action Required:** Structure the bot around specific intents (search, compare, schedule, inquire) — not open-ended "chat about anything."

### Pricing Impact

| Message Type | Cost |
|---|---|
| Service (customer-initiated, 24hr window) | FREE |
| Utility (order updates, confirmations) | $0.004 - $0.046/msg |
| Marketing (proactive outreach) | $0.025 - $0.137/msg |

**Optimization:** Keep conversations within the 24-hour service window (free). Use utility templates for follow-ups. Reserve marketing templates for new listing alerts.

---

## 3. API Key Distribution Model

### How It Works

Bayutak operates as a **B2B SaaS platform**. Each client (property consultancy/brokerage) gets:

1. **A Bayutak API key** — authenticates their account, tracks usage, enforces rate limits
2. **Their own WhatsApp Business API account** — connected via BSP (360dialog or WATI recommended)
3. **Webhook integration** — Bayutak receives inbound messages, processes them through the AI pipeline, and sends responses back

### Architecture Flow

```
Investor/Buyer (WhatsApp App)
        ↓
Client's WhatsApp Business Account (via BSP)
        ↓ webhook
Bayutak API Gateway (validates API key)
        ↓
Bayutak AI Pipeline
        ↓
Response → WhatsApp Business API → Investor/Buyer
```

### Why This Model Works

- Each client maintains their own WhatsApp Business identity (their brand, their number)
- Bayutak never touches the client's WhatsApp credentials directly
- API key controls: rate limits, feature access, knowledge base scope, usage billing
- Clients can customize system prompts for their brand voice

---

## 4. System Architecture

### Recommended Stack

```
┌──────────────────────────────────────────────────────────────┐
│                    FRONTEND LAYER                            │
│                                                              │
│  WhatsApp Business API (via 360dialog / WATI)                │
│  - Receives investor messages via webhook                    │
│  - Sends responses via API                                   │
│  - Interactive buttons, lists, media                         │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                    API GATEWAY                                │
│                                                              │
│  - API key validation & tenant identification                │
│  - Rate limiting (per tenant, per user)                      │
│  - Request routing                                           │
│  - TLS termination                                           │
│  Technology: Node.js/Fastify or Python/FastAPI                │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│                 CONVERSATION MANAGER                          │
│                                                              │
│  - Session lifecycle (create, maintain, expire)              │
│  - Conversation memory (short-term in Redis)                 │
│  - Intent detection & routing                                │
│  - User preference tracking                                  │
│  - Conversation summarization (at 10-message intervals)      │
│  Technology: Redis (sessions) + PostgreSQL (history)          │
└──────────┬───────────────┬───────────────────────────────────┘
           │               │
     ┌─────▼─────┐  ┌─────▼──────────────────────────────────┐
     │  INTENT   │  │         RAG PIPELINE                    │
     │  ROUTER   │  │                                         │
     │           │  │  1. Query Understanding                 │
     │ Routes to │  │     - Extract city, area, budget,       │
     │ correct   │  │       property type, requirements       │
     │ knowledge │  │                                         │
     │ base      │  │  2. Knowledge Base Router               │
     │           │  │     - Select city/area collection       │
     │           │  │     - Apply metadata pre-filters        │
     │           │  │                                         │
     │           │  │  3. Hybrid Search                       │
     │           │  │     - BM25 (keyword) + Vector (semantic)│
     │           │  │     - Retrieve top 20 candidates        │
     │           │  │                                         │
     │           │  │  4. Reranking                           │
     │           │  │     - Cohere Rerank v4 (top 20 → top 5) │
     │           │  │     - Confidence scoring                │
     │           │  │                                         │
     │           │  │  5. Confidence Gate                     │
     │           │  │     - Score > 80%: proceed              │
     │           │  │     - Score < 80%: "I don't have this   │
     │           │  │       information" response             │
     └───────────┘  └──────────────────┬──────────────────────┘
                                       │
┌──────────────────────────────────────▼───────────────────────┐
│                    LLM LAYER                                  │
│                                                              │
│  Primary: Claude Sonnet 4.5 (high-volume, cost-effective)    │
│  Complex: Claude Opus 4.6 (multi-property analysis, HNW)     │
│                                                              │
│  - Strict grounding system prompt                            │
│  - Citation generation (every claim linked to source)        │
│  - Structured output (property cards, comparisons)           │
│  - "I don't know" trained responses                          │
└──────────────────────────┬───────────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────────┐
│               POST-GENERATION VALIDATION                     │
│                                                              │
│  - Contextual grounding check (response vs. source docs)     │
│  - Hallucination detector (claim verification)               │
│  - Price/data accuracy validation                            │
│  - Source attribution formatting                             │
│  - Response quality scoring                                  │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
                    Response to WhatsApp
```

---

## 5. Knowledge Base Architecture

### The Anti-Hallucination Knowledge Strategy

This is the most critical component. The knowledge base must be:
- **Comprehensive** enough to answer real questions
- **Granular** enough to fit within context windows
- **Structured** enough for precise retrieval
- **Current** enough to reflect market reality

### Hierarchical Knowledge Organization

```
UAE Knowledge Base
├── General UAE Overview
│   ├── Investment regulations & visa rules
│   ├── Freehold vs leasehold zones
│   ├── Golden Visa property requirements
│   ├── Tax framework (no income tax, VAT, fees)
│   └── Currency, banking, mortgage landscape
│
├── Dubai
│   ├── City Overview (market trends, regulations, DLD fees)
│   ├── Dubai Marina
│   │   ├── Area profile (demographics, lifestyle, connectivity)
│   │   ├── Property listings (apartments, pricing, yields)
│   │   ├── ROI data & rental yields
│   │   ├── Infrastructure & amenities
│   │   └── Developer track records
│   ├── Downtown Dubai
│   ├── Palm Jumeirah
│   ├── Business Bay
│   ├── JBR
│   ├── Dubai Hills Estate
│   ├── Arabian Ranches
│   ├── DIFC
│   ├── Dubai Creek Harbour
│   ├── MBR City
│   └── ... (40+ areas)
│
├── Abu Dhabi
│   ├── City Overview
│   ├── Saadiyat Island
│   ├── Yas Island
│   ├── Al Reem Island
│   ├── Al Raha Beach
│   └── ... (20+ areas)
│
├── Sharjah
│   ├── City Overview
│   ├── Al Majaz
│   ├── Al Khan
│   └── ...
│
├── Ajman / RAK / Fujairah / UAQ
│   └── City overviews + key areas
│
└── Cross-Cutting Knowledge
    ├── Developer profiles (Emaar, DAMAC, Aldar, Meraas, etc.)
    ├── Legal framework (RERA, escrow, title deeds)
    ├── Mortgage & financing options
    ├── Property management insights
    └── Market analytics & forecasts
```

### Vector Database Design (Qdrant — Recommended)

**Why Qdrant:**
- Built-in multi-tenancy support
- Advanced pre-filtering before vector search
- Sub-50ms p99 latency
- Payload-based isolation (critical for multi-tenant)
- Hybrid search (sparse + dense vectors)
- Open-source with managed cloud option

**Collection Strategy:**

```
Collection: uae_properties
  Vectors: Cohere embed-v4.0 (1024 dimensions)
  Payload schema:
  {
    "tenant_id": "string",        // Multi-tenant isolation
    "emirate": "string",          // Dubai, Abu Dhabi, etc.
    "city": "string",             // City name
    "area": "string",             // Dubai Marina, Downtown, etc.
    "property_type": "string",    // Apartment, Villa, Townhouse, Commercial
    "bedrooms": "integer",
    "price_range_aed": "string",  // "1M-2M", "2M-5M", "5M-10M", "10M+"
    "developer": "string",
    "completion_status": "string", // Ready, Off-plan, Under Construction
    "content_type": "string",     // listing, area_guide, market_report, regulation
    "source": "string",           // Source attribution
    "last_updated": "datetime",
    "confidence_score": "float"   // Data quality score
  }

Collection: uae_knowledge
  Vectors: Cohere embed-v4.0
  Payload schema:
  {
    "topic": "string",           // regulations, visa, tax, mortgage, developer
    "emirate": "string",
    "subtopic": "string",
    "source": "string",
    "last_verified": "datetime"
  }
```

**Chunking Strategy:**

| Content Type | Chunk Size | Overlap | Strategy |
|---|---|---|---|
| Property listings | 512 tokens | 10% | Per-listing (one chunk per property) |
| Area guides | 800 tokens | 15% | Section-based (by heading) |
| Market reports | 1000 tokens | 15% | Semantic chunking |
| Regulations | 600 tokens | 20% | Paragraph-based |
| Developer profiles | 500 tokens | 10% | Per-developer |

### Context Window Management

**Problem:** A query about "2BR apartments in Dubai Marina under 2M AED" should NOT load knowledge about Abu Dhabi villas.

**Solution: Tiered Retrieval**

```
Step 1: Intent Extraction (LLM)
  → City: Dubai, Area: Dubai Marina, Type: Apartment, Beds: 2, Budget: <2M AED

Step 2: Metadata Pre-Filter (Qdrant)
  → Filter: emirate="Dubai" AND area="Dubai Marina" AND property_type="Apartment"
     AND bedrooms=2 AND price_range_aed IN ["1M-2M"]
  → Reduces search space by ~95%

Step 3: Hybrid Search (on filtered subset)
  → BM25 + Vector search → Top 20 results

Step 4: Rerank (Cohere Rerank)
  → Top 20 → Top 5 most relevant

Step 5: Context Assembly (~15K-30K tokens total)
  → 5 property chunks (~2.5K tokens)
  → Area guide for Dubai Marina (~1K tokens)
  → Relevant regulations (~500 tokens)
  → Conversation history/summary (~2K tokens)
  → System prompt (~1K tokens)
  → Total: ~7K-10K tokens (well within limits)
```

This approach keeps context **tight and relevant** — no wasted tokens, no irrelevant data, minimal hallucination risk.

---

## 6. MCP Servers — Recommendation

### Should You Use MCP?

**Verdict: Yes, but as an enhancement — not the core architecture.**

MCP (Model Context Protocol) is production-ready in 2026 with 97M+ monthly SDK downloads. It excels at:

- **Tool integration** — connecting the LLM to external data sources dynamically
- **Multi-source retrieval** — querying different knowledge bases based on context
- **Session state management** — maintaining conversation context across requests

### Recommended MCP Usage

```
MCP Server: uae-property-search
  Tools:
  - search_properties(city, area, type, budget, bedrooms)
  - get_area_guide(city, area)
  - get_market_data(city, area, period)
  - get_developer_info(developer_name)
  - get_regulations(topic, emirate)
  - compare_properties(property_ids[])
  - calculate_roi(property_id, financing_type)
  - schedule_viewing(property_id, preferred_dates)
```

### Where MCP Adds Value

1. **Dynamic tool selection** — the LLM decides which knowledge base to query based on the conversation
2. **Structured data retrieval** — MCP tools return typed, validated data (not raw text)
3. **Composability** — chain multiple queries (search → compare → calculate ROI) in one turn
4. **Future extensibility** — add CRM, calendar, DLD API integrations as new MCP tools

### Where MCP is NOT the answer

- **Vector search** — use Qdrant directly (MCP adds unnecessary latency for high-frequency vector queries)
- **Session memory** — use Redis directly (MCP is for tools, not state management)
- **Core RAG pipeline** — RAG should be a native pipeline, not mediated through MCP

### Architecture with MCP

```
Claude LLM
  ↓ (uses MCP tools when needed)
MCP Server: property-tools
  ├── search_properties → Qdrant vector search
  ├── get_area_guide → Qdrant knowledge retrieval
  ├── get_market_data → Analytics DB / cached reports
  ├── compare_properties → Multi-query + LLM comparison
  ├── calculate_roi → Calculation engine
  └── get_regulations → Knowledge base retrieval
```

---

## 7. Anti-Hallucination Framework

**This is non-negotiable. Your integrity depends on it.**

### 5-Layer Defense

```
Layer 1: RETRIEVAL QUALITY
  - Hybrid search (BM25 + vector) — catches both keyword and semantic matches
  - Metadata pre-filtering — only search relevant subsets
  - Cohere Rerank — precision filter (top 20 → top 5)
  - Result: Only highly relevant documents reach the LLM

Layer 2: CONFIDENCE GATING
  - Every retrieved document gets a relevance score (0-100%)
  - Threshold: 80% minimum to include in context
  - Below threshold: system triggers "I don't have enough information" response
  - No retrieved documents: "This isn't in our current database"

Layer 3: GROUNDED GENERATION
  - System prompt enforces strict grounding:

    "You are Bayutak, a UAE property consultant. You MUST:
     1. ONLY answer based on the retrieved property data provided
     2. NEVER invent property details, prices, yields, or locations
     3. Cite your source for every factual claim: [Source: ...]
     4. If information is not in the provided context, respond:
        'I don't have this specific information in our database.
         Let me connect you with a specialist who can help.'
     5. If data might be outdated, flag it:
        'This data is from [date]. Current prices may differ.'"

Layer 4: POST-GENERATION VALIDATION
  - Check every factual claim against source documents
  - Verify prices, areas, developer names against structured data
  - Flag responses that contain claims not found in source material
  - If validation fails: regenerate or fall back to safe response

Layer 5: HUMAN ESCALATION
  - Complex queries beyond knowledge base → route to human consultant
  - Legal/financial advice requests → disclaimer + human handoff
  - Low-confidence responses → flag for human review
  - User dissatisfaction detected → immediate human escalation
```

### "I Don't Know" Response Templates

```
When no matching data:
"I don't have specific information about [topic] in our current database.
I'd recommend speaking with a specialist. Would you like me to connect you?"

When data might be outdated:
"Based on our records from [date], [answer]. However, the market moves
quickly — I'd suggest verifying current availability with our team."

When question is outside scope:
"That's a great question, but it falls outside my area of expertise
(legal/tax/visa advice). I'd recommend consulting with [appropriate
professional]. Would you like me to share some contacts?"

When partially confident:
"Based on what I have, [partial answer]. However, I don't have complete
information on [missing aspect]. Want me to find out more?"
```

---

## 8. Conversation Memory Management

### Three-Layer Memory Architecture

```
┌─────────────────────────────────────────────────────┐
│  Layer 1: ACTIVE MEMORY (Redis)                     │
│  TTL: 24 hours                                      │
│                                                     │
│  - Last 10-15 messages in full                      │
│  - User preferences extracted this session          │
│  - Properties discussed (IDs + key details)         │
│  - Current search criteria                          │
│                                                     │
│  Key: session:{tenant_id}:{phone_number}            │
│  Latency: <1ms                                      │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Layer 2: SESSION SUMMARY (PostgreSQL)              │
│  TTL: 90 days                                       │
│                                                     │
│  - Summarized conversation (generated every 10 msgs)│
│  - Key facts: budget, location prefs, requirements  │
│  - Properties shortlisted                           │
│  - Decisions made, next steps agreed                │
│  - Engagement score                                 │
│                                                     │
│  Table: conversation_sessions                       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  Layer 3: LONG-TERM PROFILE (PostgreSQL + Vectors)  │
│  TTL: Indefinite                                    │
│                                                     │
│  - Investor profile (budget, preferences, history)  │
│  - Past property searches across sessions           │
│  - Viewing history and feedback                     │
│  - Purchase/decision patterns                       │
│  - Semantic search over past interactions           │
│                                                     │
│  Enables: "Last time we spoke, you were interested  │
│  in Dubai Marina. Have your preferences changed?"   │
└─────────────────────────────────────────────────────┘
```

### Summarization Strategy

```
Trigger: Every 10 messages OR at 70% context capacity

Process:
1. Take messages 1-10 (oldest batch)
2. Generate summary via LLM:
   "Summarize this conversation segment. Extract:
    - User's stated requirements
    - Properties discussed with key details
    - Decisions or preferences expressed
    - Open questions or next steps"
3. Store summary in PostgreSQL
4. Remove raw messages from Redis
5. Keep summary + last 10 messages in active context

Context Assembly for Each Turn:
  System prompt                     (~1K tokens)
  + User profile summary            (~500 tokens)
  + Session summary (older turns)   (~1K tokens)
  + Last 10 messages                (~3K tokens)
  + Retrieved property data         (~5K tokens)
  + Area/regulation context         (~1K tokens)
  ─────────────────────────────────────────────
  Total: ~11.5K tokens (well within any model's window)
```

---

## 9. Multi-Tenant Architecture

### Tenant Isolation Model

```
┌──────────────────────────────────────────────┐
│                API GATEWAY                    │
│                                              │
│  API Key → Tenant ID mapping                 │
│  Rate limits per tenant tier                 │
│  Usage metering (every request logged)       │
└──────────────────┬───────────────────────────┘
                   │
         ┌─────────▼─────────┐
         │  TENANT ROUTER    │
         │                   │
         │  Extracts:        │
         │  - tenant_id      │
         │  - user_phone     │
         │  - session_id     │
         │  - feature_flags  │
         └─────────┬─────────┘
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
┌────────┐  ┌──────────┐  ┌──────────┐
│Tenant A│  │ Tenant B │  │ Tenant C │
│        │  │          │  │          │
│Sessions│  │ Sessions │  │ Sessions │
│in Redis│  │ in Redis │  │ in Redis │
│        │  │          │  │          │
│Qdrant  │  │ Qdrant   │  │ Qdrant   │
│filter: │  │ filter:  │  │ filter:  │
│tenant_a│  │ tenant_b │  │ tenant_c │
└────────┘  └──────────┘  └──────────┘
```

### Isolation Guarantees

| Layer | Isolation Method |
|---|---|
| API | API key per tenant |
| Sessions (Redis) | Key prefix: `session:{tenant_id}:{phone}` |
| Vector DB (Qdrant) | Payload filter: `tenant_id = X` on every query |
| Conversation History (PostgreSQL) | `tenant_id` column, row-level security |
| LLM calls | Tenant-specific system prompts, no cross-tenant data |
| Usage/Billing | Per-tenant event logging |

### Tenant Tiers

| Tier | Monthly Price | Conversations | Features |
|---|---|---|---|
| Starter | $299/mo | 500 conversations | Basic property search, 1 emirate |
| Professional | $799/mo | 2,000 conversations | All emirates, ROI calculator, CRM webhook |
| Enterprise | $1,999/mo | 10,000 conversations | Custom knowledge base, priority support, analytics |
| Custom | Contact us | Unlimited | White-label, dedicated infrastructure, SLA |

---

## 10. Conversation Flow Design

### Expert Consultant Persona

The agent acts as an expert property consultant, not a chatbot. It:
- Asks qualifying questions before recommending
- Understands investment vs. end-use motivations
- Adapts language for HNW/institutional vs. individual buyers
- Provides market context, not just listings

### Sample Conversation Flows

**Flow 1: Investor Qualification**
```
Agent: Welcome to [Brokerage Name]. I'm your UAE property advisor.
       Are you looking to invest, relocate, or explore business premises?

User:  Investment. Looking for rental yield.

Agent: Great. A few questions to match you with the right opportunities:

       1. Which emirate interests you? [Dubai] [Abu Dhabi] [Open to any]
       2. What's your investment budget range?
          [500K-1M AED] [1M-3M AED] [3M-10M AED] [10M+ AED]
       3. Do you prefer ready properties or off-plan?
          [Ready (immediate rental)] [Off-plan (capital appreciation)]

User:  Dubai, 2M-3M, Ready

Agent: For 2M-3M AED ready properties in Dubai with strong rental yields,
       here are the top-performing areas:

       1. Dubai Marina — 1-2BR apartments
          Avg yield: 6.8% | Avg price: 2.1M AED
          High demand from professionals and tourists
          [Source: DLD Transaction Data Q4 2025]

       2. JVC (Jumeirah Village Circle) — 2BR apartments
          Avg yield: 7.2% | Avg price: 1.4M AED
          Growing family-oriented community
          [Source: Property Monitor Report Jan 2026]

       Would you like detailed listings in any of these areas?
       Or shall I compare more options?
```

**Flow 2: Relocating Family**
```
Agent: Welcome! Are you planning to relocate to the UAE?

User:  Yes, moving with family. 2 kids, need good schools nearby.

Agent: Absolutely. Let me find the right area for your family.

       1. Which emirate are you relocating to? [Dubai] [Abu Dhabi] [Other]
       2. What type of property?
          [Villa/Townhouse] [Apartment] [Open to both]
       3. Budget range?
          [1M-2M AED] [2M-5M AED] [5M-10M AED] [10M+]
       4. Rent or buy?
          [Buy] [Rent] [Not sure yet]

User:  Dubai, Villa, 3M-5M, Buy

Agent: For a family with school-age children, these Dubai communities
       stand out in your 3M-5M range:

       1. Arabian Ranches 2 — 3-4BR villas
          Near GEMS schools, community parks, retail
          Avg price: 3.8M AED | Family-centric, gated
          [Source: Community Master Plan, RERA Registration]

       2. Dubai Hills Estate — 3-4BR townhouses
          Near Kings' School, Dubai Hills Mall, green spaces
          Avg price: 4.2M AED | Premium, newer community
          [Source: Emaar Master Development]

       Shall I dive deeper into either community? I can share
       school proximity maps, community amenities, and recent
       transaction data.
```

**Flow 3: Family Office / Bulk Investment**
```
Agent: Welcome. I understand you're exploring UAE real estate
       for portfolio allocation. Let me understand your objectives.

       1. Investment horizon?
          [Short-term (1-3 years)] [Medium (3-7 years)] [Long-term (7+)]
       2. Total allocation size?
          [10M-50M AED] [50M-100M AED] [100M+ AED]
       3. Strategy preference?
          [Rental yield] [Capital appreciation] [Balanced portfolio]
       4. Single asset or diversified?
          [Single premium asset] [Diversified across areas/types]

User:  Long-term, 50M-100M, Balanced, Diversified

Agent: For a balanced, diversified portfolio of 50M-100M AED
       with a long-term horizon, I'd suggest exploring:

       Yield Component (40% allocation):
       - Dubai Marina / JBR — Premium residential (6.5-7.5% yield)
       - Business Bay — Commercial offices (8-9% yield)

       Capital Growth Component (40% allocation):
       - Dubai Creek Harbour — Off-plan premium (projected 15-20% by 2028)
       - Saadiyat Island, Abu Dhabi — Cultural district growth

       Stable Core (20% allocation):
       - Palm Jumeirah — Ultra-prime villas (trophy assets, inflation hedge)

       I can provide detailed analysis for any segment.
       Would you like me to model projected returns?

       Note: This is market data analysis, not financial advice.
       I'd recommend discussing final allocation with your
       investment advisor.
```

---

## 11. Technology Stack — Final Recommendation

### Core Stack

| Component | Technology | Rationale |
|---|---|---|
| **Runtime** | Python 3.12 + FastAPI | Best AI/ML ecosystem, async support |
| **WhatsApp BSP** | 360dialog | Cost-effective (flat $50/mo), no per-message markup, developer-friendly |
| **Primary LLM** | Claude Sonnet 4.5 | Best cost/performance for high-volume advisory |
| **Complex Queries LLM** | Claude Opus 4.6 | HNW/institutional queries, multi-property analysis |
| **Embeddings** | Cohere embed-v4.0 | Best multilingual (Arabic+English), 128K context, MTEB leader |
| **Vector DB** | Qdrant (Cloud) | Multi-tenancy, hybrid search, pre-filtering, sub-50ms |
| **Reranker** | Cohere Rerank v4 | 15-30% accuracy improvement on retrieval |
| **Session Store** | Redis (Cloud) | Sub-1ms sessions, TTL management, semantic cache |
| **Persistent Store** | PostgreSQL (Supabase) | Conversation history, billing, analytics, pgvector backup |
| **Semantic Cache** | Redis + vector similarity | 70-90% cache hit rate, 60-85% API cost reduction |
| **MCP Server** | Custom (Python SDK) | Property search tools, area guides, ROI calculator |
| **Hosting** | AWS / Railway / Fly.io | Auto-scaling, UAE region available (AWS me-south-1) |
| **Monitoring** | Langfuse or LangSmith | LLM observability, hallucination tracking, cost monitoring |

### Infrastructure Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLOUD INFRASTRUCTURE                      │
│                                                                  │
│  ┌──────────┐    ┌──────────────┐    ┌────────────────────┐     │
│  │ 360dialog│◄──►│  FastAPI      │◄──►│  Redis Cloud       │     │
│  │ WhatsApp │    │  Application  │    │  - Sessions        │     │
│  │ BSP      │    │  Server       │    │  - Semantic Cache  │     │
│  └──────────┘    │              │    └────────────────────┘     │
│                  │  - API Gateway│                               │
│                  │  - Tenant Mgmt│    ┌────────────────────┐     │
│                  │  - Conv. Mgr  │◄──►│  Qdrant Cloud      │     │
│                  │  - RAG Pipeline│   │  - Properties      │     │
│                  │  - MCP Client │    │  - Knowledge Base  │     │
│                  └──────┬───────┘    └────────────────────┘     │
│                         │                                        │
│                    ┌────▼────┐        ┌────────────────────┐     │
│                    │ Claude  │        │  PostgreSQL        │     │
│                    │ API     │        │  (Supabase)        │     │
│                    │         │        │  - Conv. History   │     │
│                    │ Sonnet  │        │  - User Profiles   │     │
│                    │ + Opus  │        │  - Billing/Usage   │     │
│                    └─────────┘        │  - Analytics       │     │
│                                       └────────────────────┘     │
│                    ┌─────────┐                                   │
│                    │ Cohere  │        ┌────────────────────┐     │
│                    │ API     │        │  Langfuse          │     │
│                    │         │        │  - LLM Monitoring  │     │
│                    │ Embed   │        │  - Hallucination   │     │
│                    │ + Rerank│        │    Tracking        │     │
│                    └─────────┘        │  - Cost Analytics  │     │
│                                       └────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Data Sourcing Strategy

### Where to Get UAE Property Data

| Source | Data Type | Method |
|---|---|---|
| **DLD (Dubai Land Department)** | Transaction data, price indices | API / Public reports |
| **RERA** | Registered projects, developers | Public registry |
| **Property Monitor** | Market analytics, yields | Partnership / API |
| **Bayut / Property Finder / Dubizzle** | Live listings | API partnerships or licensed data feeds |
| **Developer websites** | Off-plan projects, payment plans | Curated manual + automated scraping (with permission) |
| **Abu Dhabi DOE** | Abu Dhabi transaction data | Public reports |
| **Government portals** | Visa rules, regulations, Golden Visa | Official websites |
| **Industry reports** | Market outlook, sector analysis | Licensed reports (JLL, CBRE, Knight Frank) |

### Data Quality Pipeline

```
Raw Data → Validation → Structuring → Embedding → Qdrant

Validation checks:
  ✓ Price within market range for area/type
  ✓ Developer is RERA-registered
  ✓ Location coordinates valid
  ✓ Listing is current (not sold/expired)
  ✓ Source is authoritative
  ✓ Data freshness (flag if > 30 days old)
```

### Update Frequency

| Data Type | Update Cycle |
|---|---|
| Property listings | Daily |
| Market prices / yields | Weekly |
| Area guides | Monthly |
| Regulations / visa rules | As published |
| Developer profiles | Monthly |
| Market reports | Quarterly |

---

## 13. Development Roadmap

### Phase 1: Foundation (Weeks 1-4)

**Goal:** Basic RAG pipeline with Dubai knowledge base

- [ ] Set up FastAPI application skeleton
- [ ] Integrate Qdrant Cloud, create collections
- [ ] Build embedding pipeline (Cohere embed-v4.0)
- [ ] Implement chunking strategies for property data
- [ ] Load Dubai knowledge base (top 10 areas)
- [ ] Basic RAG pipeline (search → retrieve → generate)
- [ ] Claude Sonnet 4.5 integration with grounding prompt
- [ ] Unit tests for retrieval accuracy

**Deliverable:** CLI-based property Q&A that answers Dubai questions accurately

### Phase 2: WhatsApp Integration (Weeks 5-6)

**Goal:** Working WhatsApp bot with basic conversation

- [ ] 360dialog account setup and webhook integration
- [ ] Inbound message handling (text, buttons, lists)
- [ ] Outbound response formatting (text, interactive elements)
- [ ] Redis session management (24-hour TTL)
- [ ] Basic conversation flow (greeting → qualification → search → results)
- [ ] Error handling and fallback responses

**Deliverable:** WhatsApp bot that can answer property questions for Dubai

### Phase 3: Anti-Hallucination & Quality (Weeks 7-9)

**Goal:** Production-grade accuracy with zero hallucination tolerance

- [ ] Cohere Rerank integration (top 20 → top 5)
- [ ] Confidence scoring system (80% threshold)
- [ ] Post-generation validation layer
- [ ] "I don't know" response system
- [ ] Citation generation for every factual claim
- [ ] Source attribution formatting
- [ ] Human escalation triggers
- [ ] Hallucination detection testing suite
- [ ] Langfuse monitoring integration

**Deliverable:** Validated, citation-backed responses with confidence scoring

### Phase 4: Full UAE Coverage (Weeks 10-12)

**Goal:** All 7 emirates with area-level knowledge

- [ ] Abu Dhabi knowledge base (all major areas)
- [ ] Sharjah, Ajman, RAK, Fujairah, UAQ knowledge bases
- [ ] Cross-emirate comparison capability
- [ ] General UAE knowledge (regulations, visa, tax, Golden Visa)
- [ ] Developer profiles database
- [ ] Mortgage and financing knowledge base
- [ ] Knowledge base router (city/area routing)

**Deliverable:** Full UAE coverage with area-level expertise

### Phase 5: Multi-Tenancy & API Keys (Weeks 13-15)

**Goal:** Production multi-tenant system

- [ ] API key generation and management system
- [ ] Tenant isolation (Redis, Qdrant, PostgreSQL)
- [ ] Per-tenant system prompt customization
- [ ] Usage tracking and metering (PostgreSQL)
- [ ] Rate limiting per tenant tier
- [ ] Tenant onboarding flow
- [ ] Admin dashboard (tenant management, usage analytics)

**Deliverable:** Multi-tenant platform ready for client onboarding

### Phase 6: Advanced Features (Weeks 16-20)

**Goal:** Expert-level advisory capabilities

- [ ] MCP server with property tools
- [ ] ROI calculator (rental yield, capital appreciation modeling)
- [ ] Property comparison engine (side-by-side)
- [ ] Conversation summarization (10-message intervals)
- [ ] Long-term user profiles (cross-session memory)
- [ ] Semantic caching (Redis)
- [ ] CRM webhook integration (for client's CRM)
- [ ] Viewing scheduler integration
- [ ] Claude Opus 4.6 for complex/HNW queries
- [ ] Arabic language support
- [ ] WhatsApp Flows for structured data collection

**Deliverable:** Full-featured expert property consultant

### Phase 7: Production & Scale (Weeks 21-24)

**Goal:** Production deployment and optimization

- [ ] Load testing (1000+ concurrent conversations)
- [ ] Performance optimization (sub-2s response time)
- [ ] Security audit (data isolation, API key security)
- [ ] GDPR/data protection compliance
- [ ] Disaster recovery and backup strategy
- [ ] Production monitoring and alerting
- [ ] Documentation (API docs, onboarding guide)
- [ ] Beta client onboarding (3-5 agencies)
- [ ] Feedback loop and knowledge base refinement

**Deliverable:** Production system serving real clients

---

## 14. Cost Estimates

### Monthly Infrastructure (at scale: 10 tenants, 5,000 conversations/mo)

| Service | Estimated Cost |
|---|---|
| Qdrant Cloud (5M vectors) | $150-300/mo |
| Redis Cloud (sessions + cache) | $100-200/mo |
| Supabase (PostgreSQL) | $25-75/mo |
| Claude API (Sonnet 4.5 primary) | $500-1,500/mo |
| Claude API (Opus 4.6 complex) | $200-500/mo |
| Cohere (Embed + Rerank) | $100-300/mo |
| 360dialog (WhatsApp BSP) | $50/number × 10 = $500/mo |
| WhatsApp messaging fees | $200-500/mo |
| Hosting (FastAPI app) | $50-150/mo |
| Langfuse (monitoring) | $50-100/mo |
| **Total** | **$1,425 - $3,625/mo** |

### Revenue Model (10 tenants)

| Tier | Tenants | Revenue |
|---|---|---|
| Starter ($299) | 4 | $1,196 |
| Professional ($799) | 4 | $3,196 |
| Enterprise ($1,999) | 2 | $3,998 |
| **Total Monthly Revenue** | **10** | **$8,390** |
| **Monthly Costs** | | **~$2,500** |
| **Monthly Gross Margin** | | **~$5,890 (70%)** |

---

## 15. Key Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Hallucinated property data | Critical — damages credibility | 5-layer anti-hallucination framework, confidence gating, human escalation |
| WhatsApp AI policy violation | Service suspended | Structure as purpose-specific bot with defined intents, not general AI |
| Stale property data | Bad recommendations | Daily listing updates, freshness flags, "data from [date]" disclaimers |
| Data sourcing challenges | Incomplete knowledge base | Start with Dubai (most data available), expand incrementally |
| High LLM costs at scale | Margin compression | Semantic caching (70-90% hit rate), Sonnet for volume / Opus for complex only |
| Multi-tenant data leak | Trust violation | Payload-based isolation, tenant_id on every query, security audit |
| Arabic language quality | Poor Arabic responses | Cohere embed-v4.0 (Arabic support), bilingual system prompts, Arabic testing |
| Competitor risk | Market share | First-mover in WhatsApp-native UAE property AI; deep knowledge moat |

---

## 16. Success Metrics

| Metric | Target | Measurement |
|---|---|---|
| Hallucination rate | < 1% | Langfuse traces, human review sampling |
| Response accuracy | > 95% | Ground truth comparison, user feedback |
| Response time (p95) | < 3 seconds | Application monitoring |
| User satisfaction | > 4.5/5 | Post-conversation rating |
| Conversation completion rate | > 70% | Sessions that reach property recommendation |
| Lead qualification rate | > 40% | Conversations that generate qualified leads |
| Cache hit rate | > 70% | Redis cache metrics |
| Tenant onboarding time | < 1 day | Setup to first conversation |
| Monthly active conversations | 5,000+ (by month 6) | Usage tracking |
| Knowledge base coverage | 100% of UAE freehold areas | Area audit |

---

## 17. Summary of Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Frontend | WhatsApp Business API | Dominant messaging platform in UAE/GCC, supports rich media |
| BSP | 360dialog | Flat pricing, no per-message markup, developer-friendly |
| LLM (primary) | Claude Sonnet 4.5 | Best cost/performance, strong grounding, low hallucination |
| LLM (complex) | Claude Opus 4.6 | 1M context, top accuracy for HNW/institutional queries |
| Vector DB | Qdrant Cloud | Multi-tenancy, hybrid search, pre-filtering, proven at scale |
| Embeddings | Cohere embed-v4.0 | Best multilingual (Arabic+English), MTEB leader |
| Reranker | Cohere Rerank v4 | 15-30% accuracy improvement |
| Sessions | Redis | Sub-1ms, TTL management, semantic caching |
| Database | PostgreSQL (Supabase) | History, billing, analytics, pgvector fallback |
| MCP | Yes (enhancement) | Tool integration, not core RAG |
| Monitoring | Langfuse | LLM-specific observability, hallucination tracking |
| Anti-hallucination | 5-layer defense | Non-negotiable for credibility |
| Multi-tenancy | Payload-based isolation | Cost-effective, strong isolation |
| Knowledge structure | City → Area → Property Type hierarchy | Context window management, precise retrieval |
