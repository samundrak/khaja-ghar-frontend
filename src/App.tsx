import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/layouts/App";
import Foods from "./pages/Foods";
import Dash from "./pages/App";
import Register from "./pages/Register";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/app" component={Dash} />
          <Route path="/foods" component={Foods} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={EditProfile} />
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
