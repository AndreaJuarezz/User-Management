// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
// Importa la configuración desde el archivo centralizado 'lib/auth.ts'
// Ajusta la ruta si tu alias es diferente (@/) o no usas alias.
import { authOptions } from "@/lib/auth";

// Usa la configuración importada para crear los handlers GET y POST
const handler = NextAuth(authOptions);

// Exporta los handlers necesarios para NextAuth
export { handler as GET, handler as POST };
