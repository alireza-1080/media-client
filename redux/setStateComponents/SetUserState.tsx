"use client";
import { UserType } from "@/types/user.type";
import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { updateUser } from "../slices/userSlice";

const SetUserState = ({ user }: { user: UserType }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateUser(user));
  }, [dispatch, user]);

  return <></>;
};

export default SetUserState;
