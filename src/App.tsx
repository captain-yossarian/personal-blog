import React, { VFC, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Prism from "prismjs";
import { blogArticles, sections } from "./Layout/structure";

import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-typescript";
import { Main } from "./Layout";
import ArticleBase from "./Shared/ArticleBase";
import { sort } from "./Sections/Home";

export const componentMap = {
  MathOperations: React.lazy(() => import("./Chapters/MathOperations")),
  ReactChildren: React.lazy(() => import("./Chapters/ReactChildren")),
  ReactReturnType: React.lazy(() => import("./Chapters/ReactReturnType")),
  CompareArguments: React.lazy(() => import("./Chapters/CompareArguments")),
  RangeNumbers: React.lazy(() => import("./Chapters/RangeNumbers")),
  Tuples: React.lazy(() => import("./Chapters/Tuples")),
  UnionArray: React.lazy(() => import("./Chapters/UnionArray")),
  Callbacks: React.lazy(() => import("./Chapters/Callbacks")),
  PubSub: React.lazy(() => import("./Chapters/PubSub")),
  TypeState: React.lazy(() => import("./Chapters/TypeState")),
  Api: React.lazy(() => import("./Chapters/Api")),
  About: React.lazy(() => import("./Sections/About")),
  Contact: React.lazy(() => import("./Sections/Contact")),
  Home: React.lazy(() => import("./Sections/Home")),
  Unions: React.lazy(() => import("./Chapters/Unions")),
  TemplateLiterals: React.lazy(() => import("./Chapters/TemplateLiterals")),
  CallbackChain: React.lazy(() => import("./Chapters/CallbackChain")),
  FlattenUnion: React.lazy(() => import("./Chapters/FlattenUnion")),
  Permutations: React.lazy(() => import("./Chapters/Permutations")),
  Dates: React.lazy(() => import("./Chapters/Dates")),
  TypeNegation: React.lazy(() => import("./Chapters/TypeNegation")),
  HexValidation: React.lazy(() => import("./Chapters/HexValidation")),
  LinkedList: React.lazy(() => import("./Chapters/LinkedList")),
  OOP: React.lazy(() => import("./Chapters/OOP")),
  FP: React.lazy(() => import("./Chapters/FunctionalProgramming")),
  DeepPick: React.lazy(() => import("./Chapters/DeepPick")),
  Validation: React.lazy(() => import("./Chapters/Validations")),
  Mutations: React.lazy(() => import("./Chapters/Mutations")),
  ReactProps: React.lazy(() => import("./Chapters/ReactProps")),
  CurryingComponents: React.lazy(() => import("./Chapters/CurryingComponents")),
  InferFunctionArguments: React.lazy(
    () => import("./Chapters/InferFunctionArguments")
  ),
  PrototypeTyping: React.lazy(() => import("./Chapters/PrototypeTyping")),
  SaferTypes: React.lazy(() => import("./Chapters/SaferTypes")),
  EvenLength: React.lazy(() => import("./Chapters/EvenLength")),
  FlattenTuple: React.lazy(() => import("./Chapters/FlattenTuple")),
  SafeEnum: React.lazy(() => import("./Chapters/SafeEnum")),
  RestTuples: React.lazy(() => import("./Chapters/RestTuples")),
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

const data = sort(blogArticles)
  //@ts-expect-error
  .concat(sections);

const App: VFC = () => {
  return (
    <React.Suspense fallback={<div>loading</div>}>
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
    </React.Suspense>
  );
};

export default App;
