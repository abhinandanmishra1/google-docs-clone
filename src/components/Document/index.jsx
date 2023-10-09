import React from "react";
import { DocumentHeader } from "../Header";
import { useUserContext } from "../../context/UserContext";
import { DocumentProvider } from "./DocumentContex";
import { TextEditor } from "./TextEditor";
import { EditorProvider } from "../../context/useEditorContext";

export const Document = () => {
  const { user, loading } = useUserContext();

  if (loading) return;
  return (
    <DocumentProvider>
      <EditorProvider>
        <div className="w-full">
          <DocumentHeader user={user} />
          <TextEditor />
        </div>
      </EditorProvider>
    </DocumentProvider>
  );
};
