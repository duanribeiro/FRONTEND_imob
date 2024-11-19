import { ClerkProvider } from "@clerk/nextjs"; // Importando ClerkProvider
import { ptBR } from "@clerk/localizations";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider localization={ptBR} afterSignOutUrl="/">
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
