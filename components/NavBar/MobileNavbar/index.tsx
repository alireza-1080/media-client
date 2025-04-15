"use client";
import ThemeToggler from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const MobileNavbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const { isSignedIn } = useAuth();

  return (
    <div className="flex items-center space-x-2 md:hidden">
      <ThemeToggler />

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <MenuIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col space-y-4">
            <Button
              variant={"ghost"}
              className="flex items-center justify-start gap-3"
              asChild
            >
              <Link href={"/"}>
                <HomeIcon className="size-4" />
                Home
              </Link>
            </Button>

            {isSignedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-3"
                  asChild
                >
                  <Link href="/notifications">
                    <BellIcon className="h-4 w-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-3"
                  asChild
                >
                  <Link href="/profile">
                    <UserIcon className="h-4 w-4" />
                    Profile
                  </Link>
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="flex w-full items-center justify-start gap-3"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Logout
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="default" className="mx-auto w-4/5">
                    Sign In
                  </Button>
                </SignInButton>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
