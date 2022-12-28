import React, {useState} from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../service/firebase";
import "./ProfileStyles.css"
import Trash from "../../assets/trash-icon.svg"

export default function PersonalProfile() {
  const {
    currentUser,
    password,
    setPassword,
    email,
    setEmail,
    displayName,
    setDisplayName,
    photoURL,
    setPhotoURL,
    phoneNumber,
    setPhoneNumber,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    country,
    setCountry,
    birthday,
    setBirthday,
    occupation,
    setOccupation,
    upload, photo, setPhoto
  } = useContext(AuthContext);

  const auth = getAuth();
  const navigate = useNavigate();

  const saveChanges = () => {
    currentUser &&
      updateProfile(auth.currentUser, {
        displayName: displayName,
        
      })
        .then(() => {
          setDoc(doc(db, "users", currentUser.uid), {
            phoneNumber: phoneNumber,
            firstName: firstName,
            lastName: lastName,
            country: country,
            birthday: birthday,
            occupation: occupation,
          });
        })
        .then(() => {
            updateEmail(auth.currentUser,  email ).catch((error) => {
                console.log(error);
            })
        })
        .then(() => {
            updatePassword(auth.currentUser, password)
        })
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    console.log(currentUser);
    console.log(firstName);
    console.log(lastName);
    
    };
    
    function handleClick() {
      upload(photo, currentUser);
    }
      

  return (
    <section className="vh-100" style={{ backgroundColor: "#e3e4e5" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard
              className="mb-3"
              style={{ borderRadius: ".5rem", backgroundColor: "darkgrey" }}
            >
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className=" text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                    backgroundColor: "lightblue",
                  }}
                >
                  {photo && (
                    <div style={{ display: "flex", flexDirection:"column", alignItems:"center", height:"280px"}}>
                      <span style={{ color: "black", fontWeight: "700", fontSize:"1.1rem", marginTop:"30px" , }}>Profile Picture:</span>
                      <MDBCardImage
                        src={URL.createObjectURL(photo)}
                        className="mt-4 mb-2"
                        style={{ width: "120px" }}
                        fluid
                      />
                      
                      <button style={{ border: "none", backgroundColor: "lightblue", fontWeight: "700", }} onClick={() => setPhoto("")}>  <img src={Trash} style={{ width: "19px", }} /> </button>
                      <button onClick={handleClick}>Upload to Firebase</button>

                    </div>
                  )}
                  
                  {!photo &&
                  <div style={{ display: "flex", flexDirection:"column", justifyContent: "flex-end", height: !photo ? "160px" : "60px", color:"black", fontWeight:"600" }} >
                    
                  <label htmlFor="">Select a profile image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="myImage"
                    onChange={(event) => {
                      setPhoto(event.target.files[0]);
                    }}   
                      />
                      
                </div>
                  }
                  
                  
                  <MDBTypography
                    style={{
                      marginTop: "20px",
                      color: "black",
                      fontSize: "16px",
                    }}
                    tag="h5"
                  >
                    Display name:
                  </MDBTypography>
                  <input
                    type="text"
                    onChange={(e) => {
                      setDisplayName(e.target.value)
                      console.log(displayName);
                    }}
                  />
                </MDBCol>
                
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography style={{ fontSize: "2rem" }} tag="h6">
                      Edit your profile
                    </MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1  d-flex">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">First name:</MDBTypography>
                        <input
                          type="text"
                          onChange={(e) => {
                            setFirstName(e.target.value)
                            console.log(firstName);
                          }}
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Last name:</MDBTypography>
                        <input
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Country:</MDBTypography>
                        <input
                          type="text"
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Birthday:</MDBTypography>
                        <input
                          type="text"
                          onChange={(e) => setBirthday(e.target.value)}
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Occupation:</MDBTypography>
                        <input
                          type="text"
                          onChange={(e) => setOccupation(e.target.value)}
                        />
                      </MDBCol>

                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email:</MDBTypography>
                        <input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </MDBCol>

                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone number:</MDBTypography>
                        <input
                          type="number"
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">New password:</MDBTypography>
                        <input
                          type="number"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </MDBCol>

                      <div className="d-flex justify-content-center">
                        <button
                          style={{
                            backgroundColor: "lightblue",
                            border: "none",
                            margin: "10px",
                            padding: "4px",
                            width: "200px",
                          }}
                          onClick={saveChanges}
                        >
                          Save changes
                        </button>
                      </div>
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
