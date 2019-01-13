import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Om from './pages/Om';
import Page404 from './pages/Page404';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {} };
    // this.updateBilling = this.updateBilling.bind(this);
  }

  componentDidMount() {}

  render() {
    const { state } = this;
    const { user, settings } = state;
    const authenticated = true;

    return (
      <Router basename="/tor">
        <div className="app">
          <AppBar user={user} settings={settings} />
          <div className="content">
            {!authenticated ? (
              <Route path="/" component={Home} />
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/om" render={props => <Om {...props} user={user} />} />
                <Route component={Page404} />
              </Switch>
            )}
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
