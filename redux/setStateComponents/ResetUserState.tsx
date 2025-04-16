"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { resetUser } from "../slices/userSlice";

const ResetUserState = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetUser());
  }, [dispatch]);

  return <></>;
};

export default ResetUserState;
