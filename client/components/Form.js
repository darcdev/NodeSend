import React, { useContext, useState } from "react";
import appContext from "../context/app/appContext";

const Form = () => {
  const [isPassword, setIsPassword] = useState(false);

  const AppContext = useContext(appContext);
  const { addPassword, addDownloads } = AppContext;

  return (
    <div className="w-full mt-20">
      <label className="text-lg text-gray-800">Eliminar tras</label>
      <div>
        <select
          className="appearance-none w-full mt-2 bg-white  border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
          onChange={(e) => addDownloads(parseInt(e.target.value))}
        >
          <option value="" defaultValue disabled>
            -- Seleccione --
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <label className="text-lg text-gray-800">
            Proteger con contraseña
          </label>
          <input type="checkbox" onChange={() => setIsPassword(!isPassword)} />
        </div>

        {isPassword && (
          <input
            type="password"
            className="appearance-none w-full mt-2 bg-white  border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500"
            placeholder="Contraseña"
            onChange={(e) => addPassword(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
