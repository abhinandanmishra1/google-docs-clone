import { useEffect } from "react";

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