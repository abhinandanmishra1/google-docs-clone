import React from "react";
import { DocumentHeader } from "../Header";
import { TextEditor } from "../TextEditor";
import { useUserContext } from "../../context/UserContext";
import { DocumentProvider } from "./DocumentContex";

export const Document = () => {
  const user = useUserContext();
  return (
    <DocumentProvider>
      <div className="w-full">
        <DocumentHeader user={user} />
        <TextEditor />
      </div>
    </DocumentProvider>
  );
};
