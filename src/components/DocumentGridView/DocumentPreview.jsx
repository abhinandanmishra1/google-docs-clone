import { Article, MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export const DocumentPreview = () => {
  return (
    <div className="w-[210px] border-[1px] flex flex-col bg-red-50 rounded cursor-pointer hover:border-blue-light">
      <img src="https://lh3.google.com/u/0/d/1H15AwLvTdl7Gg6tdHWg2Ohj7MbK8TCsTpxC4_wQqoEQ=w208-iv3" className="h-[200px] w-full rounded" />
      <div className="flex flex-col p-2">
        <h2 className="text-base text-gray-dark font-medium">Document Name</h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[5px]">
            <Article className="text-blue-light" />
            <p className="text-gray-darker text-sm">Aug 15, 2023</p>
          </div>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
