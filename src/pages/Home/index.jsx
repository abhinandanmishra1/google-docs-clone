import { DocumentTemplates } from "../../components/DocumentTemplates";
import { DocuemntListing } from "../../components/DocumentsListing";
import { Header } from "../../components/Header";

export const Home = () => {
  return <div>
    <Header />
    <DocumentTemplates />
    <DocuemntListing />
  </div>;
};
