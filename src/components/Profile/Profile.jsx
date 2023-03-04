import React from 'react';
import "./ProfileStyles.css"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from "../../service/firebase";
import { getAuth } from "firebase/auth";
import { getDocs, collection } from 'firebase/firestore';

export default function PersonalProfile() {
  const { currentUser, email, displayName, photoURL, phoneNumber, firstName, lastName, country, birthday, occupation } = useContext(AuthContext);
   
  const [purchases, setPurchases] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const purchaseRef = collection(db, 'sales', user.uid, 'purchases')
      const snapshot = await getDocs(purchaseRef)
      const purchasesArray = [];

      snapshot.forEach((doc) => {
        const purchaseData = doc.data();
        purchasesArray.push(purchaseData);
      });
      setPurchases(purchasesArray);
      }
      
    };
    fetchData();
    /* purchases.forEach(obj => console.log(obj.sale[0].title)) */
  }, [user.uid]);
  
  
  
  return (
    <section className="height" style={{ backgroundColor: '#e3e4e5' }}>
      <MDBContainer className="py-5 h-100 d-flex flex-column justify-content-center align-items-center">
        <MDBRow className="justify-content-center align-items-center h-100 ">
          <MDBCol lg="6" className="mb-4 mb-lg-0" style={{width:"700px"
          }}>
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem', backgroundColor:"white" }}>
              <MDBRow className="g-0">
                <MDBCol md="4"  className=" text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundColor:"#3f4143" }}>
                  <MDBCardImage src={photoURL}
                     className="mt-5 mb-3" style={{ width: '120px' }} fluid />
                  <MDBTypography style={{ }} tag="h5">{displayName}</MDBTypography>
                  <MDBTypography style={{ fontSize: "14px" }} tag="h5">({email})</MDBTypography>
                  <Link to={`/edit`} > <MDBIcon far icon="edit mb-5 mt-3" style={{color:"grey"}} /> </Link>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography style={{fontSize:"2rem"}} tag="h6">Profile</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                    <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">First name:</MDBTypography>
                        <MDBCardText style={{color:"grey", fontSize:"20px"}}>{firstName }</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Last name:</MDBTypography>
                        <MDBCardText style={{color:"grey", fontSize:"20px"}}>{lastName }</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Country:</MDBTypography>
                        <MDBCardText style={{color:"grey", fontSize:"20px"}}>{country }</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Birthday:</MDBTypography>
                        <MDBCardText style={{color:"grey", fontSize:"20px"}}>{birthday}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Occupation:</MDBTypography>
                        <MDBCardText style={{color:"grey", fontSize:"20px"}}>{occupation}</MDBCardText>
                      </MDBCol>

                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email:</MDBTypography>
                        {currentUser && <MDBCardText style={{color:"grey", fontSize:"19px"}} >{email}</MDBCardText>}
                      </MDBCol>
                      
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone number:</MDBTypography>
                        <MDBCardText style={{color:"grey", fontSize:"20px"}}>{phoneNumber }</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <div className='historyStyles'>
          <span>Purchase History:</span>
            
          {purchases.map(purchase => (
              <ul>
                <li key={purchase.sale[0].id}> <span>Product:</span>  {purchase.sale[0].title}</li>
                <li key={purchase.sale[0].id}> <span>Purchase ID:</span>  {purchase.sale[0].id}</li>
                <li key={purchase.sale[0].id}> <span>Price: $</span> {purchase.sale[0].price}</li>
                <li key={purchase.sale[0].id}> <span>Amount: </span> {purchase.sale[0].count}</li>
              </ul>
              ))}
            
        </div>
      </MDBContainer>

      
    </section>
  );
}