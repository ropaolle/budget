import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';
import { firebaseAuth } from '../utils';
import AppBar from './AppBar';
import Footer from './Footer';
import Page404 from './Page404';
import Cron from './Cron';
import PrivateRoute from './PrivateRoute';
import Home from '../pages/home/Home';
import Charts from '../pages/charts/Charts';
import Expenses from '../pages/expenses/Expenses';
import Settings from '../pages/settings/Settings';

class App extends Component {
  componentDidMount() {
    const { updateUser } = this.props;
    this.removeAuthListener = firebaseAuth().onAuthStateChanged((user) => {
      updateUser(user);
    });
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    const { user, isLoaded } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          <div className="wrapper">
            <AppBar user={user} />

            <div className="content">
              {isLoaded && (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <PrivateRoute path="/charts" component={Charts} />
                  <PrivateRoute path="/expenses" component={Expenses} />
                  <PrivateRoute path="/settings" component={Settings} />
                  <Route path="/cron" component={Cron} />
                  <Route component={Page404} />
                </Switch>
              )}

              <div className="push" />
            </div>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    emailVerified: PropTypes.bool,
    displayName: PropTypes.string,
    phoneNumber: PropTypes.string,
    photoURL: PropTypes.string,
  }),
  isLoaded: PropTypes.bool.isRequired,
};

App.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({ ...state.auth });

export default connect(mapStateToProps, actionCreators)(App);
