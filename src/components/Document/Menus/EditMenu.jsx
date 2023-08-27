import { MenuLayout } from "../../../blocks/Menu";
import {
  ContentCopyOutlined,
  ContentCutOutlined,
  ContentPasteOutlined,
} from "@mui/icons-material";
import { GrUndo, GrRedo } from "react-icons/gr";

import { Box, Button, Link } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { DropdownMenuItem, DropdownNestedMenuItem } from "../../../blocks/Menu";
import { Kbd } from "../../../blocks/KeyboardCommand";

export const EditMenu = () => {
  return (
    <>
      <MenuLayout
        name="Edit"
        items={[
          <DropdownMenuItem leftIcon={<GrUndo style={{fontSize: 16}} />} rightIcon={<Kbd>CTRL+Z</Kbd>}>
            Undo
          </DropdownMenuItem>,
          <DropdownMenuItem leftIcon={<GrRedo style={{fontSize: 16}} />} rightIcon={<Kbd>CTRL+Y</Kbd>}>
            Redo
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<ContentCutOutlined style={{fontSize: 16}} />}
            rightIcon={<Kbd>CTRL+X</Kbd>}
          >
            Cut
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<ContentCopyOutlined style={{fontSize: 16}} />}
            rightIcon={<Kbd>CTRL+C</Kbd>}
          >
            Copy
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<ContentPasteOutlined style={{fontSize: 16}} />}
            rightIcon={<Kbd>CTRL+V</Kbd>}
          >
            Paste
          </DropdownMenuItem>,
        ]}
      />
    </>
  );
};
