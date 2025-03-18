import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import EcommerceFooter from "./components/ui/ecommercex-footer-ui";
import { CartProvider } from "./contexts/CartContext";
import { CartSidebar } from "./components/ui/product-view-page-ui";

const outfitSans = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

const interMono = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-commerceX",
  description: "FullStack E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body
        className={`${outfitSans.variable} ${interMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          {children}
          <CartSidebar  />
          <EcommerceFooter />
        </CartProvider>
      </body>
    </html>
  );
}
