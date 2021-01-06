import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prism from "prismjs";
import Math from "./Chapters/MathOperations";
import ReactChildren from "./Chapters/ReactChildren";
import ReactReturnType from "./Chapters/ReactReturnType";
import CompareArguments from "./Chapters/CompareArguments";
import RangeNumbers from "./Chapters/RangeNumbers";
import RecursiveTypes from "./Chapters/RecursiveTypes";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";

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
      <Route path="/compare-arguments">
        <CompareArguments />
      </Route>
      <Route path="/range-numbers">
        <RangeNumbers />
      </Route>
      <Route path="/recursive-types">
        <RecursiveTypes />
      </Route>
    </Switch>
  </Router>
);

export default App;
