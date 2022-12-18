import React, {useEffect} from "react";
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
  } = useContext(AuthContext);

  const auth = getAuth();
  const navigate = useNavigate();

  /* const updateMail = () => {
      updateEmail(auth.currentUser, { email })
    };
    
    const updatePass = () => {
        updatePassword(auth.currentUser, {password})
    }
 */
    

  const saveChanges = () => {
    currentUser &&
      updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
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
    };
    
    
      

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
                  <MDBCardImage
                    src={photoURL}
                    className="mt-5 mb-2"
                    style={{ width: "120px" }}
                    fluid
                  />
                  <label
                    htmlFor=""
                    style={{ color: "black", fontSize: "14px" }}
                  >
                    Upload a new picture
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setPhotoURL(e.target.value)}
                  />
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
                    onChange={(e) => setDisplayName(e.target.value)}
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
                          onChange={(e) => setFirstName(e.target.value)}
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
