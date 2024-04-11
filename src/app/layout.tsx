import UIProvider from "@/providers/UIProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import LayoutProvider from "@/providers/LayoutProvider";
export const metadata: Metadata = {
  title: "Sheyoverflow-N | Dev",
  description:
    "Questions and answers for professional and enthusiast programmers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <UIProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </UIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
