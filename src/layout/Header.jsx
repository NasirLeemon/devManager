import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, Link} from 'react-router-dom'



function Header() {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to='home'>Bloggers</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to='contacts' >Contacts</Nav.Link>
            <Nav.Link as={NavLink} to='add-contact' >Add Contact</Nav.Link>
            <Nav.Link as={NavLink} to='edit-contact' >Edit Contact</Nav.Link>
            <Nav.Link as={NavLink} to='register' >Register</Nav.Link>
            <Nav.Link as={NavLink} to='login' >
              Log In
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
)
}

export default Header
