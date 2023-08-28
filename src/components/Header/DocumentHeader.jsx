import {
  Apps,
  Clear,
  CloudDoneOutlined,
  Description,
  DriveFileMoveOutlined,
  Menu,
  Search,
  Star,
  StarOutline,
} from "@mui/icons-material";
import { Box, IconButton, Input, TextField, styled } from "@mui/material";
import { useState } from "react";
import { Show } from "../../blocks/Show";
import {
  EditMenu,
  ExtensionsMenu,
  FileMenu,
  HelpMenu,
  InsertMenu,
  ToolsMenu,
  ViewMenu,
} from "../Document/Menus";
import { Navigate, useNavigate } from "react-router-dom";
import { useDocumentContext } from "../Document/DocumentContex";

const StyledInput = styled(Input)({
  padding: 0,
});
export const DocumentHeader = ({ user }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { name, setName } = useDocumentContext();

  const clearQuery = () => {
    setQuery("");
  };

  return (
    <section className="flex justify-between p-[8px] bg-white gap-[10px] items-center">
      <div className="flex grow-0 items-center flex-none">
        <Description
          className="text-blue-light"
          style={{
            width: "48px",
            height: "48px",
          }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex grow flex-col gap-1">
        <div className="flex items-center">
          <Box
            sx={{
              width: "170px",
              "& .MuiInput-root": {
                border: 1,
                borderColor: "white",
                borderRadius: "4px",
                fontSize: "18px",
                minHeight: 0,
                padding: "1px 6px",
                height: 32,
                ":before": {
                  content: "none",
                },
                ":after": {
                  content: "none",
                },
                ":hover": {
                  borderColor: "gray",
                },
              },
            }}
          >
            <StyledInput
              placeholder="Untitled Document"
              className="border-0"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Box>
          <IconButton>
            <StarOutline
              className="text-gray-light"
              style={{
                fontSize: 18,
              }}
            />
          </IconButton>
          <IconButton>
            <DriveFileMoveOutlined
              className="text-gray-light"
              style={{
                fontSize: 18,
              }}
            />
          </IconButton>
          <IconButton>
            <CloudDoneOutlined
              className="text-gray-light"
              style={{
                fontSize: 18,
              }}
            />
          </IconButton>
        </div>
        <div className="flex gap-1">
          <FileMenu />
          <EditMenu />
          <ViewMenu />
          <InsertMenu />
          <ToolsMenu />
          <ExtensionsMenu />
          <HelpMenu />
        </div>
      </div>
      <Show iff={!!user}>
        <div className="flex gap-[24px] items-center flex-none">
          <IconButton>
            <Apps className="text-gray-light h-[12px] w-[18px]" />
          </IconButton>
          <img
            src="https://lh3.googleusercontent.com/ogw/AGvuzYYBpM3NJSU_Y0XbxRh4u5nH3nOXs7IzUSfhL_ovTA=s32-c-mo"
            alt="user"
            className="rounded-full"
          />
        </div>
      </Show>
      <Show iff={!user}>Login</Show>
    </section>
  );
};
