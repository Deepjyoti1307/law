import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { AnimatedBackground } from "@/components/ui/animated-background";

export const metadata: Metadata = {
  title: "LexConnect - AI-Augmented Legal Consultation Platform",
  description: "Connect with verified lawyers anytime, anywhere. AI-powered legal assistance, secure consultations, and comprehensive case management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased text-white">
        <Providers>
          <AnimatedBackground>
            <main className="flex-1 min-h-screen">
              {children}
            </main>
            <Footer />
          </AnimatedBackground>
        </Providers>
      </body>
    </html>
  );
}

