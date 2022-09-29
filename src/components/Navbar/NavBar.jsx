import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget/CartWidget";


const NavBar = () => {
  return (
    
     <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Lorem</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link href="#features">Contacto</Nav.Link>
          <Nav.Link href="#pricing">Productos</Nav.Link>
        </Nav>
        <CartWidget icon="fa-solid fa-cart-shopping" />
      </Container>
    </Navbar>
    
   
  );
};

export default NavBar;
