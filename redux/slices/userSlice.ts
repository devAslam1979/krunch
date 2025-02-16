import { User } from "@/app/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  user_id: "",
  name: "",
  phone: "",
  points: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: User | null, action: PayloadAction<User | null>) => {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
