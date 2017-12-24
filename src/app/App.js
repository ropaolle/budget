import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/settings';
import { database, firebaseAuth, DB_SETTINGS } from '../utils';
import AppBar from './AppBar';
import Footer from './Footer';
import Page404 from './Page404';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/home/Home';
import Charts from '../pages/charts/Charts';
import Budget from '../pages/budget/Budget';
import Settings from '../pages/settings/Settings';

class App extends Component {
  componentDidMount() {
    // Load app settings
    this.removeSettingsListener = database.collection(DB_SETTINGS)
      .onSnapshot((snapshot) => {
        this.props.updateSettings(snapshot.docs);
      });

    // Load user data
    const { loadUser } = this.props;
    this.removeAuthListener = firebaseAuth().onAuthStateChanged((user) => {
      loadUser(user);
    });
  }

  componentWillUnmount() {
    this.removeSettingsListener();
    this.removeAuthListener();
  }

  render() {
    const { auth, loadUser/* , settings */ } = this.props;

    return (
      <BrowserRouter>
        <div id="app-wrapper">
          <AppBar user={auth.user} loadUser={loadUser} />
          {/* settings.isLoaded && */}
          <div id="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/charts" component={Charts} />
              <PrivateRoute path="/budget" component={Budget} />
              <PrivateRoute path="/settings" component={Settings} />
              <Route component={Page404} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const { auth, settings } = state;
  return { auth, settings };
};

export default connect(mapStateToProps, actionCreators)(App);
