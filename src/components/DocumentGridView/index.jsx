import React from "react";
import { DocumentPreview } from "./DocumentPreview";

export const DocumentGridView = () => {
  return (
    <div className="mt-2 flex gap-[10px] flex-wrap">
      <DocumentPreview />
      <DocumentPreview />
      <DocumentPreview />
      <DocumentPreview />
      <DocumentPreview />
      <DocumentPreview />
    </div>
  );
};
