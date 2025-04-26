"use client";
import {
  DistrictsProvider,
  FiltersProvider,
  LoadingProvider,
  PlacesProvider,
  HousesProvider,
} from "@/contexts";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, useUser, RedirectToSignUp } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <RedirectToSignUp />;
  }

  return (
    <LoadingProvider>
      <DistrictsProvider>
        <PlacesProvider>
          <HousesProvider>
            <FiltersProvider>{children}</FiltersProvider>
          </HousesProvider>
        </PlacesProvider>
      </DistrictsProvider>
    </LoadingProvider>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ClerkProvider localization={ptBR} afterSignOutUrl="/">
          <AppProviders>{children}</AppProviders>
        </ClerkProvider>
      </body>
    </html>
  );
}
