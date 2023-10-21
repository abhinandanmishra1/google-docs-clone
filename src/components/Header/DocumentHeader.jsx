import {
  Apps,
  CloudDoneOutlined,
  Description,
  DriveFileMoveOutlined,
  HistoryRounded,
  LockOutlined,
  PersonAddOutlined,
  StarOutline,
} from "@mui/icons-material";
import { Box, Button, IconButton, Input, styled } from "@mui/material";
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
import { useNavigate } from "react-router-dom";
import { useDocumentContext } from "../Document/DocumentContex";
import { ShareModal } from "../ShareModal";
import { UserPopover } from "../UserPopover";

const StyledInput = styled(Input)({
  padding: 0,
});
export const DocumentHeader = ({ user }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { name, setName, users, role } = useDocumentContext();

  const clearQuery = () => {
    setQuery("");
  };

  return (
    <section className="flex justify-between p-[8px] bg-white gap-[10px] items-center">
      <div className="flex grow-0 items-center flex-none">
        <Description
          className="text-blue-light relative z-40 cursor-pointer"
          style={{
            width: "48px",
            height: "48px",
          }}
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex grow flex-col gap-1">
        <div className="flex items-center relative z-40">
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
              disabled={role === "none" || role === "viewer"}
            />
          </Box>
          <div className="hidden md:flex">
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
        </div>
        <div className="flex gap-1" hidden style={{ display: "none" }}>
          <FileMenu />
          <EditMenu />
          <ViewMenu />
          <InsertMenu />
          <ToolsMenu />
          <ExtensionsMenu />
          <HelpMenu />
        </div>
      </div>
      <div className="flex relative z-40">
        {users.map((user) => {
          return (
            <div key={crypto.randomUUID()} className="h-[24px] w-[24px]">
              <img
                src={user?.picture}
                alt={user?.name}
                className="rounded-full"
              />
            </div>
          );
        })}
      </div>
      <ShareModal />
      <Show iff={!!user}>
        <div className="hidden md:flex gap-[24px] items-center flex-none relative z-40">
          <IconButton>
            <Apps className="text-gray-light h-[12px] w-[18px]" />
          </IconButton>
          <UserPopover />
        </div>
      </Show>
      <Show iff={!user}>Login</Show>
    </section>
  );
};
