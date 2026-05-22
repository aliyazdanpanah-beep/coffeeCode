import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/layout/layout";

export const metadata: Metadata = {
  title: "Coffee Corner menu",
  description: "enjody drink coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
