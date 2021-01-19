import Layout from "../../components/Layout";
import clientAxios from "../../config/axios";

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
  return (
    <Layout>
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
    </Layout>
  );
};

export default Link;
