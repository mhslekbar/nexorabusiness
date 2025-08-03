import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  users: [],
  error: []
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    statusUserStart: (state) => {
      state.isFetching = true;
      state.error = [];
    },
    statusUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload || [];
      state.error = [];
    },
    statusUserFailure: (state, action) => {
      state.isFetching = false;
      if(action.payload[0]?.startsWith("AFFICHER")) {
        state.users = [];
      }
      state.error = action.payload || [];
    }
  }
});

export const { statusUserStart, statusUserSuccess, statusUserFailure } = userSlice.actions;

export default userSlice.reducer;
