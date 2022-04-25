import React from 'react';
import CanvasShow from './pages/CanvasShow/CanvasShow'
import { HashRouter as Router, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router >
      <Route exact path="/" render={() => (
        <CanvasShow />
      )} />
    </Router>
  );
}

export default App;
