"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNavbar from "./MobileNavbar";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const hideLayout = pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <div className="flex flex-col min-h-screen   ">
 {!hideLayout && <Navbar  />}
      {!hideLayout && <MobileNavbar />}
      <main className="flex-grow ">{children}</main>
      {!hideLayout && <Footer />}
    </div>
  );
}
