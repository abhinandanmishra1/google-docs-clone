import React from "react";
import { DocumentHeader } from "../Header";
import { useUserContext } from "../../context/UserContext";
import { DocumentProvider } from "./DocumentContex";
import { TextEditor } from "./TextEditor";

export const Document = () => {
  const { user, loading } = useUserContext();

  if(loading) return 
  return (
    <DocumentProvider>
      <div className="w-full">
        <DocumentHeader user={user} />
        <TextEditor />
      </div>
    </DocumentProvider>
  );
};
