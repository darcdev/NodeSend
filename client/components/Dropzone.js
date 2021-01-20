import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Form from "./Form";

const Dropzone = () => {
  const AppContext = useContext(appContext);
  const { showAlert, uploadFile, loading, createLink } = AppContext;

  const AuthContext = useContext(authContext);
  const { user, authenticate } = AuthContext;

  const onDropRejected = () => {
    showAlert(
      "no se puede subir archivo , limite de 1 mega , obten una cuenta gratis para subir archivos mas grandes"
    );
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    // create formData
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    uploadFile(formData, acceptedFiles[0].path);
  }, []);

  // extract content from dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const files = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 px-3 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{files}</ul>

          {authenticate ? <Form /> : ""}

          {loading ? (
            <p className="my-10 text-center text-gray-600">Subiendo Archivo</p>
          ) : (
            <button
              type="button"
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              onClick={createLink}
            >
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el archivo
            </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona un archivo y arrastralo aquí
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                type="button"
              >
                Selecciona Archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
