import React from "react";
import '../Navbar/Navbar.css'
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const {currentUser, clickLogin} = useContext(AuthContext)
  const adminUID = "NfSLMpfkeGX02iWeAVlXdQn89D22";

  return (
    
     <Navbar className="navbar">
      <Container>
      <Link to={`/`} style={{textDecoration: "none"}} ><Navbar.Brand  style={{ color: "white" }} href="#home">Lorem</Navbar.Brand></Link>
        <Nav className="me-auto">
          <Link to={`/category/perros`} style={{ textDecoration: "none" }} ><Nav.Link href="#products" style={{ color: "white" }}>Productos</Nav.Link></Link>
          <Link to={`/contacto`} style={{ textDecoration: "none" }} ><Nav.Link href="#contact" style={{ color: "white" }}>Contacto</Nav.Link></Link>
          {currentUser && <Link to={`/profile`} style={{ textDecoration: "none" }} ><Nav.Link href="#profile" style={{ color: "white" }}>Mi perfil</Nav.Link></Link>}
          {<button className="navStyle" onClick={clickLogin}>
          {currentUser ? "Logout" : "Login"}
          </button>}
          
          
        </Nav>
        <CartWidget icon="fa-solid fa-cart-shopping" />
        
        {currentUser &&
          currentUser.uid === adminUID &&
          <Link to={`/admin`} className="navStyle">Admin settings</Link> 
   
          
        }
        
      </Container>
    </Navbar>
    
   
  );
};

export default NavBar;
