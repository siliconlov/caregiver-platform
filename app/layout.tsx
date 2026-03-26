import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import AuthProvider from "./components/AuthProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CareBridge | Eldercare Dashboard",
  description: "Comprehensive platform for sole earners to care for their aging parents across cities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
        <AuthProvider>
          <div className="app-container">
            <Sidebar />
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
