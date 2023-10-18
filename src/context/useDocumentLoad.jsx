import { useParams } from "react-router-dom";
import { useDocumentContext } from "../components/Document/DocumentContex";
import { useEffect, useState } from "react";

export const useTinyDocumentLoad = (editor, socket, setEditorDisabled) => {
  const { id: documentId } = useParams();

  const { setName } = useDocumentContext();

  useEffect(() => {
    if (socket === null || editor === null) return;

    socket?.on("load-document", ({ document, role }) => {
      editor?.setContent(document.data);
      setEditorDisabled(true);
      setName(document.name);
      if (role == "admin" || role == "editor") {
        setEditorDisabled(false);
      }
    });

    socket?.emit("get-document", documentId);
  }, [socket, editor,  documentId]);
};
