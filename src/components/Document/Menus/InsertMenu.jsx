import { MenuLayout } from "../../../blocks/Menu";
import {
  AddOutlined,
  AddToDrive,
  Dashboard,
  Description,
  DrawOutlined,
  DriveEtaOutlined,
  FileOpen,
  FileUploadOutlined,
  FolderOpen,
  FunctionsOutlined,
  HorizontalRuleOutlined,
  Image,
  ImageOutlined,
  LibraryBooks,
  PlusOneOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import { LiaGoogleDrive } from "react-icons/lia";

import { Box, Button, Link } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { DropdownMenuItem, DropdownNestedMenuItem } from "../../../blocks/Menu";

export const InsertMenu = () => {
  return (
    <>
      <MenuLayout
        name="Insert"
        items={[
          <DropdownNestedMenuItem
            label="Image"
            leftIcon={<ImageOutlined />}
            menu={[
              <DropdownMenuItem leftIcon={<FileUploadOutlined />}>
                Upload from computer
              </DropdownMenuItem>,
              <DropdownMenuItem leftIcon={<SearchOutlined />}>
                Search the web
              </DropdownMenuItem>,
            ]}
          />,
          <DropdownNestedMenuItem
            label="Drawing"
            leftIcon={<DrawOutlined />}
            menu={[
              <DropdownMenuItem leftIcon={<AddOutlined />}>
                New
              </DropdownMenuItem>,
              <DropdownMenuItem leftIcon={<LiaGoogleDrive />}>
                From drive
              </DropdownMenuItem>,
            ]}
          />,
          <DropdownNestedMenuItem
            label="Horizontal line"
            leftIcon={<HorizontalRuleOutlined />}
            rightIcon={null}
          />,
          <DropdownNestedMenuItem
            label="Equation"
            leftIcon={<FunctionsOutlined />}
            rightIcon={null}
          />,
        ]}
      />
    </>
  );
};
