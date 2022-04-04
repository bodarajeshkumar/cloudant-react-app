import React from "react";
import { Link } from "react-router-dom";
import './app.scss';
import Navbar, {Nav, NavDropdown} from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap'
import axios from "axios";

function logout() {
  console.log('ehy u loading');
  axios.get('http://localhost:3002/logout', {withCredentials: true})
      .then(res => {
        let serverResponse = res.data;
        console.log('u r logged out');
        console.log(res.data);
      })
  window.location.href = 'http://localhost:3001/'
}

function Header() {
  return (
      <ReactBootstrap.Navbar className={"navbar navbar-dark bg-primary"}>
        <ReactBootstrap.Container>
          <ReactBootstrap.NavbarBrand href="#home">Cloudant Explorer </ReactBootstrap.NavbarBrand>
          <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootstrap.Navbar.Collapse id={"basic-navbar-nav"}>
            <Nav variant="pills" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link href="/createUser">Create User</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href={"/listallusers"} eventKey="link-1">All Users</Nav.Link>
              </Nav.Item>

            </Nav>
          </ReactBootstrap.Navbar.Collapse>

        </ReactBootstrap.Container>
      </ReactBootstrap.Navbar>
  )
};

export default Header;



