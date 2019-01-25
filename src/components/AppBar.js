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

class AppBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
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
                  <NavLink href={process.env.REACT_APP_PATH_LOGIN} target="_blank">
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
                  <NavLink tag={Link} to="/tider">
                    Mina tider
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {user.username}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/wallboard">
                      Wallboard
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/veckorapport">
                      Veckorapport
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag={Link} to="/settings">
                      Inställningar
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/om">
                      Om
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href={process.env.REACT_APP_PATH_LOGOUT}>Logga ut</DropdownItem>
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
