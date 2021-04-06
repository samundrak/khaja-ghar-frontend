import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/layouts/App";
import Foods from "./pages/Foods";
import Dash from "./pages/App";

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/app" component={Dash} />
          <Route path="/foods" component={Foods} />
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
