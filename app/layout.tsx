import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foracle — The Font Oracle",
  description: "Discover, compare, and pair 1700+ free fonts",
  openGraph: {
    title: "Foracle — The Font Oracle",
    description: "Discover, compare, and pair 1700+ free fonts",
    siteName: "Foracle",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
            focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg
            focus:bg-[var(--color-accent)] focus:text-[var(--color-bg-primary)]
            focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["dark", "light"]}
          value={{ dark: "", light: "light" }}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
