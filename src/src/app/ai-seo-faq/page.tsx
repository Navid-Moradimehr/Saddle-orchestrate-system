import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import LogoMark from "@/components/navigation/LogoMark";

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"
).replace(/\/$/, "");

export const metadata: Metadata = {
  title: "FAQ — Product Design and Industrial AI Systems",
  description:
    "Answers about our product design, context-aware decisions, MCP servers, agent harnesses, long-term memory, industrial data pipelines, world models, digital twins, and AI visibility engineering",
  alternates: { canonical: "/ai-seo-faq" },
  openGraph: {
    type: "website",
    url: "/ai-seo-faq",
    title: "What We Design and Build",
    description:
      "A clear FAQ about our product design and industrial AI systems work",
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Design and Build",
    description:
      "A clear FAQ about our product design and industrial AI systems work",
  },
};

const faqs = [
  {
    group: "Studio and partnerships",
    question: "What do you design and build?",
    answer:
      "We are a product design and industrial intelligence studio. We design expressive websites and interfaces, conversational and voice experiences, connected workflows, context-aware decision systems, MCP tool servers, agent harnesses, long-term memory, industrial data pipelines, world models, and digital twins",
    note: "Design craft and systems engineering belong in the same operating loop",
  },
  {
    group: "Studio and partnerships",
    question: "Who do you work best with?",
    answer:
      "We work best with teams that have a meaningful operational problem, access to the people and signals around it, and a willingness to test a small useful version before scaling. That can include industrial operators, engineering teams, product companies, service businesses, and technical founders",
    note: "A real decision or workflow is a stronger starting point than a vague AI mandate",
  },
  {
    group: "Studio and partnerships",
    question: "Do you only build agentic AI systems?",
    answer:
      "No. UI and UX design remain a core capability. We build websites, product interfaces, responsive systems, conversational flows, voice interactions, and content experiences as standalone work or as the human-facing layer of a larger intelligent system",
    note: "The interface is where system capability becomes human understanding",
  },
  {
    group: "Product and interfaces",
    question: "How do UI and UX design fit with industrial AI?",
    answer:
      "Industrial intelligence is only useful when people can understand its state, evidence, uncertainty, and next action. We design the interface and the underlying information flow together so operators, engineers, customers, and agents share a coherent view of the work",
    note: "A good model still needs a legible decision surface",
  },
  {
    group: "Product and interfaces",
    question: "Can you redesign an existing product instead of replacing it?",
    answer:
      "Yes. We can work within an existing product, design system, controller, data platform, or operating process. The work may be a focused interface redesign, an interactive prototype, a new decision surface, or a carefully bounded system integration rather than a wholesale replacement",
    note: "Preserve what works and improve the part that creates friction",
  },
  {
    group: "Product and interfaces",
    question: "What is AI visibility engineering?",
    answer:
      "AI visibility engineering makes a company website easier for search engines and AI agents to discover, interpret, cite, and navigate. We combine information architecture, server-rendered content, entity clarity, structured data, crawler controls, evidence-rich pages, accessibility, and measurement without sacrificing the quality of the human experience",
    note: "Machine legibility should improve the site for people too",
  },
  {
    group: "Industrial AI systems",
    question: "What is context-aware decision making?",
    answer:
      "Context-aware decision making combines the current signal with relevant history, operating conditions, constraints, goals, and risk before recommending an action. The result is not merely a prediction but a decision surface that shows what changed, what options exist, and when a person should remain in control",
    note: "The next action should carry its context with it",
  },
  {
    group: "Industrial AI systems",
    question: "What are MCP servers and agent harnesses?",
    answer:
      "An MCP server gives an agent a typed and governed way to use real tools such as APIs, databases, files, or industrial services. An agent harness surrounds the model with instructions, permissions, memory, evaluations, traces, retries, recovery behavior, and human approval points so tool use can be tested and operated responsibly",
    note: "Reliable agents need contracts and operating boundaries, not only prompts",
  },
  {
    group: "Industrial AI systems",
    question: "How do you approach long-term memory for agents?",
    answer:
      "We decide what deserves to persist, who owns it, how relevance is scored, when it expires, and how a person can inspect or correct it. The aim is useful continuity without blindly storing every conversation, event, or private detail",
    note: "Memory is a governed product decision",
  },
  {
    group: "Industrial AI systems",
    question: "How do RAG, embeddings, and semantic search work together?",
    answer: "Embeddings represent meaning as searchable vectors, semantic search finds the most relevant passages or records, and RAG gives a model relevant evidence before it responds. We design the retrieval boundary, source ranking, and citation path so an answer can be inspected instead of treated as an unsupported guess",
    note: "Retrieval quality is part of the product, not a hidden infrastructure detail",
  },
  {
    group: "Industrial AI systems",
    question: "What does a semantic layer add to an AI system?",
    answer: "A semantic layer gives people, models, and agents a shared vocabulary for entities, metrics, relationships, permissions, and business meaning. It helps a system connect a question to the right data and keeps different tools from interpreting the same operation in incompatible ways",
    note: "Shared meaning makes cross-system answers more consistent",
  },
  {
    group: "Industrial AI systems",
    question: "When does a multi-agent system help?",
    answer: "Multiple agents are useful when a workflow has genuinely different specialist responsibilities, tools, or approval boundaries. We use explicit routing, shared context, evaluations, and escalation rules, and keep a single agent when coordination would add more complexity than value",
    note: "More agents are not automatically more intelligence",
  },
  {
    group: "Industrial AI systems",
    question: "What cloud and networking work do you provide?",
    answer: "We design AWS foundations around the workload and its operating boundary, including EC2, Fargate, ECR, Lambda, VPC networking, service permissions, delivery pipelines, and observability. The goal is a cloud system that is easy to reason about, secure to operate, and ready to evolve",
    note: "Cloud architecture is an operating model, not only a list of services",
  },
  {
    group: "Industrial AI systems",
    question: "What does an industrial data pipeline include?",
    answer:
      "A typical pipeline can ingest sensor, production, quality, logistics, and customer events through Kafka, process streams and batches with Flink or Spark, and retain durable data products in MinIO or another object store. We preserve lineage so teams can trace an insight or model input back to its source",
    note: "The data spine should support operations today and learning tomorrow",
  },
  {
    group: "Industrial AI systems",
    question: "What are world models and digital twins used for?",
    answer:
      "World models and digital twins represent the state and behavior of a physical or operational system so teams can estimate current conditions, test interventions, compare possible futures, and understand uncertainty before committing real-world resources",
    note: "Simulation is most valuable when it changes a real decision",
  },
  {
    group: "Delivery and trust",
    question: "Do your AI systems replace existing industrial controllers?",
    answer:
      "Not by default. A conservative architecture usually keeps the existing controller or operating system in place. The learned system evaluates context and candidate actions, estimates value and risk, and either recommends an action or falls back to the established baseline and human authority",
    note: "Intelligence can advise the loop without becoming an uncontrolled replacement",
  },
  {
    group: "Delivery and trust",
    question: "How does a project begin?",
    answer:
      "We begin by identifying the people, decision, friction, available signals, operating constraints, and desired outcome. From there we define the smallest useful prototype, the evidence needed to evaluate it, and the boundary between automatic behavior and human judgment",
    note: "Start with one consequential loop that can be observed and tested",
  },
  {
    group: "Delivery and trust",
    question: "What does an initial engagement deliver?",
    answer:
      "A first engagement may produce a research map, service blueprint, interface prototype, design system, working product slice, MCP server, agent evaluation harness, memory design, pipeline architecture, decision benchmark, or world-model experiment. The deliverable is chosen to reduce the most important uncertainty",
    note: "The first result should make the next investment easier to judge",
  },
] as const;

