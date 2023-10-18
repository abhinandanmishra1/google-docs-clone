import {
  HistoryRounded,
  LockOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Modal,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDocumentContext } from "../Document/DocumentContex";
import { useNotificationContext } from "../../context/NotificationProvider";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getAxios } from "../../service";

export const ShareModal = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    role: "VIEW",
    email: "",
  });

  const { setMessage, setType, openNotification } = useNotificationContext();

  const toggleModal = () => {
    setIsModalOpen((open) => !open);
  };

  const { data: shareData } = useQuery({
    queryKey: ["document", id, "users"],
    queryFn: async () => {
      const { data } = await getAxios().get(`documents/${id}/users`);

      return data;
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: async () => {
      await getAxios().patch(`documents/${id}/users`, data);
    },
    onSuccess: () => {
      setMessage("Role updated!");
      setType("success");
      openNotification();
      toggleModal();
    },
    onError: () => {
      setMessage("Failed to update role!");
      setType("error");
      openNotification();
    },
  });

  const shareDocument = () => {
    if (!data.email || !data.role) {
      setMessage("Please fill all fields!");
      setType("error");
      openNotification();
      return;
    }

    updateUserRoleMutation.mutateAsync({});
  };

  const sharedWithEveryOne = shareData?.sharedWithEveryOne;
  const users = shareData?.users;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setMessage("Link copied!");
    setType("success");
    openNotification();
  };

  const { name } = useDocumentContext();

  return (
    <>
      <div className="relative z-40 flex gap-2">
        <IconButton>
          <HistoryRounded className="text-gray-light" />
        </IconButton>
        <div className="md:hidden">
          <IconButton sx={{ background: "#b5d1ffc4" }}>
            <PersonAddOutlined className="text-gray-light" />
          </IconButton>
        </div>
        <div className="hidden md:flex bg-[#b5d1ffc4] items-center p-1 rounded-full">
          <Button
            sx={{ color: "#5F6368", px: "8px", py: "4px" }}
            startIcon={
              <LockOutlined className="text-gray-light" sx={{ margin: 0 }} />
            }
            onClick={toggleModal}
            className="capitalize"
          >
            Share
          </Button>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            height: 400,
            width: 500,
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
            variant="p"
            fontSize={24}
            sx={{ margin: 0, padding: 0 }}
          >
            Share "{name}"
          </Typography>
          <div className="flex gap-2">
            <TextField
              sx={{
                flexGrow: 2,
              }}
              placeholder="Add people"
              type="email"
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.role}
              label="Role"
              onChange={(e) => setData({ ...data, role: e.target.value })}
            >
              <MenuItem value={"VIEW"}>Viewer</MenuItem>
              <MenuItem value={"EDIT"}>Editor</MenuItem>
              <MenuItem value={"ADMIN"}>Admin</MenuItem>
            </Select>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            People with access
          </Typography>

          <Box>
            {(users || []).map((user) => {
              return (
                <div
                  key={user.email}
                  className="flex items-center justify-between hover:bg-gray-lighter cursor-pointer rounded-lg p-2"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={user.picture}
                      alt="user profile"
                      className="rounded-full w-[32px] h-[32px]"
                    />
                    <div className="flex flex-col">
                      <Typography variant="p" fontSize={14}>
                        {user.name}
                      </Typography>
                      <Typography variant="p" fontSize={14}>
                        {user.email}
                      </Typography>
                    </div>
                  </div>
                  <p className="text-gray-light text-base capitalize">
                    {user.role}
                  </p>
                </div>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 1,
              color: "#888",
              position: "fixed",
              bottom: 14,
              width: "87%",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                borderColor: "#888",
                borderRadius: "880px",
              }}
              onClick={copyLink}
            >
              Copy Link
            </Button>
            <Button
              disabled={!data.email}
              variant="contained"
              color="primary"
              onClick={shareDocument}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
