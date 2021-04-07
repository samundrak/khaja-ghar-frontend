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
    try {
      thunkApi.dispatch(actions.setAuthStatus(AuthStateStatus.PENDING));
      const user = await getCurrentUser();
      thunkApi.dispatch(actions.setAuth(user.data));
      thunkApi.dispatch(actions.setAuthStatus(AuthStateStatus.SUCCESS));
    } catch (err) {
      thunkApi.dispatch(actions.setAuthStatus(AuthStateStatus.REJECTED));
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload;
    },
    setAuthStatus(state, action) {
      state.status = action.payload;
    },
  },
});
const { reducer, actions } = authSlice;
export default reducer;
