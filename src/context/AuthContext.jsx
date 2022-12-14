import { createContext, useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const auth = getAuth();
    const navigate = useNavigate();
   
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null)
            }
        });
        console.log(currentUser);
    }, [currentUser])
    

    const clickLogin = () => {
        if (currentUser) {
          signOut(auth);
        } else {
          navigate("/login");
        }
      };
    

    return (
        <AuthContext.Provider value={{currentUser, clickLogin}}>
            {children}
        </AuthContext.Provider>
    )
}