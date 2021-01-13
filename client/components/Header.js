import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
      <div>
        <Link href="/login">
          <a className="bg-red-500 px-5 py-3 rounded text-white font-bold mr-2">
            Iniciar Sesion
          </a>
        </Link>
        <Link href="/crear-cuenta">
          <a className="bg-black px-5 py-3 rounded text-white font-bold">
            Crear Cuenta
          </a>
        </Link>
      </div>
    </header>
  );
};
export default Header;
