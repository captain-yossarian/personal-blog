import React, { VFC, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Prism from "prismjs";
import {
  MathOperations,
  ReactChildren,
  ReactReturnType,
  CompareArguments,
  RangeNumbers,
  Tuples,
  UnionArray,
  Callbacks,
  PubSub,
  TypeState,
  Api,
  Unions,
  TemplateLiterals,
} from "./Chapters";
import { About, Contact, Home } from "./Sections";
import { blogArticles, sections } from "./Layout/structure";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { Main } from "./Layout";
import ArticleBase from "./Shared/ArticleBase";

export const componentMap = {
  MathOperations,
  ReactChildren,
  ReactReturnType,
  CompareArguments,
  RangeNumbers,
  Tuples,
  UnionArray,
  Callbacks,
  PubSub,
  TypeState,
  Api,
  About,
  Contact,
  Home,
  Unions,
  TemplateLiterals,
};

setTimeout(() => Prism.highlightAll(), 0);

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

const merged = Object.assign(blogArticles, sections);

const map = Object.entries(merged);

fetch("/hey", {
  //  method: "GET", // *GET, POST, PUT, DELETE, etc.
  // mode: "no-cors", // no-cors, *cors, same-origin
}).then((response) => response.json());

const App: VFC = () => (
  <Router>
    <Main>
      <ScrollToTop />
      <Switch>
        {map.map(([pth, { Comp }]) => {
          const Component = componentMap[Comp as keyof typeof componentMap];
          const path = (pth as any) as keyof typeof merged;

          return (
            <Route path={path} key={path}>
              <ArticleBase path={path} {...merged[path]}>
                <Component />
              </ArticleBase>
            </Route>
          );
        })}
      </Switch>
    </Main>
  </Router>
);

export default App;
