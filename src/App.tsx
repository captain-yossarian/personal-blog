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
  CallbackChain,
  FlattenUnion,
  UnionPartial,
  Dates,
  TypeNegation,
  HexValidation,
  LinkedList,
  OOP,
  FP,
  DeepPick,
  Validation,
  Mutations,
  ReactProps,
} from "./Chapters";
import { About, Contact, Home } from "./Sections";
import { blogArticles, sections } from "./Layout/structure";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { Main } from "./Layout";
import ArticleBase from "./Shared/ArticleBase";
import { tracker } from "@wunu/frontend";

tracker("https://api.catchts.com").subscribe();

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
  CallbackChain,
  FlattenUnion,
  UnionPartial,
  Dates,
  TypeNegation,
  HexValidation,
  LinkedList,
  OOP,
  FP,
  DeepPick,
  Validation,
  Mutations,
  ReactProps,
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

const toUnix = (date: string) => new Date(date).getTime();

const data = blogArticles
  .sort((prev, next) => toUnix(prev.date) - toUnix(next.date))
  .reverse()
  //@ts-expect-error
  .concat(sections);
const App: VFC = () => {
  return (
    <Router>
      <Main>
        <ScrollToTop />
        <Switch>
          {data.map((elem) => {
            const { url, Comp } = elem;
            const Component = componentMap[Comp as keyof typeof componentMap];

            return (
              <Route path={url} key={url}>
                <ArticleBase path={url} {...elem}>
                  <Component />
                </ArticleBase>
              </Route>
            );
          })}
        </Switch>
      </Main>
    </Router>
  );
};

export default App;