const groups = [
  "Studio and partnerships",
  "Product and interfaces",
  "Industrial AI systems",
  "Delivery and trust",
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Our Platform product design and industrial AI FAQ",
  url: `${siteUrl}/ai-seo-faq`,
  dateModified: "2026-08-11",
  about: [
    "Product design",
    "UI and UX design",
    "Industrial AI systems",
    "MCP servers",
    "Agent harnesses",
    "Long-term memory",
    "Industrial data pipelines",
    "World models",
    "Digital twins",
    "AI visibility engineering",
    "RAG",
    "Embeddings",
    "Semantic search",
    "Semantic layers",
    "Multi-agent systems",
    "AWS cloud architecture",
    "EC2",
    "Fargate",
    "ECR",
    "Lambda",
    "VPC networking",
  ],
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const capabilityMap = [
  {
    number: "01",
    title: "Experience",
    body: "Web, product, voice, and conversational interfaces",
    accent: "border-t-orange",
  },
  {
    number: "02",
    title: "Information",
    body: "Events, pipelines, memory, and durable context",
    accent: "border-t-blue",
  },
  {
    number: "03",
    title: "Intelligence",
    body: "Tools, agents, decisions, models, and simulation",
    accent: "border-t-green",
  },
] as const;

export default function AiSeoFaqPage() {
  return (
    <div className="min-h-screen bg-cream text-text-primary dark:bg-charcoal dark:text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header className="border-b border-border px-6 dark:border-border-dark">
        <nav
          className="mx-auto flex h-20 max-w-[1280px] items-center justify-between"
          aria-label="FAQ navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="Our Platform home"
          >
            <LogoMark />
            <span className="font-semibold tracking-tight">Our Platform</span>
          </Link>
          <Link
            href="/#contact"
            className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
          >
            Start a project
          </Link>
        </nav>
      </header>
      <main>
        <section className="relative overflow-hidden border-b border-border px-6 py-20 dark:border-border-dark md:py-28">
          <div className="absolute inset-0 bg-grid-light opacity-70 dark:bg-grid-dark" />
          <div className="absolute -right-24 top-16 h-80 w-80 rounded-full bg-orange/10 blur-3xl" />
          <div className="relative mx-auto max-w-[1280px]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-orange"
            >
              Back to the platform
            </Link>
            <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-orange">
                  Questions before we build
                </p>
                <h1 className="mt-4 max-w-4xl text-[clamp(3.4rem,8vw,7.5rem)] font-black leading-[.86] tracking-[-0.07em]">
                  One studio
                  <br />
                  <span className="text-orange">from interface</span>
                  <br />
                  to operation
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
                  Clear answers about what we design, how the systems fit
                  together, and where human judgment stays in the loop
                </p>
              </div>
              <div className="border-l border-orange/50 pl-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  What makes us different
                </p>
                <p className="mt-4 text-2xl font-medium leading-9">
                  We treat the interface, data, model, agent, and operating
                  outcome as one connected design problem
                </p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  Product design · Industrial intelligence
                </p>
              </div>
            </div>
            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border dark:border-border-dark dark:bg-border-dark sm:grid-cols-3">
              {capabilityMap.map(({ number, title, body, accent }) => (
                  <div
                    key={title}
                    className={`border-t-2 bg-cream p-5 dark:bg-charcoal-light ${accent}`}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">
                      {number} · {title}
                    </p>
                    <p className="mt-3 text-sm font-semibold">{body}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-8 lg:self-start">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
                Question index
              </p>
              <nav
                className="mt-5 border-l border-border dark:border-border-dark"
                aria-label="FAQ topics"
              >
                {groups.map((group, index) => (
                  <a
                    key={group}
                    href={`#${group.toLowerCase().replaceAll(" ", "-")}`}
                    className="flex items-center gap-3 border-l-2 border-transparent px-4 py-3 text-sm text-text-secondary transition-colors hover:border-orange hover:text-orange"
                  >
                    <span className="font-mono text-[9px] text-text-muted">
                      0{index + 1}
                    </span>
                    {group}
                  </a>
                ))}
              </nav>
              <div className="mt-10 rounded-2xl bg-charcoal p-5 text-white dark:bg-charcoal-light">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">
                  Machine-readable by design
                </p>
                <p className="mt-5 text-sm font-semibold">
                  Built for people and agents
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  The same clear structure that helps a person evaluate our work
                  also helps an AI system represent it accurately
                </p>
              </div>
            </aside>
            <div>
              {groups.map((group, groupIndex) => (
                <section
                  key={group}
                  id={group.toLowerCase().replaceAll(" ", "-")}
                  className="scroll-mt-10 border-t border-border py-10 first:border-t-0 first:pt-0 dark:border-border-dark"
                >
                  <div className="mb-7 flex items-baseline justify-between gap-4">
                    <h2 className="text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                      {group}
                    </h2>
                    <span className="font-mono text-[10px] text-text-muted">
                      0{groupIndex + 1} / 04
                    </span>
                  </div>
                  <div className="divide-y divide-border border-y border-border dark:divide-border-dark dark:border-border-dark">
                    {faqs
                      .filter((item) => item.group === group)
                      .map((item, index) => (
                        <details key={item.question} className="group">
                          <summary className="flex cursor-pointer list-none items-start gap-5 py-6 focus-visible:outline-orange">
                            <span className="mt-1 font-mono text-[9px] text-orange">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="flex-1 text-xl font-medium leading-7 tracking-[-0.02em] md:text-2xl">
                              {item.question}
                            </span>
                            <span className="mt-1 shrink-0 font-mono text-lg leading-none text-text-muted" aria-hidden="true">
                              <span className="group-open:hidden">+</span>
                              <span className="hidden group-open:inline">−</span>
                            </span>
                          </summary>
                          <div className="grid gap-6 pb-8 pl-10 md:grid-cols-[1fr_240px]">
                            <p className="max-w-3xl text-base leading-8 text-text-secondary">
                              {item.answer}
                            </p>
                            <div className="border-l border-orange/50 pl-4">
                              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">
                                Working principle
                              </p>
                              <p className="mt-3 text-xs font-medium leading-5">
                                {item.note}
                              </p>
                            </div>
                          </div>
                        </details>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
        <section className="border-y border-border bg-charcoal px-6 py-20 text-white dark:border-border-dark dark:bg-charcoal-light md:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-orange">
                The connected system
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                From first signal to useful outcome
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border-l border-blue/60 pl-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-blue">01 / Physical system</p>
                <p className="mt-4 text-sm font-semibold">Physical lifecycle</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Site, production, quality, logistics, customer, feedback
                </p>
              </div>
              <div className="border-l border-green/60 pl-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-green">02 / Intelligence</p>
                <p className="mt-4 text-sm font-semibold">AI lifecycle</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Events, state, model, tool, decision, monitoring, learning
                </p>
              </div>
              <div className="border-l border-orange/60 pl-4 sm:col-span-2">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">03 / Governance</p>
                <p className="mt-4 text-sm font-semibold">Human authority</p>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Clear ownership, approval boundaries, evidence, and baseline
                  fallback
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-20 md:py-28">
          <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-8 rounded-[2rem] border border-border bg-cream-dark/60 p-8 dark:border-border-dark dark:bg-charcoal-light/50 md:flex-row md:items-end md:p-12">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
                Start with the real question
              </p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
                We will make the next decision clearer
              </h2>
            </div>
            <Link
              href="/#contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-dark"
            >
              Start the conversation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
