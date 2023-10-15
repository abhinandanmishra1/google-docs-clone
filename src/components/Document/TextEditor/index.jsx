import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "../../../css/docs.css";
import "../../../css/editor.css";
import "../../../css/toolbar.css";

import "./styles.css";
import { io } from "socket.io-client";
import { Navigate, useParams } from "react-router-dom";
import { useDocumentContext } from "../DocumentContex";
import { useEditorContext } from "../../../context/useEditorContext";
import { Editor } from "./Editor";

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
  const { wrapperRef } = useEditorContext();

  return (
    <div className="w-full flex justify-center bg-white">
      <div
        className="bg-[#fff] editor w-[98%] m-2"
        id="editor"
        ref={wrapperRef}
      ></div>
    </div>
  );
};
