import React, { FC } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prism from "prismjs";
import {
  Arrays,
  Math,
  ReactChildren,
  ReactReturnType,
  CompareArguments,
  RangeNumbers,
  RecursiveTypes,
  Tuples,
  UnionArray,
  CallbackChain,
  PubSub,
  TypeState,
  Api,
} from "./Chapters";
import Home from "./Shared/Home";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { Navigation } from "./Shared/Layout";

setTimeout(() => Prism.highlightAll(), 0);

const App = () => (
  <Router>
    <Navigation>
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
        <Route path="/tuples">
          <Tuples />
        </Route>
        <Route path="/union-array">
          <UnionArray />
        </Route>
        <Route path="/callback-chain">
          <CallbackChain />
        </Route>
        <Route path="/handle-arrays">
          <Arrays />
        </Route>
        <Route path="/publish-subscribe">
          <PubSub />
        </Route>
        <Route path="/type-state">
          <TypeState />
        </Route>
        <Route path="/api">
          <Api />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Navigation>
  </Router>
);

export default App;
