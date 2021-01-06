import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import Math from "./Chapters/MathOperations";
import ReactChildren from "./Chapters/ReactChildren";
import ReactReturnType from "./Chapters/ReactReturnType";

setTimeout(() => Prism.highlightAll(), 0);

const App = () => (
  <Router>
    <Switch>
      <Route path="/math">
        <Math />
      </Route>
      <Route path="/typed-react-children">
        <ReactChildren />
      </Route>
      <Route path="/react-return-type">
        <ReactReturnType />
      </Route>
    </Switch>
  </Router>
);

export default App;
