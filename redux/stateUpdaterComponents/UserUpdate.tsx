"use client";
import { useAppDispatch } from "@/redux/hooks";
import { updateUser } from "@/redux/slices/user.slice";
import { UserType } from "@/types/user.type";

const UserUpdate = ({ userData }: { userData: UserType }) => {
  const dispatch = useAppDispatch();
  dispatch(updateUser(userData));

  return null;
};

export default UserUpdate;
