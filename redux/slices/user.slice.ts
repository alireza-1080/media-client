import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "@/types/user.type";

const initialState: { value: UserType } = {
  value: {
    id: "",
    clerkId: "",
    username: "",
    name: "",
    email: "",
    image: "",
    bio: "",
    location: "",
    website: "",
    createdAt: "",
    updatedAt: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }: { payload: UserType }) => {
      state.value = payload;
    },
    resetUser: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
