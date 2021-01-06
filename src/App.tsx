import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript';
import Math from './Chapters/MathOperations'


setTimeout(() => Prism.highlightAll(), 0)

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Math />
      </Route>

    </Switch>
  </Router>
);

export default App;
