import {
  DeleteOutlined,
  FormatSizeOutlined,
  MoreVert,
  OfflinePinOutlined,
  OpenInNewOutlined,
} from "@mui/icons-material";
import React from "react";

import { DropdownMenuItem, MenuLayout } from "../Menu";
import {
  useExportDocumentToPdfMutation,
  useUpdateDocumentMutation,
  useDeleteDocumentMutation,
  getAxios,
} from "../../service";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useUserContext } from "../../context/UserContext";
import { useQuery } from "react-query";

export const MoreButton = ({ document = {} }) => {
  const { user } = useUserContext();

  const [renameModalOpen, setRenameModalOpen] = React.useState(false);
  const [name, setName] = React.useState(document?.name);

  const { data } = useQuery({
    queryKey: ["documentRole", document.id],
    queryFn: async () => {
      const { data } = await getAxios().get(`/access/${document.id}/role`, {
        params: {
          user: user?.id,
        },
      });

      return data;
    },
    enabled: !!user && !!document,
  });

  const toggleModal = () => {
    setRenameModalOpen((isOpen) => !isOpen);
  };

  const isEditDisabled =
    !data || data?.role === "none" || data?.role === "viewer";

  const { id } = document;
  const exportToPdfMutation = useExportDocumentToPdfMutation();
  const deleteDocumentMutation = useDeleteDocumentMutation();
  const updateDocumentMutation = useUpdateDocumentMutation(id, toggleModal);

  const onRemove = () => {
    deleteDocumentMutation.mutate(id);
  };

  const openInNewTab = () => {
    window.open(`/document/d/${id}`, "_blank");
  };

  const exportToPdf = () => {
    // exportToPdfMutation.mutate(id);
  };

  const onNameUpdate = () => {
    updateDocumentMutation.mutate({
      name,
    });
  };

  return (
    <>
      <MenuLayout
        name={<MoreVert />}
        items={[
          <DropdownMenuItem
            leftIcon={<FormatSizeOutlined style={{ fontSize: 16 }} />}
            onClick={toggleModal}
            disabled={isEditDisabled}
          >
            Rename
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<DeleteOutlined style={{ fontSize: 16 }} />}
            onClick={onRemove}
            disabled={isEditDisabled}
          >
            Remove
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<OpenInNewOutlined style={{ fontSize: 16 }} />}
            onClick={openInNewTab}
          >
            Open in new tab
          </DropdownMenuItem>,
          <DropdownMenuItem
            leftIcon={<OfflinePinOutlined style={{ fontSize: 16 }} />}
            onClick={exportToPdf}
          >
            Available offline
          </DropdownMenuItem>,
        ]}
      />
      <Modal
        open={renameModalOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            height: 250,
            width: 400,
            flexGrow: 1,
            background: "#fff",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 4,
            borderRadius: 1,
            boxShadow: 24,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ margin: 0, padding: 0 }}
          >
            Rename
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, color: "#888" }}
          >
            Please enter a new name for the item:
          </Typography>
          <TextField
            defaultValue={document.name}
            sx={{
              width: "100%",
              "& fieldset": {
                padding: 0,
              },
              "& input": {
                padding: 1,
              },
            }}
            onChange={(e) => setName(e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: 1,
              color: "#888",
            }}
          >
            <Button variant="contained" color="primary" onClick={onNameUpdate}>
              Ok
            </Button>
            <Button variant="outlined" color="inherit" onClick={toggleModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
