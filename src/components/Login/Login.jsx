import React from "react";
/* import { db } from "../../service/firebase"
import {doc, setDoc} from "firebase/firestore"; */
import "./Login.css";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Profile from '../Profile/Profile'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,} from "firebase/auth";

const Login = () => {
  const { currentUser, email, password, displayName, photoURL, phoneNumber, setEmail, setPassword, setDisplayName, setPhotoURL, setPhoneNumber } = useContext(AuthContext);

  const auth = getAuth();
  const navigate = useNavigate();
  
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Log in successful",
      });  
      navigate("/profile");
      
    })
    .catch((error) => {
      if (error.code === 'auth/network-request-failed') {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "no network connection",
        });
      } else if (error.code === 'auth/user-not-found') {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "User not found",
        });
        
      } else if (error.code === "auth/wrong-password") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Wrong Password",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "E-mail or password are not valid",
        });
        console.log(error.code);
      }
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
              /* photoURL: photoURL */
            }).then((resp) => {
              sendEmailVerification(auth.currentUser)
              .then(() => {
                // Email verification sent!
                // ...
              }).catch((error) => {
                console.log(error);
              })
            }).catch((error) => {
              console.log(error);
            })
            console.log(userCredential);
            
          }).catch((error) => {
            console.log(error.code);
            if (error.code === 'auth/email-already-in-use') {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "email already in use",
              });
             
            } else if (error.code === 'auth/network-request-failed') {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "no network connection",
              });
             
            } else if (error.code === 'auth/invalid-email') {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "invalid E-mail",
              });
              
            } else if (error.code === "auth/invalid-password") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "invalid Password",
              });
            } else if (error.code === "auth/weak-password") {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Weak password",
              });
            }else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "E-mail or password are not valid",
              });
            }
          });
    }
    onRegister();
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
  }

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
          googleSignIn={googleSignIn}
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
