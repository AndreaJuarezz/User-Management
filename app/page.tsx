"use client";

import AuthButtons from "./components/AuthButtons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Role } from "@prisma/client";

export default function Home() {
  const { data: session, status } = useSession();

  const renderMainContent = () => {
    if (status === "loading") {
      return (
        <p className="text-center text-gray-500 dark:text-gray-400">
          Cargando sesión...
        </p>
      );
    }

    if (session) {
      return (
        <div className="text-center lg:text-left space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            ¡Bienvenido, {session.user?.name || session.user?.email}!
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Has iniciado sesión correctamente.
          </p>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-sm space-y-1">
            <p>
              <strong>Email:</strong> {session.user?.email}
            </p>
            <p>
              <strong>ID Usuario:</strong> {session.user?.id}
            </p>
            <p>
              <strong>Rol:</strong>{" "}
              <span
                className={`px-2 py-0.5 rounded font-medium text-xs ${
                  session.user?.role === Role.ADMIN
                    ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }`}
              >
                {session.user?.role}
              </span>
            </p>
          </div>
          {session.user?.role === Role.ADMIN && (
            <Link href="/admin">
              <span className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700 cursor-pointer">
                Ir al Panel de Admin
              </span>
            </Link>
          )}
        </div>
      );
    }

    return (
      <div className="text-center lg:text-left space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Bienvenido al Gestor de Usuarios
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Por favor, inicia sesión o regístrate para continuar.
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-lg font-bold text-gray-800 dark:text-white">
            Mi App
          </div>
          <div>
            <AuthButtons />
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
        {renderMainContent()}
      </main>

      <footer className="bg-white dark:bg-gray-800 py-4 mt-auto border-t dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Creado por Andrea Guadalupe Juarez Nava. Todos los derechos
          reservados.
        </div>
      </footer>
    </div>
  );
}