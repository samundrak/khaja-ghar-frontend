import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import auth from "./middlewares/auth";
import rootReducer from "./reducers";

export type RootState = ReturnType<typeof rootReducer>;
const middleware = [...getDefaultMiddleware<RootState>()];
const isDev = process.env.NODE_ENV === "development";

export default function configureAppStore(preloadedState = {}) {
  const store = configureStore({
    preloadedState,
    devTools: isDev,
    reducer: rootReducer,
    middleware,
  });

  // HMR support
  // @ts-ignore
  if (isDev && module.hot) {
    // @ts-ignore
    module.hot.accept("./reducers", () => {
      const newRootReducer = require("./reducers").default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
}
