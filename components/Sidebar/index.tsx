"use client";

import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";
import AuthenticatedSidebar from "./AuthenticatedSidebar";
import { useAppSelector } from "@/redux/hooks";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.value);

  const { id } = user;

  if (!id) {
    return <UnAuthenticatedSidebar />;
  }

  return <AuthenticatedSidebar />;
};

export default Sidebar;
