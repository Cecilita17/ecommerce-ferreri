/* import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBox, CDBBtn, CDBIcon } from 'cdbreact';
import Dog from '../../assets/dog.svg'

export const Footer = () => {
  return (
    <CDBFooter className="shadow" style={{backgroundColor:"white" ,height: "calc(100% - 60px)"}}>
      <CDBBox display="flex" flex="column" className="mx-auto py-5" style={{ width: '90%', backgroundColor:"white" }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <a href="/" style={{textDecoration: "none"}} className="d-flex align-items-center justify-content-center pe-5 me-5 p-0 text-dark">
              <img alt="logo" src={Dog} style={{width:"60px"}} width="30px" />
              
            </a>
            <p className="my-3" style={{ width: '250px' }}>
              Tienda de comida para mascotas 
            </p>
            <CDBBox display="flex" className="mt-4">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Lorem solutions
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Resources</CDBFooterLink>
              <CDBFooterLink href="/">About Us</CDBFooterLink>
              <CDBFooterLink href="/">Contact</CDBFooterLink>
              <CDBFooterLink href="/">Blog</CDBFooterLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Ayuda
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Support</CDBFooterLink>
              <CDBFooterLink href="/">Sign Up</CDBFooterLink>
              <CDBFooterLink href="/">Sign In</CDBFooterLink>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: '600' }}>
              Productos
            </p>
            <CDBBox flex="column" style={{ cursor: 'pointer', padding: '0' }}>
              <CDBFooterLink href="/">Windframe </CDBFooterLink>
              <CDBFooterLink href="/">Loop </CDBFooterLink>
              <CDBFooterLink href="/">Contrast </CDBFooterLink>
            </CDBBox>
          </CDBBox>
        </CDBBox>
        <small className="text-center mt-5">&copy; Ferreri, 2022. All rights reserved.</small>
      </CDBBox>
    </CDBFooter>
  );
}; */


import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>123 Main St</p>
          <p>Anytown, USA</p>
          <p>555-555-5555</p>
          <p>info@yourcompany.com</p>
        </div>
        <div className="footer-col">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna id convallis aliquam, ipsum ipsum bibendum est, a malesuada magna libero id libero.</p>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <div className="footer-logo">
            <img src={require('https://picsum.photos/seed/picsum/200/300')} alt="Logo" />
          </div>
        </div>
      </div>
      <p className="copyright">Copyright © Your Company {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;