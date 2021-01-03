import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prism from 'prismjs';
import 'prismjs/themes/prism-twilight.css'
import 'prismjs/components/prism-typescript';

const code = `
const foo: string = 'foo';
const bar = 'bar';
console.log(foo + bar);
`.trim()

function Home() {
  return <h2>Home</h2>;
}


class About extends React.Component {
  componentDidMount() {
    console.log({ prism: Prism.languages })
    // You can call the Prism.js API here
    // Use setTimeout to push onto callback queue so it runs after the DOM is updated
    setTimeout(() => Prism.highlightAll(), 0)
  }
  render() {
    return (
      <pre className="line-numbers">
        <code className="language-typescript">
          {code}
        </code>
      </pre>
    )
  }
}

const App = () => {

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
