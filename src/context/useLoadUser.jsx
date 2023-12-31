import { useEffect, useState } from "react";
import { useDocumentContext } from "../components/Document/DocumentContex";
import { useUserContext } from "./UserContext";

export const useLoadUser = (socket) => {
  const { setUsers } = useDocumentContext();
  const { user: currentUser } = useUserContext();

  useEffect(() => {
    if (socket === null) return;

    socket?.on("load-user", (user) => {
      if (!user || user?.id === currentUser?.id) return;

      setUsers((prev) => [...prev, user]);

      socket?.emit("update-me");
    });

    socket?.on("recieve-me", (user) => {
      if (!user) return;
      setUsers((prev) => [...prev, user]);
    });

    socket?.on("remove-me", (user) => {
      if (!user) return;
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    })
  }, [socket]);
};
