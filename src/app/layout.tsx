import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProvider } from '@/lib/theme-context';
import '@/styles/globals.css';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001').replace(/\/$/, '');
const siteName = 'Saddle Orchestrate Systems';
const siteDescription =
  'An industrial AI systems studio designing context-aware decisions, agent infrastructure, data pipelines, long-term memory, world models, and digital twins';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Saddle Orchestrate Systems | Industrial Agentic AI Portfolio',
    template: '%s | Saddle Orchestrate Systems',
  },
  description: siteDescription,
  keywords: [
    'industrial AI systems', 'context-aware decision making', 'MCP servers', 'agent harnesses', 'long-term memory',
    'industrial data pipelines', 'Apache Kafka', 'Apache Flink', 'Apache Spark', 'MinIO', 'world models', 'digital twins', 'RAG', 'embeddings', 'semantic search', 'semantic layer', 'multi-agent systems', 'AWS cloud architecture', 'EC2', 'Fargate', 'ECR', 'Lambda', 'VPC networking',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName,
    title: 'Saddle Orchestrate Systems | Industrial Agentic AI Portfolio',
    description: siteDescription,
    locale: 'en_US',
    images: [
      {
        url: '/assets/hero/connection-background.webp',
        width: 1672,
        height: 941,
        alt: 'Human and robotic hands connecting through light and technology',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saddle Orchestrate Systems | Industrial Agentic AI Portfolio',
    description: siteDescription,
    images: ['/assets/hero/connection-background.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: { icon: '/icon.svg' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  areaServed: 'Worldwide',
  serviceType: ['Digital product design', 'Conversational AI interfaces', 'Voice interfaces', 'Workflow automation', 'Industrial AI systems', 'Industrial data pipelines', 'Grounded knowledge systems', 'Multi-agent orchestration', 'Cloud and networking', 'World models and digital twins'],
  knowsAbout: [
    'Web experiences', 'Conversational AI', 'Voice interfaces', 'Connected workflows', 'Content systems',
    'Context-aware decision making', 'MCP server design', 'Agent harnesses', 'Long-term memory', 'Grounded knowledge systems', 'RAG', 'Embeddings', 'Semantic search', 'Semantic layers', 'Multi-agent systems', 'Industrial agentic systems',
    'Apache Kafka', 'Apache Flink', 'Apache Spark', 'MinIO', 'AWS', 'Amazon EC2', 'AWS Fargate', 'Amazon ECR', 'AWS Lambda', 'VPC networking', 'World models', 'Digital twins',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="theme-color" content="#FAF7F2" />
        <Script id="theme-init" strategy="beforeInteractive">
          {`(() => { try { const saved = localStorage.getItem('theme'); const dark = saved === 'dark' || (saved !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches); if (dark) document.documentElement.classList.add('dark'); } catch {} })();`}
        </Script>
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Fonts are kept as a simple hosted fallback for this prototype. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
