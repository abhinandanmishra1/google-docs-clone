import { Navigate } from "react-router-dom";
import { DocumentTemplates } from "../../components/DocumentTemplates";
import { DocuemntListing } from "../../components/DocumentsListing";
import { Header } from "../../components/Header";
import { useUserContext } from "../../context/UserContext";

export const Home = () => {
  const user = useUserContext();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return <div>
    <Header user={user} />
    <DocumentTemplates />
    <DocuemntListing />
  </div>;
};
