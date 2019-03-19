import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import uuid from 'uuid/v1';
import { apiGet } from './lib/api';
import { AppBar, Footer, AppAlert, ExampleBoundary } from './components';
import { Expenses, Home, Import, Login, Logout, Om, Page404, Test } from './pages';

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
      alerts: [],
    };

    this.setAlert = this.setAlert.bind(this);
    this.login = this.login.bind(this);
    this.loadSettings = this.loadSettings.bind(this);
  }

  async componentDidMount() {
    const { user, settings } = this.state;
    console.info(user);
    if (user && !settings) {
      this.loadSettings();
    }
  }

  setAlert(alert) {
    this.setState(prevState => ({ alerts: [...prevState.alerts, { ...alert, id: uuid() }] }));
  }

  async loadSettings() {
    const { data } = await apiGet('/login/settings');
    console.info(data);
    this.setState({ settings: prepareAutocomplete(data) });
  }

  login(token) {
    this.setState({ user: jwt.decode(token) });
    this.loadSettings();
  }

  render() {
    const { state } = this;
    const { user, settings, alerts } = state;
    const appAlerts = alerts.map(alert => <AppAlert key={alert.id} alert={alert} />);

    return (
      <ExampleBoundary>
        <Router>
          <div className="app">
            <AppBar user={user} settings={settings} logout={this.logout} setAlert={this.setAlert} />
            {appAlerts}
            <div className="content">
              {!user ? (
                <Route path="/" render={() => <Login login={this.login} />} />
              ) : (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/om" render={props => <Om {...props} user={user} />} />
                  <Route path="/expenses" render={props => <Expenses {...props} {...state} user={user} />} />
                  <Route path="/test" render={props => <Test {...props} {...state} user={user} />} />
                  <Route path="/import" render={props => <Import {...props} {...state} user={user} />} />
                  <Route path="/logout" render={() => <Logout logout={() => this.setState({ user: null })} />} />

                  <Route component={Page404} />
                </Switch>
              )}
            </div>
            <Footer />
          </div>
        </Router>
      </ExampleBoundary>
    );
  }
}

export default App;
