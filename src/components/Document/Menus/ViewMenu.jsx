import { MenuLayout } from "../../../blocks/Menu";
import {
  Check,
  Edit,
  Fullscreen,
  RateReviewOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";

import { Box, Button, Link } from "@mui/material";
import ArrowRight from "@mui/icons-material/ArrowRight";

import { DropdownMenuItem, DropdownNestedMenuItem } from "../../../blocks/Menu";
import { Kbd } from "../../../blocks/KeyboardCommand";
import { cloneElement, useState } from "react";

const Icon = ({ element, visible }) => {
  if (visible) {
    return cloneElement(element, {
      className: "text-gray-light",
      style: {
        fontSize: 18,
      },
    });
  }

  return <div style={{ width: 18, heigh: 18 }}></div>;
};

export const ViewMenu = () => {
  const [view, setView] = useState({
    mode: "view",
    showPrintLayout: false,
    showRuler: false,
    showOutline: false,
    fullScreen: false,
  });

  const onToggle = (name, value) => {
    if (!value) {
      setView((curr) => ({
        ...curr,
        [name]: !curr[name],
      }));

      return;
    }

    setView((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  console.log(view);
  return (
    <>
      <MenuLayout
        name="View"
        items={[
          <DropdownNestedMenuItem
            label="Mode"
            leftIcon={<Edit />}
            menu={[
              <DropdownMenuItem
                leftIcon={<Edit />}
                onClick={() => onToggle("mode", "edit")}
                className={`${view.mode === "edit" ? "bg-gray-dark" : ""}`}
              >
                Editing
              </DropdownMenuItem>,
              <DropdownMenuItem
                leftIcon={<RateReviewOutlined />}
                onClick={() => onToggle("mode", "suggest")}
                className={`${view.mode === "suggest" ? "bg-gray-dark" : ""}`}
              >
                Suggesting
              </DropdownMenuItem>,
              <DropdownMenuItem
                leftIcon={<VisibilityOutlined />}
                onClick={() => onToggle("mode", "view")}
                className={`${view.mode === "view" ? "bg-gray-dark" : ""}`}
              >
                Viewing
              </DropdownMenuItem>,
            ]}
          />,
          <DropdownMenuItem
            leftIcon={
              <Icon element={<Check />} visible={view.showPrintLayout} />
            }
            name="showPrintLayout"
            onClick={() => onToggle("showPrintLayout")}
          >
            Show print layout
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<Icon element={<Check />} visible={view.showRuler} />}
            name="showRuler"
            onClick={() => onToggle("showRuler")}
          >
            Show ruler
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<Icon element={<Check />} visible={view.showOutline} />}
            name="showOutline"
            rightIcon={
              <>
                <Kbd>CTRL+ALT+A</Kbd>
              </>
            }
            onClick={() => onToggle("showOutline")}
          >
            Show outline
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<Icon element={<Check />} visible={view.fullScreen} />}
            name="fullScreen"
            onClick={() => onToggle("fullScreen")}
          >
            Full screen
          </DropdownMenuItem>,
        ]}
      />
    </>
  );
};
