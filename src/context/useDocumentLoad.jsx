import { useParams } from "react-router-dom";
import { useDocumentContext } from "../components/Document/DocumentContex";
import { useEffect } from "react";

export const useTinyDocumentLoad = (editor, socket) => {
  const { id: documentId } = useParams();

  const { setName } = useDocumentContext();

  useEffect(() => {
    if (socket === null || editor === null) return;

    socket?.on("load-document", ({ document, role }) => {
      editor?.setContent(document.data);
      setName(document.name);
    });

    socket?.emit("get-document", documentId);
  }, [socket, editor,  documentId]);
};
