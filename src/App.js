import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { apiPost } from './lib/api';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Om from './pages/Om';
import Page404 from './pages/Page404';
import Expenses from './pages/Expenses';
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

    this.state = { user: null, settings: {} };
    // this.updateBilling = this.updateBilling.bind(this);
  }

  async componentDidMount() {
    const { user } = this.state;
    if (!user) {
      const { data } = await apiPost('/login', { password: 'pass1234', email: 'ropaolle@gmail.com' });
      console.log('LOGIN', data);
      const maxLength = 9;
      console.log(Math.floor(maxLength / 2), maxLength % 2);
      this.setState({ ...data, settings: prepareAutocomplete(data.settings) });
    }
  }

  render() {
    const { state } = this;
    const { user, settings } = state;
    const authenticated = user && user.username;

    return (
      <Router /* basename="/tor" */>
        <div className="app">
          <AppBar user={user} settings={settings} />
          <div className="content">
            {!authenticated ? (
              <Route path="/" component={Home} />
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/om" render={props => <Om {...props} user={user} />} />
                <Route path="/expenses" render={props => <Expenses {...props} {...state} user={user} />} />
                <Route path="/test" render={props => <Test {...props} {...state} user={user} />} />

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
