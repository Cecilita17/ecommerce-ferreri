import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function PersonalProfile() {
  const { currentUser, email, displayName, photoURL, phoneNumber, firstName, lastName, country, birthday, occupation } = useContext(AuthContext);
   
  
  
  return (
    <section className="vh-100" style={{ backgroundColor: '#e3e4e5' }}>
      <MDBContainer className="py-5 h-100 ">
        <MDBRow className="justify-content-center align-items-center h-100 ">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', backgroundColor:"darkgrey" }}>
              <MDBRow className="g-0">
                <MDBCol md="4"  className=" text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor:"lightblue" }}>
                  <MDBCardImage src={photoURL}
                     className="mt-5 mb-3" style={{ width: '120px' }} fluid />
                  <MDBTypography style={{ }} tag="h5">{displayName}</MDBTypography>
                  <MDBTypography style={{ fontSize: "14px" }} tag="h5">({email})</MDBTypography>
                  <Link to={`/edit`} > <MDBIcon far icon="edit mb-5 mt-3" style={{color:"white"}} /> </Link>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography style={{fontSize:"2rem"}} tag="h6">Profile</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">First name:</MDBTypography>
                        <MDBCardText style={{color:"white", fontSize:"20px"}}>{firstName }</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Last name:</MDBTypography>
                        <MDBCardText style={{color:"white", fontSize:"20px"}}>{lastName }</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Country:</MDBTypography>
                        <MDBCardText style={{color:"white", fontSize:"20px"}}>{country }</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Birthday:</MDBTypography>
                        <MDBCardText style={{color:"white", fontSize:"20px"}}>{birthday}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Occupation:</MDBTypography>
                        <MDBCardText style={{color:"white", fontSize:"20px"}}>{occupation}</MDBCardText>
                      </MDBCol>

                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email:</MDBTypography>
                        {currentUser && <MDBCardText style={{color:"white", fontSize:"19px"}} >{email}</MDBCardText>}
                      </MDBCol>
                      
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone number:</MDBTypography>
                        <MDBCardText style={{color:"white", fontSize:"20px"}}>{phoneNumber }</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}