import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import AppLayout from "./components/layouts/App";
function App() {
  return (
    <div className="App">
      <AppLayout>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </AppLayout>
    </div>
  );
}

export default App;
