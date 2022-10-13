import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    
     <Navbar bg="dark" variant="dark">
      <Container>
      <Link to={`/`} ><Navbar.Brand href="#home">Lorem</Navbar.Brand></Link>
        <Nav className="me-auto">
          <Link to={`/category/perros`} ><Nav.Link href="#products">Productos</Nav.Link></Link>
          <Link to={`/contacto`} ><Nav.Link href="#contact">Contacto</Nav.Link></Link>
          <Link to={`/Login`} ><Nav.Link href="#login">Login</Nav.Link></Link>
        </Nav>
        <CartWidget icon="fa-solid fa-cart-shopping" />
      </Container>
    </Navbar>
    
   
  );
};

export default NavBar;
