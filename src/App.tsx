import React from "react";
import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/layouts/App";
import Foods from "./pages/Foods";
import Dash from "./pages/App";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";
import Orders from "./pages/Orders";
import { QueryClient, QueryClientProvider } from "react-query";
import Users from "./pages/Users";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/orders" component={Orders} />
          <Redirect from="/app" to="/foods" />
          <Route path="/foods" component={Foods} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={EditProfile} />
          <Route path="/users" component={Users} />
        </Switch>
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
