/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Pizza And Wings</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/order/new">
              <Nav.Link className="navHover">Create Order</Nav.Link>
            </Link>
            <Link passHref href="/orders">
              <Nav.Link>View Orders</Nav.Link>
            </Link>
            <Link passHref href="/revenue">
              <Nav.Link>Revenue</Nav.Link>
            </Link>
          </Nav>
          <div style={{ marginLeft: '10px', paddingRight: '40px' }}>
            <SearchBar />
          </div>
          <Nav>
            <Button id="signin" className="copy-btn" variant="danger" type="button" size="lg" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
