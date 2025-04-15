import SyncUserAction from "@/components/actionComponents/SyncUser";
import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import UserReset from "@/redux/stateUpdaterComponents/UserReset";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const DesktopNavbar = async () => {
  const user = await currentUser();

  return (
    <div className="hidden items-center space-x-4 md:flex">
      <ThemeToggler />

      <Button variant={"ghost"} className="flex items-center gap-2" asChild>
        <Link href={"/"}>
          <HomeIcon className="size-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <SyncUserAction />
          <Button variant={"ghost"} className="flex items-center gap-2" asChild>
            <Link href={"/"}>
              <BellIcon className="size-4" />
              <span className="hidden lg:inline">Notification</span>
            </Link>
          </Button>

          <Button variant={"ghost"} className="flex items-center gap-2" asChild>
            <Link
              href={`/profile/${user.username ?? user.primaryEmailAddress?.emailAddress[0].split("@")[0]}`}
            >
              <UserIcon className="size-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <>
          <UserReset />
          <SignInButton mode="modal">
            <Button variant={"default"} className="cursor-pointer">
              Sign In
            </Button>
          </SignInButton>
        </>
      )}
    </div>
  );
};

export default DesktopNavbar;
