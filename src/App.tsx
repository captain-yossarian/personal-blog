import React, { VFC, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { blogArticles, sections } from "./Layout/structure";
import { Main } from "./Layout";
import ArticleBase from "./Shared/ArticleBase";
import { sort } from "./Sections/Home";
import { ComponentMap } from "./Layout/lazyLoading";
import { highlightPrism } from "./Layout/utils";
import { log } from "./Layout/test";

log();
highlightPrism();

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

const data = sort(blogArticles).concat(sections); //

interface IPResponse {
  status: string;
  country: string;
}
const App: VFC = () => {
  const [visible, setVisibility] = useState(false);

  const fetchCountry = async () => {
    const response: IPResponse = await fetch("http://ip-api.com/json").then(
      (data) => data.json()
    );

    if (response.status !== "success") {
      setVisibility(true);
    }

    if (response.country.toLowerCase() === "russia") {
      setVisibility(false);
    }
  };

  useEffect(() => {
    fetchCountry();
  });
  return (
    <React.Suspense fallback={<div>loading</div>}>
      {visible ? (
        <Router>
          <Main>
            <ScrollToTop />
            <Switch>
              {data.map((elem) => {
                const { url, Comp } = elem;
                const Component = ComponentMap[Comp];
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
      ) : (
        <p>russia is banned</p>
      )}
    </React.Suspense>
  );
};

export default App;
