import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "../../docs.css";
import "../../css/toolbar.css";
import "../../css/editor.css";

import "./styles.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useDocumentContext } from "../Document/DocumentContex";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }, { size: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "blockquote", "code-block"],
  [{ direction: "rtl" }],
];

export const TextEditor = () => {
  const [editorDisabled, setEditorDisabled] = useState(true);
  const [socket, setSocket] = useState();
  const [editor, setEditor] = useState();

  const { name, setName } = useDocumentContext();

  const { id: documentId } = useParams();

  useEffect(() => {
    if (socket === null || editor === null) return;

    socket?.on("load-document", (document) => {
      editor?.setContents(document.data);
      setName(document.name);
      editor?.enable();
      setEditorDisabled(false);
    });

    socket?.emit("get-document", documentId);
  }, [socket, documentId]);

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

  useEffect(() => {
    const socket = io.connect(import.meta.env.VITE_DOCS_SERVER_BASE_URL);

    socket?.on("connect", () => {});

    setSocket(socket);

    return () => {
      socket?.disconnect();
    };
  }, []);

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return;

    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const quillEditor = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
      },
    });

    quillEditor?.disable();
    setEditor(quillEditor);
  }, []);

  useEffect(() => {
    if (socket === null || editor === null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;

      const data = {
        data: delta,
      };

      socket?.emit("send-changes", data);
    };

    editor?.on("text-change", handler);

    return () => {
      editor?.off("text-change", handler);
    };
  }, [socket, editor]);

  useEffect(() => {
    if (socket === null || editor === null) return;

    const data = {
      name,
    };

    socket?.emit("send-changes", data);
    socket?.emit("save-document", data);
  }, [name]);

  useEffect(() => {
    if (socket === null || editor === null) return;

    const handler = (document) => {
      if (document.data) editor?.updateContents(document.data);

      if (document.name) setName(document.name);
    };

    socket?.on("recieve-changes", handler);

    return () => {
      socket?.off("recieve-changes", handler);
    };
  }, [socket, editor]);

  return (
    <div className="w-full flex justify-center bg-white">
      <div
        className="bg-[#fff] editor w-[98%] m-2 border min-h-screen h-auto"
        id="editor"
        ref={wrapperRef}
      ></div>
    </div>
  );
};
