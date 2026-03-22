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
