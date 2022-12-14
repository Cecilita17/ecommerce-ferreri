import React, { useState} from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  
} from "firebase/auth";

import "./Login.css";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Profile from '../Profile/Profile'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState("");
  
  const { currentUser} = useContext(AuthContext);

  const auth = getAuth();
  /* const user = auth.currentUser; */

  
  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("log in successful");    
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
          console.log(userCredential);
        }).catch((error) => console.log(error));
    }
    onRegister();
  };

  /* const submit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        console.log(error);
      });
  }; */

  return (
    <div className="loginWrapper">
     
      {!currentUser ? 
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          setName={setName}
          handleSubmit={handleSubmit}
          login={login}
        />
       :  <Profile/>
      } 
      
    </div>
  );
};
export default Login;
