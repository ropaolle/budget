import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { apiPost } from './lib/api';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Om from './pages/Om';
import Page404 from './pages/Page404';
import Expenses from './pages/Expenses';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: null, settings: {} };
    // this.updateBilling = this.updateBilling.bind(this);
  }

  async componentDidMount() {
    const { user } = this.state;
    // apiPost('/createUser', { username: 'ropaolle', password: 'pass1234', email: 'ropaolle@gmail.com' });
    await apiPost('/createOptions');
    if (!user) {
      const { data } = await apiPost('/login', { password: 'pass1234', email: 'ropaolle@gmail.com' });
      console.log('LOGIN', data);
      this.setState({ ...data });
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
