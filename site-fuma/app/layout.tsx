import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  description: "Developer documentation for the SavvyCal Appointments API",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://developers.savvycal.app"),
  title: {
    default: "SavvyCal Appointments",
    template: "%s | SavvyCal Appointments",
  },
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html className={inter.className} lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider search={{ options: { api: "/search" } }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
