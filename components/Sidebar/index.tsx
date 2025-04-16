import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import UnAuthenticatedSidebar from "./UnAuthenticatedSidebar";
import AuthenticatedSidebar from "./AuthenticatedSidebar";

const Sidebar = async () => {
  const isUserLoggedIn = Boolean(await currentUser());

  if (!isUserLoggedIn) {
    return <UnAuthenticatedSidebar />;
  }

  return <AuthenticatedSidebar />;
};

export default Sidebar;
