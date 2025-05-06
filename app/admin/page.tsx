import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth"; 
import { redirect } from "next/navigation";
import { Role, PrismaClient } from "@prisma/client"; 
import UserList from "./components/UserList"; 

type UserFromDb = {
  id: string;
  name: string; 
  email: string;
  role: Role;
  createdAt: Date;
};

const prisma = new PrismaClient();

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== Role.ADMIN) {
    console.log(
      `Intento de acceso no autorizado a /admin. Usuario: ${session?.user?.email}, Rol: ${session?.user?.role}`
    );
    redirect("/");
  }

  let users: UserFromDb[] = []; 
  try {
    users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <main className="container mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        
        <div className="mt-6 p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Lista de Usuarios Registrados
          </h2>
        
          {users.length > 0 ? (
            <UserList users={users} />
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No se encontraron usuarios.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
