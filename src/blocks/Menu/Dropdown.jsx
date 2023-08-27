import * as React from "react";
import styled from "@emotion/styled";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NestedMenuItem from "./NestedMenuItem";
import { Paper } from "@mui/material";

export const Dropdown = React.forwardRef(
  (
    {
      trigger,
      menu,
      keepOpen: keepOpenGlobal,
      isOpen: controlledIsOpen,
      onOpen: onControlledOpen,
      minWidth,
    },
    ref
  ) => {
    const [isInternalOpen, setInternalOpen] = React.useState(null);

    const isOpen = controlledIsOpen || isInternalOpen;

    let anchorRef = React.useRef(null);
    if (ref) {
      anchorRef = ref;
    }

    const handleOpen = (event) => {
      event.stopPropagation();

      if (menu.length) {
        onControlledOpen
          ? onControlledOpen(event.currentTarget)
          : setInternalOpen(event.currentTarget);
      }
    };

    const handleClose = (event) => {
      event.stopPropagation();

      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      handleForceClose();
    };

    const handleForceClose = () => {
      onControlledOpen ? onControlledOpen(null) : setInternalOpen(null);
    };

    const renderMenu = (menuItem, index) => {
      const { keepOpen: keepOpenLocal, ...props } = menuItem.props;

      let extraProps = {};
      if (props.menu) {
        extraProps = {
          parentMenuOpen: isOpen,
        };
      }

      return React.createElement(menuItem.type, {
        ...props,
        key: index,
        ...extraProps,
        onClick: (event) => {
          event.stopPropagation();

          if (!keepOpenGlobal && !keepOpenLocal) {
            handleClose(event);
          }

          if (menuItem.props.onClick) {
            menuItem.props.onClick(event);
          }
        },
        children: props.menu
          ? React.Children.map(props.menu, renderMenu)
          : props.children,
      });
    };

    return (
      <>
        {React.cloneElement(trigger, {
          onClick: isOpen ? handleForceClose : handleOpen,
          ref: anchorRef,
        })}
        <Paper sx={{ minWidth: minWidth ?? 0 }}>
          <Menu anchorEl={isOpen} open={!!isOpen} onClose={handleClose}>
            {React.Children.map(menu, renderMenu)}
          </Menu>
        </Paper>
      </>
    );
  }
);

export const StyledMenuItem = styled(MenuItem)`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  gap: 8px;
  width: auto;
  min-width: 200px;
`;

export const DropdownNestedMenuItem = styled(NestedMenuItem)`
  display: flex;
  justify-content: space-between !important;
`;

export const DropdownMenuItem = ({
  children,
  onClick,
  leftIcon = null,
  rightIcon = null,
  ...props
}) => {
  return (
    <StyledMenuItem onClick={onClick} {...props}>
      {leftIcon && (
        <>
          {React.cloneElement(leftIcon, {
            className: "text-gray-light",
            style: {
              fontSize: 18,
            },
          })}
        </>
      )}
      <label className="text-sm"> {children}</label>
      <div style={{ flexGrow: 1 }} />
      {rightIcon && (
        <>
          {React.cloneElement(rightIcon, {
            className: "text-gray-light",
            style: {
              fontSize: 18,
            },
          })}
        </>
      )}
    </StyledMenuItem>
  );
};
