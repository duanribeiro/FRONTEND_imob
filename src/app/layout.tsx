import { ClerkProvider } from "@clerk/nextjs"; 
import { ptBR } from "@clerk/localizations";
import "./globals.css";

export const metadata = {
  icons: {
    icon: [
      { url: '/assets/favicon-light.ico', media: '(prefers-color-scheme: light)' },
      { url: '/assets/favicon-dark.ico', media: '(prefers-color-scheme: dark)' },
    ],
  },
}


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
