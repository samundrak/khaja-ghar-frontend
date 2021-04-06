import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../../api";
import { AuthStateStatus } from "../../../enums/AuthStateEnum";
import { RequestLoading } from "../../../enums/RequestLoadingEnum";
import { AuthState } from "../../../interfaces/IAuthState";

const initialState: AuthState = {
  user: null,
  loading: RequestLoading.IDLE,
  currentRequestId: null,
  status: AuthStateStatus.NONE,
};

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkApi) => {
    const user = await getCurrentUser();
    thunkApi.dispatch(actions.setAuth(user.data));
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload;
    },
  },
});
const { reducer, actions } = authSlice;
export default reducer;
