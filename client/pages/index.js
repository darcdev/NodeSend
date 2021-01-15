import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";

const Index = () => {
  const AuthContext = useContext(authContext);
  const { authenticateUser } = AuthContext;

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
};

export default Index;
