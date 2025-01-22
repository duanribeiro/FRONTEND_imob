import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Excluir a rota "/radar/<id>"
    "/((?!radar/.*|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Sempre executar para rotas de API
    "/(api|trpc)(.*)",
  ],
};
