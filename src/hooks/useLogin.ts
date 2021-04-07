import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { login } from "../api";
import { fetchProfile } from "../store/slices/auth";

const useLogin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginFunc = React.useCallback(
    async (username, password) => {
      const response = await login({
        password: password,
        email: username,
      });
      window.localStorage.setItem("token", response.data.token);
      dispatch(fetchProfile());
      history.push("/app");
    },
    [dispatch, history]
  );

  return loginFunc;
};

export default useLogin;
