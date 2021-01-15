import React, { useEffect, useContext } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";

const Header = () => {
  const AuthContext = useContext(authContext);
  const { user, signout, authenticateUser } = AuthContext;

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
      <div>
        {user ? (
          <>
            <div className="flex items-center">
              <p className="mr-2">Hola {user.name}</p>
              <button
                onClick={signout}
                type="button"
                className="bg-black px-5 py-3 rounded text-white font-bold"
              >
                Cerrar Sesion
              </button>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
