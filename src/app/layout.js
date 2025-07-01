// src/app/layout.tsx yoki layout.js

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { ReduxProvider } from "./provider";
import LayoutWrapper from "@/components/LayoutWrapper";
import ClientWrapper from "./ClientWrapper";
import { ToastContainer } from "react-toastify";
import 'react-phone-input-2/lib/style.css';
import SplashScreen from "@/components/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ixlos magnit",
  description: "Ixlos magnit online savdo do'koni"
};

export default function RootLayout({ children }) {
  return (
  <html>
    <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
    </head>
     <body className={`${geistSans.variable} ${geistMono.variable}`}>
  <ReduxProvider>
    <ClientWrapper>
      {children}
      <ToastContainer/>
    </ClientWrapper>
  </ReduxProvider>
</body>
  </html>

  );
}
