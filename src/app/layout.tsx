import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/Navbar";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daan Dapp",
  description:
    "Transparent, decentralized charitable giving powered by blockchain technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <ThirdwebProvider>
          <Navbar/>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
