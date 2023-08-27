import { MenuLayout } from "../../../blocks/Menu";
import {
  BorderColorOutlined,
  ContentCopy,
  Dashboard,
  Description,
  Download,
  DownloadDoneSharp,
  DownloadForOffline,
  DownloadOutlined,
  Email,
  EmailOutlined,
  FileDownload,
  FileDownloadOutlined,
  FileOpen,
  FolderOpen,
  FormatPaint,
  GroupAddOutlined,
  LibraryBooks,
  ShareOutlined,
  TempleHinduSharp,
} from "@mui/icons-material";

import { Box, Button, Link } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { DropdownMenuItem, DropdownNestedMenuItem } from "../../../blocks/Menu";

export const FileMenu = () => {
  return (
    <>
      <MenuLayout
        name="File"
        items={[
          <DropdownNestedMenuItem
            label="New"
            rightIcon={<ArrowRight />}
            leftIcon={<Description />}
            menu={[
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <div className="flex items-center gap-1">
                  <Description className="text-blue-light" />
                  Document
                </div>
              </DropdownMenuItem>,
              <DropdownMenuItem>
                <div className="flex items-center gap-1">
                  <BorderColorOutlined className="text-gray-light" />
                  Using template
                </div>
              </DropdownMenuItem>,
            ]}
          />,
          <DropdownNestedMenuItem
            label="Open"
            rightIcon={<kbd>CTRL+O</kbd>}
            leftIcon={<FolderOpen />}
          />,
          <DropdownNestedMenuItem
            label="Make a copy"
            leftIcon={<ContentCopy />}
            rightIcon={null}
          />,
          <DropdownNestedMenuItem
            label="Share"
            leftIcon={<GroupAddOutlined />}
            rightIcon={null}
          />,
          <DropdownNestedMenuItem
            label="Email"
            leftIcon={<EmailOutlined />}
            rightIcon={null}
          />,
          <DropdownNestedMenuItem
            label="Download"
            leftIcon={<FileDownloadOutlined />}
            menu={[
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Microsoft word document(.docx)
              </DropdownMenuItem>,
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                PDF documemt(.pdf)
              </DropdownMenuItem>,
            ]}
          />,
        ]}
      />
    </>
  );
};
