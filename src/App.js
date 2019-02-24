import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { apiGet } from './lib/api';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Om from './pages/Om';
import Page404 from './pages/Page404';
import Expenses from './pages/Expenses';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Test from './pages/Test';

function prepareAutocomplete(settings) {
  const sortStringsByLength = (a, b) => a && a.length - b.length;
  const sortStrings = (a, b) => a && a.localeCompare(b, 'sv');
  return {
    ...settings,
    autocomplete: settings.autocomplete
      .sort(sortStrings)
      .sort(sortStringsByLength)
      // INFO: https://github.com/JedWatson/react-select/issues/3087
      .map(v => ({ value: v || '', label: v || '' })),
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    this.state = {
      user: token ? jwt.decode(token) : null,
      settings: null,
    };

    this.login = this.login.bind(this);
    this.loadSettings = this.loadSettings.bind(this);
  }

  async componentDidMount() {
    const { user, settings } = this.state;
    console.info(user, settings);
    if (user && !settings) {
      this.loadSettings();
    }
  }

  async loadSettings() {
    const { data } = await apiGet('/login/settings');
    this.setState({ settings: prepareAutocomplete(data) });
  }

  login(token) {
    this.setState({ user: jwt.decode(token) });
    this.loadSettings();
  }

  render() {
    const { state } = this;
    const { user, settings } = state;

    return (
      <Router>
        <div className="app">
          <AppBar user={user} settings={settings} logout={this.logout} />
          <div className="content">
            {!user ? (
              <Route path="/" render={() => <Login login={this.login} />} />
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/om" render={props => <Om {...props} user={user} />} />
                <Route path="/expenses" render={props => <Expenses {...props} {...state} user={user} />} />
                <Route path="/test" render={props => <Test {...props} {...state} user={user} />} />
                <Route path="/logout" render={() => <Logout logout={() => this.setState({ user: null })} />} />

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
