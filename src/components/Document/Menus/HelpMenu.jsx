import { HelpOutlineOutlined, Search } from "@mui/icons-material";
import { MenuLayout } from "../../../blocks/Menu";

import { DropdownNestedMenuItem } from "../../../blocks/Menu";
import { Kbd } from "../../../blocks/KeyboardCommand";

export const HelpMenu = () => {
  return (
    <>
      <MenuLayout
        name="Help"
        items={[
          <DropdownNestedMenuItem
            label="Search the menus"
            leftIcon={<Search />}
            rightIcon={<Kbd>Alt+/</Kbd>}
          />,
          <DropdownNestedMenuItem
            label="Help"
            leftIcon={<HelpOutlineOutlined />}
            rightIcon={null}
          />,
        ]}
      />
    </>
  );
};
