import { Navigate } from "react-router-dom";
import { DocumentTemplates } from "../../components/DocumentTemplates";
import { DocuemntListing } from "../../components/DocumentsListing";
import { Header } from "../../components/Header";
import { useUserContext } from "../../context/UserContext";
import { Loading } from "../../common";

export const Home = () => {
  const { user, loading } = useUserContext();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="min-h-screen h-full">
      <Header user={user} />
      <DocumentTemplates />
      <DocuemntListing />
    </div>
  );
};
