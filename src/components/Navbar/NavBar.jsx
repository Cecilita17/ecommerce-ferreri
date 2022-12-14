import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const {currentUser, clickLogin} = useContext(AuthContext)

  return (
    
     <Navbar bg="dark" variant="dark">
      <Container>
      <Link to={`/`} style={{textDecoration: "none"}} ><Navbar.Brand href="#home">Lorem</Navbar.Brand></Link>
        <Nav className="me-auto">
          <Link to={`/category/perros`} style={{textDecoration: "none"}} ><Nav.Link href="#products">Productos</Nav.Link></Link>
          <Link to={`/contacto`} style={{ textDecoration: "none" }} ><Nav.Link href="#contact">Contacto</Nav.Link></Link>

          {<button onClick={clickLogin}>
          {currentUser ? "Log Out" : "Login"}
        </button>
          }
          
          {/* <Link to={`/Login`} style={{ textDecoration: "none" }}><Nav.Link href="#login" onChange={clickLogin}></Nav.Link></Link>  */}
        </Nav>
        <CartWidget icon="fa-solid fa-cart-shopping" />
      </Container>
    </Navbar>
    
   
  );
};

export default NavBar;
