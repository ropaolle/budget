import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // Badge,
} from 'reactstrap';

import { apiGet } from '../lib/api';
import { exportExpenses } from '../lib/excel';

const backup = async () => {
  try {
    await apiGet('/backup');
    console.info('backup done');
  } catch (err) {
    console.info('backup failed:', err.message);
  }
};

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  }

  logout() {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  }

  render() {
    const { isOpen } = this.state;
    const { user } = this.props;
    const authenticated = user && user.username;

    return (
      <header>
        <Navbar color="dark" dark expand="sm">
          <NavbarBrand tag={Link} to="/">
            <FontAwesomeIcon icon={faCreditCard} /> {process.env.REACT_APP_FULLNAME}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          {!authenticated && (
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/login">
                    Logga in
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          )}
          {authenticated && (
            <Collapse isOpen={isOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink tag={Link} to="/expenses">
                    Kostnader
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/test">
                    Test
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="#" onClick={backup}>
                      Databasbackup
                    </DropdownItem>
                    <DropdownItem tag={Link} to="#" onClick={exportExpenses}>
                      Exportera till Excel
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={Link} to="/om">
                      Om
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={Link} to="/logout">
                      Logga ut
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          )}
        </Navbar>
      </header>
    );
  }
}

export default AppBar;
