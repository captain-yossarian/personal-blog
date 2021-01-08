import React, { FC, useEffect } from "react";
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
import Home from "./Shared/Home";
import About from "./Shared/About";
import Contact from "./Shared/Contact";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { Navigation } from "./Shared/Layout";

setTimeout(() => Prism.highlightAll(), 0);

const map = {
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
};

const keys = Object.keys(map);

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

const App = () => (
  <Router>
    <Navigation>
      <ScrollToTop />
      <Switch>
        {(keys as (keyof typeof map)[]).map((elem) => {
          const Comp = map[elem];
          return (
            <Route path={elem}>
              <Comp />
            </Route>
          );
        })}
      </Switch>
    </Navigation>
  </Router>
);

export default App;
