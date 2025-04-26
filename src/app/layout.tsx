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
};

const customPtBR = {
  ...ptBR,
  signIn: {
    start: {
      title: "Entrar no Radar Imóvel",
      subtitle: "Bem-vindo de volta! Por favor, entre para continuar",
    },
  },
  signUp: {
    start: {
      title: "Criar sua conta",
      subtitle: "Bem-vindo! Preencha os dados para começar",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ClerkProvider localization={customPtBR} afterSignOutUrl="/">
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
