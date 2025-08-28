// src/app/layout.js
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "./provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";

import SessionManager from "@/components/SessionManeger";
import ClientWrapper from "./ClientWrapper";
import LayoutWrapper from "@/components/LayoutWrapper";

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
  description: "Ixlos magnit online savdo do'koni",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <head>
        <link rel="icon" href="/images/favicon.jpg" type="image/x-icon" />
        <link rel="shortcut icon" href="/images/favicon.jpg" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
        <meta
          name="google-site-verification"
          content="RzN93L_mMmEbTKPPqm_BOZhV5hmUO_i_j1DQ5whi55M"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <ClientWrapper>
                          <SessionManager />

            <LayoutWrapper>{children}</LayoutWrapper>
          </ClientWrapper>
          <ToastContainer />
        </ReduxProvider>
      </body>
    </html>
  );
}