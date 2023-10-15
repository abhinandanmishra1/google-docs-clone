import { useEffect } from "react";

export const useSaveDocument = (editor, socket, editorDisabled) => {
  useEffect(() => {
    if (socket === null || editor === null) return;

    const interval = setInterval(() => {
      if (editorDisabled) return;

      const document = {
        data: editor?.getContents(),
      };

      socket?.emit("save-document", document);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, editor, editorDisabled]);
};

export const useTinySaveDocument = (editor, socket) => {
  useEffect(() => {
    if (socket === null || editor === null) return;

    const interval = setInterval(() => {
      const document = {
        data: editor?.getContent(),
      };

      socket?.emit("save-document", document);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, editor]);
};