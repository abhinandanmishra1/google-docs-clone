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
import { Kbd } from "../../../blocks/KeyboardCommand";
import { useDocumentContext } from "../DocumentContex";
import { useCreateDocumentMutation, useExportDocumentToPdfMutation } from "../../../service";

export const FileMenu = () => {
  const { document } = useDocumentContext();

  const onSuccess = (data) => {
    window.open(`/document/${data.id}`, '_blank');
  }

  const onError = (error) => {
    console.log(error);
  }

  const createDocumentMutation = useCreateDocumentMutation(onSuccess, onError);
  const createPdfMutation = useExportDocumentToPdfMutation();

  const createNewDocument = () => {
    createDocumentMutation.mutate();
  }

  const makeACopy = () => {
    createDocumentMutation.mutate({
      name: `Copy of ${document?.name}`,
      data: document?.data || {}
    });
  }

  const exportToPdf = () => {
    createPdfMutation.mutate(document?.id);
  }

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
              <DropdownMenuItem onClick={createNewDocument}>
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
            rightIcon={<Kbd>CTRL+O</Kbd>}
            leftIcon={<FolderOpen />}
          />,
          <DropdownNestedMenuItem
            label="Make a copy"
            leftIcon={<ContentCopy />}
            rightIcon={null}
            onClick={makeACopy}
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
              <DropdownMenuItem onClick={() => {}}>
                Microsoft word document(.docx)
              </DropdownMenuItem>,
              <DropdownMenuItem onClick={exportToPdf}>
                PDF documemt(.pdf)
              </DropdownMenuItem>,
            ]}
          />,
        ]}
      />
    </>
  );
};
