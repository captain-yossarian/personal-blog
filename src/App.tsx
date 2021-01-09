import React, { VFC, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
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
import { About, Contact, Home } from "./Sections";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { Main } from "./Layout";

setTimeout(() => Prism.highlightAll(), 0);

const map = Object.entries({
  "/math": Math,
  "/typed-react-children": ReactChildren,
  "/react-return-type": ReactReturnType,
  "/compare-arguments": CompareArguments,
  "/range-numbers": RangeNumbers,
  "/recursive-types": RecursiveTypes,
  "/tuples": Tuples,
  "/union-array": UnionArray,
  "/callback-chain": CallbackChain,
  "/handle-arrays": Arrays,
  "/publish-subscribe": PubSub,
  "/type-state": TypeState,
  "/api": Api,
  "/about": About,
  "/contact": Contact,
  "/": Home,
});

const ScrollToTop = withRouter(({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return null;
});

const App: VFC = () => (
  <Router>
    <Main>
      <ScrollToTop />
      <Switch>
        {map.map(([path, Comp]) => (
          <Route path={path} key={path}>
            <Comp />
          </Route>
        ))}
      </Switch>
    </Main>
  </Router>
);

export default App;
