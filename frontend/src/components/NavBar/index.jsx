/* eslint-disable react/prop-types */
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header({ title = 'Todo System', routes = [] }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">{title}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {routes.filter(
            ({ visible = true }) => visible,
          ).map(({ name, path }) => (
            <Nav.Link as={Link} key={path} to={path}>
              {name}
            </Nav.Link>
          ))}
          <Nav.Link onClick={() => localStorage.removeItem('@todoReactApp-token')} as={Link} to="/login">Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
