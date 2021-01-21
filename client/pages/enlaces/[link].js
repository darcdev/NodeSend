import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import clientAxios from "../../config/axios";
import Alert from "../../components/Alert";
import appContext from "../../context/app/appContext";
export async function getServerSideProps({ params }) {
  const { link } = params;
  const result = await clientAxios.get(`/api/enlaces/${link}`);
  return {
    props: {
      link: result.data,
    },
  };
}
export async function getServerSidePaths() {
  const links = await clientAxios.get("/api/enlaces");
  return {
    paths: links.data.enlaces.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

const Link = ({ link }) => {
  const AppContext = useContext(appContext);
  const { showAlert, message_file } = AppContext;

  const [havePassword, setHavePassword] = useState(link.password);
  const [password, setPassword] = useState("");

  const verifyPassword = async (e) => {
    e.preventDefault();

    const data = {
      password,
    };

    try {
      const result = await clientAxios.post(`/api/enlaces/${link.link}`, data);
      console.log(result);
      setHavePassword(result.data.password);
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  };
  return (
    <Layout>
      {havePassword ? (
        <>
          <p className="text-center">
            Este enlace esta protegido con una contraseña , colocalo a
            continuación
          </p>
          {message_file && <Alert />}
          <div className="container mx-auto">
            <div className="flex justify-center mt-5">
              <div className="w-full max-w-lg">
                <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-black text-sm font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="text"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                    value="Validar Password"
                    onClick={verifyPassword}
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${link.archivo}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Aqui
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Link;
