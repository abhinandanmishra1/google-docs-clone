import React from "react";
import { DocumentPreview } from "./DocumentPreview";

export const DocumentListView = ({ data: documents }) => {
  return (
    <div className="mt-2 h-full min-h-[400px]">
      {documents?.map((document) => {
        return <DocumentPreview document={document} key={document.id} />;
      })}
    </div>
  );
};
