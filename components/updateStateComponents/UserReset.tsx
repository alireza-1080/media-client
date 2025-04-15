"use client";
import { resetUser } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/hooks";

const UserReset = () => {
  const dispatch = useAppDispatch();
  dispatch(resetUser());

  return <></>;
};

export default UserReset;
