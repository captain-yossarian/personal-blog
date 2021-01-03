import React, { FC } from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}


const App: FC = () => {

  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
