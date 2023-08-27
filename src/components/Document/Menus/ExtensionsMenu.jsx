import { DropdownNestedMenuItem, MenuLayout } from "../../../blocks/Menu";
import { PlaylistAddOutlined } from "@mui/icons-material";

export const ExtensionsMenu = () => {
  return (
    <>
      <MenuLayout
        name="Extensions"
        items={[
          <DropdownNestedMenuItem
            label="Add-ons"
            leftIcon={<PlaylistAddOutlined />}
          />,
        ]}
      />
    </>
  );
};
