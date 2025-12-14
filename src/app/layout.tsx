import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "../components/PostHogProvider";
import Chatbot from "../components/Chatbot";

export const metadata: Metadata = {
  title: "Johnny Kessler",
  description: "Welcome to my personal website! I'm Johnny Kessler, a professional developer from Hamburg, Germany. I like building stuff with software.",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}> 
      {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}
      <body className="bg-black flex items-center justify-center pb-12 px-12 max-w-screen">
        <PostHogProvider>
          {children}
          <Chatbot />
        </PostHogProvider>
      </body>
    </html>
  );
}
