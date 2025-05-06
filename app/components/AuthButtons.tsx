"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center space-x-4 h-9">
        {" "}
        <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
        <div className="h-9 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Hola, {session.user?.name || session.user?.email}!
        </span>
        <button
          onClick={() => signOut()}
          className="px-4 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-900"
        >
          Cerrar Sesión
        </button>
     
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => signIn()}
        className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
      >
        Iniciar Sesión
      </button>

      <Link href="/register">
        <span className="px-4 py-1.5 text-xs font-semibold border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900">
          Registrarse
        </span>
       
      </Link>
    </div>
  );
}
