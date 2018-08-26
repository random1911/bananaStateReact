import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Welcome from './components/Welcome/Welcome'
import NotFound from './components/NotFound/NotFound'
import GameWrapper from './components/GameWrapper/GameWrapper'
import './components/styles/common'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/play" exact component={GameWrapper} />
          <Route
            render={({staticContext}) => {
              if (staticContext) staticContext.status = 404
              return <NotFound />
            }}
          />
        </Switch>
      </Router>

    );
  }
}

export default App;
