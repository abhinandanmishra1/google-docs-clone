import { MenuLayout } from "../../../blocks/Menu";
import { Description, KeyboardVoiceOutlined } from "@mui/icons-material";

import { AiOutlineFileSearch } from "react-icons/ai";

import { DropdownMenuItem, DropdownNestedMenuItem } from "../../../blocks/Menu";

export const ToolsMenu = () => {
  return (
    <>
      <MenuLayout
        name="Tools"
        items={[
          <DropdownNestedMenuItem
            label="Word count"
            rightIcon={null}
            leftIcon={<Description />}
          />,
          <DropdownNestedMenuItem
            label="Word count"
            rightIcon={null}
            leftIcon={<AiOutlineFileSearch />}
          />,
          <DropdownNestedMenuItem
            label="Voice typing"
            rightIcon={null}
            leftIcon={<KeyboardVoiceOutlined />}
          />,
        ]}
      />
    </>
  );
};
