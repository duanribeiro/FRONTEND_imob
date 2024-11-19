import {
  DistrictsProvider,
  FiltersProvider,
  LoadingProvider,
  PlacesProvider,
} from "@/contexts";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Radar Imóvel",
  description: "",
};

const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <LoadingProvider>
    <DistrictsProvider>
      <PlacesProvider>
        <FiltersProvider>{children}</FiltersProvider>
      </PlacesProvider>
    </DistrictsProvider>
  </LoadingProvider>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
