import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./styles.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

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

  const { id: documentId } = useParams();

  useEffect(() => {
    if (socket === null || editor === null) return;

    console.log("inside effect1");

    socket?.on("load-document", (document) => {
      console.log("loaded document", document);
      editor?.setContents(document);
      editor?.enable();
      setEditorDisabled(false);
    });

    socket?.emit("get-document", documentId);
  }, [socket, documentId]);

  useEffect(() => {
    if (socket === null || editor === null) return;

    const interval = setInterval(() => {
      if (editorDisabled) return;

      socket?.emit("save-document", editor?.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, editor, editorDisabled]);

  useEffect(() => {
    const socket = io.connect("http://localhost:5000/");

    socket?.on("connect", () => {
      console.log("connected");
    });

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
      socket?.emit("send-changes", delta);
    };

    editor?.on("text-change", handler);

    return () => {
      editor?.off("text-change", handler);
    };
  }, [socket, editor]);

  useEffect(() => {
    if (socket === null || editor === null) return;

    const handler = (delta) => {
      editor?.updateContents(delta);
    };

    socket?.on("recieve-changes", handler);

    return () => {
      socket?.off("recieve-changes", handler);
    };
  }, [socket, editor]);

  return (
    <div className="bg-[#f3f3f3] editor" id="editor" ref={wrapperRef}></div>
  );
};
