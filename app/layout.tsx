import type { Metadata } from "next";
import "./globals.css";
import { fontConfig } from "@/src/shared/config/font-config";
import { Providers } from "./providers";
import { Header } from "@/src/widgets/header";
import { Flex } from "@/src/shared/ui/primitives/flex/flex";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "ExTest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontConfig.className}>
        <Flex center col className={styles.main}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </Flex>
      </body>
    </html>
  );
}
