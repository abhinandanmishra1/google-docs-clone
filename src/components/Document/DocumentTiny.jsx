import React from "react";
import { DocumentHeader } from "../Header";
import { useUserContext } from "../../context/UserContext";
import { DocumentProvider } from "./DocumentContex";
import { Editor } from "./TextEditor/Editor";
import { EditorTinyProvider } from "../../context/useTinyEditorContext";

export const DocumentTiny = () => {
  const { user, loading } = useUserContext();

  if (loading) return <>Loading.......</>;

  return (
    <DocumentProvider>
      <EditorTinyProvider>
        <div className="w-full relative">
          <DocumentHeader user={user} />
          <Editor />
        </div>
      </EditorTinyProvider>
    </DocumentProvider>
  );
};
