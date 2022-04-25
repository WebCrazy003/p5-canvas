import React from 'react';
import CanvasShow from './pages/CanvasShow/CanvasShow'
import { HashRouter as Router, Route } from 'react-router-dom'

const App = props => {
  return (
    <Router >
      <Route exact path="/" render={routerProps => (
        <CanvasShow {...routerProps} />
      )} />
    </Router>
  );
}

export default App;
