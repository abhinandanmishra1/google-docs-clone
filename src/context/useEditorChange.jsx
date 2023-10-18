import { useCallback, useEffect, useState } from "react";
import { useDocumentContext } from "../components/Document/DocumentContex";

export const useTinyEditorChange = (
  editor,
  socket,
) => {
  const { name, setName } = useDocumentContext();

  // recieving changes from socket
  useEffect(() => {
    if (socket === null || editor === null) return;

    const handler = (document) => {
      if (document?.data && document?.data !== editor?.getContent()) {
        const bookmark = editor?.selection.getBookmark(2, true);
        editor?.setContent(document.data, { no_events: true });
        editor?.selection.moveToBookmark(bookmark);
      }

      if (document?.name) setName(document.name);
    };

    socket?.on("recieve-changes", handler);

    return () => {
      socket?.off("recieve-changes", handler);
    };
  }, [socket, editor]);

  // sending changes through socket
  const onEditorChange = useCallback(
    (editorData) => {
      const data = {
        data: editorData,
      };

      socket?.emit("send-changes", data);
    },
    [socket]
  );

  useEffect(() => {
    if (socket === null || editor === null) return;

    const data = {
      name,
    };

    socket?.emit("send-changes", data);
    socket?.emit("save-document", data);
  }, [name]);

  return {
    onEditorChange,
  };
};
