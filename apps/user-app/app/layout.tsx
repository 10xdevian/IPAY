import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User App",
  description: "user App for Paytm wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          {children} <Toaster position="top-center" reverseOrder={false} />
        </body>
      </Providers>
    </html>
  );
}
