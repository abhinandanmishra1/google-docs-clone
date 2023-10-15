import { useParams } from "react-router-dom";
import { useDocumentContext } from "../components/Document/DocumentContex";
import { useEffect, useState } from "react";

export const useDocumentLoad = (editor, socket, setEditorDisabled) => {
  const { id: documentId } = useParams();
  const { setName } = useDocumentContext();

  useEffect(() => {
    if (socket === null || editor === null) return;

    socket?.on("load-document", ({ document, role }) => {
      editor?.setContents(document.data);
      setName(document.name);
      if (role == "admin" || role == "editor") {
        console.log(role, document)
        editor?.enable();
        setEditorDisabled(false);
      }
    });

    socket?.emit("get-document", documentId);
  }, [socket, documentId]);
};

export const useTinyDocumentLoad = (editor, socket, setEditorDisabled) => {
  const { id: documentId } = useParams();

  const { setName } = useDocumentContext();

  useEffect(() => {
    if (socket === null || editor === null) return;

    socket?.on("load-document", ({ document, role }) => {
      console.log("loaded", { document, role });
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
