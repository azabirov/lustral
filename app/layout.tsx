import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { HeroProvider } from "@/context/HeroContext";
import { ProductProvider } from "@/context/ProductContext";
import SearchOverlay from "@/components/ui/SearchOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUSTRAL | Премиальное освещение",
  description: "Магазин дизайнерских люстр и светильников",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased flex flex-col min-h-screen font-sans`}
      >
        <AuthProvider>
          <CartProvider>
            <HeroProvider>
              <ProductProvider>
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
                <SearchOverlay />
              </ProductProvider>
            </HeroProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
