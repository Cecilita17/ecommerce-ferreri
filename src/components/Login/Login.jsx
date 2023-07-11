import React from "react";
import "./Login.css";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Profile from "../Profile/Profile";
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
  signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../service/firebase/index";

const Login = () => {
  const {
    currentUser,
    email,
    password,
    displayName,
    photoURL,
    setEmail,
    setPassword,
    setDisplayName,
    setPhotoURL,
  } = useContext(AuthContext);

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
        if (error.code === "auth/network-request-failed") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "no network connection",
          });
        } else if (error.code === "auth/user-not-found") {
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

    const onRegister = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        // Create a user document in Firestore with the same UID as in authentication
        await setDoc(doc(db, "users", user.uid), {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });

        // Update the user profile
        await updateProfile(auth.currentUser, {
          displayName: user.displayName,
          email: user.email,
        });

        // Send email verification
        await sendEmailVerification(auth.currentUser);

        console.log(userCredential);
      } catch (error) {
        // Error handling code
        // ...
      }
    };

    onRegister();
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className="loginWrapper">
      {!currentUser ? (
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          login={login}
          googleSignIn={googleSignIn}
        />
      ) : (
        <Profile
          email={email}
          displayName={displayName}
          photoURL={photoURL}
          password={password}
          setEmail={setEmail}
        />
      )}
    </div>
  );
};

export default Login;

