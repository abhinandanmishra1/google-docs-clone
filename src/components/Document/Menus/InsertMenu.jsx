import { MenuLayout } from "../../../blocks/Menu";
import {
  Dashboard,
  Description,
  FileOpen,
  FolderOpen,
  LibraryBooks,
} from "@mui/icons-material";

import { Box, Button, Link } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";

import {
  DropdownMenuItem,
  DropdownNestedMenuItem,
} from "../../../blocks/Menu";

export const InsertMenu = () => {

  return (
    <>
      <MenuLayout
        name="Insert"
        items={[
          <DropdownNestedMenuItem
            label="New"
            rightIcon={<ArrowRight />}
            menu={[
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Document
              </DropdownMenuItem>,
              <DropdownMenuItem>
                <Button
                  component="label"
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                  variant="text"
                >
                  From Markdown file
                  <input
                    id="mdInput"
                    type="file"
                    accept={`.md`}
                    hidden
                    onChange={(e) => {}}
                  />
                </Button>
              </DropdownMenuItem>,
              <DropdownMenuItem>
                <Button
                  component="label"
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                  variant="text"
                >
                  From HTML file
                  <input
                    id="mdInput"
                    type="file"
                    accept={`.html`}
                    hidden
                    onChange={(e) => {}}
                  />
                </Button>
              </DropdownMenuItem>,
            ]}
          />,
          <DropdownNestedMenuItem
            label="Save as"
            rightIcon={<ArrowRight />}
            menu={[
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Markdown
              </DropdownMenuItem>,
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Plain HTML
              </DropdownMenuItem>,
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Styled HTML
              </DropdownMenuItem>,
            ]}
          />,
          <DropdownNestedMenuItem
            label="Export"
            rightIcon={<ArrowRight />}
            menu={[
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                PDF
              </DropdownMenuItem>,
              <DropdownMenuItem
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Github Gist
              </DropdownMenuItem>,
            ]}
          />,
        ]}
      />
    </>
  );
};
