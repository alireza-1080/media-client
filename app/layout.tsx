import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/NavBar";
import Sidebar from "@/components/Sidebar";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Media",
  description: "Media is a social media platform for sharing images and videos.",
  creator: "Alireza Aberoumand",
  authors: [
    {
      name: "Alireza Aberoumand",
    },
  ],
  keywords: ["social media", "image sharing", "video sharing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <div className="min-h-screen">
                <NavBar />
                <main className="py-8">
                  <div className="mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                      <div className="hidden lg:col-span-3 lg:block">
                        <Sidebar />
                      </div>
                      <div className="lg:col-span-9">{children}</div>
                    </div>
                  </div>
                </main>
              </div>
            </ThemeProvider>
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
