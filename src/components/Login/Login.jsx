import React, { useState, useEffect} from "react";
/* import { db } from "../../service/firebase"
import {doc, setDoc} from "firebase/firestore"; */
import "./Login.css";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Profile from '../Profile/Profile'
import { useNavigate } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile} from "firebase/auth";

const Login = () => {
  const { currentUser, email, password, displayName, photoURL, phoneNumber, setEmail, setPassword, setDisplayName, setPhotoURL, setPhoneNumber, } = useContext(AuthContext);

  const auth = getAuth();
  const navigate = useNavigate();
  
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("log in successful");   
      navigate("/profile");
      
    })
    .catch((error) => {
      console.log(error);
    });
};
  
  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: displayName,
            email: email,
            phoneNumber: phoneNumber,
            photoURL: photoURL
          }).then((resp) => {
            console.log(resp);
          }).catch((error) => {
            console.log(error);
          })
          console.log(userCredential);
          
        }).catch((error) => console.log(error));
    }
    onRegister();
  };

  return (
    <div className="loginWrapper">
     
      {!currentUser ? 
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          setPhoneNumber={setPhoneNumber}
          setPhotoURL={setPhotoURL}
          setDisplayName={setDisplayName}
          handleSubmit={handleSubmit}
          login={login}
        />
       :  <Profile email={email} displayName={displayName} photoURL={photoURL} phoneNumber={phoneNumber} password={password} setEmail={setEmail} />
      } 
      
    </div>
  );
};
export default Login;

/* setDoc(doc(db, "users" , userCredential.user.uid), {
            displayName: displayName,
            email: email,
            phone: phone,
            photoURL: url
          });  */
