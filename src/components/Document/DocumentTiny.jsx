import React from "react";
import { DocumentHeader } from "../Header";
import { useUserContext } from "../../context/UserContext";
import { DocumentProvider } from "./DocumentContex";
import { Editor } from "./TextEditor/Editor";
import { EditorTinyProvider } from "../../context/useTinyEditorContext";
import { Document } from "./Document";

export const DocumentTiny = () => {
  const { user, loading, role } = useUserContext();

  if (loading) return <>Loading.......</>;

  return (
    <DocumentProvider>
      <EditorTinyProvider>
        <Document />
      </EditorTinyProvider>
    </DocumentProvider>
  );
};
