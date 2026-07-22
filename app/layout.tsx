import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { LocaleProvider } from '@/lib/i18n/LocaleProvider';
import Navbar from '@/components/ui/Navbar';
import T from '@/components/i18n/T';
import JsonLd from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/site';

const DESCRIPTION = "A searchable Mi'gmaq–English–French dictionary, guided lessons, illustrated storybooks, and games for learning the Mi'gmaq language.";

// globals.css declares --font-sans: 'Inter' and --font-display: 'Playfair
// Display' as Tailwind theme tokens, but nothing ever loaded either font —
// the whole site silently fell back to system-ui/serif. next/font
// self-hosts both (no external request, no FOUT/FOIT) and exposes them as
// CSS variables that globals.css's tokens reference instead of bare family
// names.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DESCRIPTION,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
};

export const viewport: Viewport = {
  themeColor: '#f59e0b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE_NAME,
            url: SITE_URL,
            description: DESCRIPTION,
            potentialAction: {
              '@type': 'SearchAction',
              target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/dictionary?q={search_term_string}` },
              'query-input': 'required name=search_term_string',
            },
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: SITE_NAME,
            url: SITE_URL,
            description: DESCRIPTION,
          }}
        />
      </head>
      <body className="antialiased transition-colors">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:border-2 focus:border-foreground focus:font-bold focus:uppercase"
        >
          <T ns="common" k="skipToContent" />
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LocaleProvider>
            <Navbar />
            <div id="main-content">{children}</div>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
