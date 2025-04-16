import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types/user.type";

type UserStateType = {
  value: UserType;
};

const initialState: UserStateType = {
  value: {
    _count: {
      followers: 0,
      followings: 0,
      posts: 0,
    },
    bio: "",
    clerkId: "",
    createdAt: "",
    email: "",
    id: "",
    image: "",
    location: "",
    name: "",
    updatedAt: "",
    username: "",
    website: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserType>) => {
      state.value = action.payload;
    },
    resetUser: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
