import { createContext, useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getDocs, collection, documentId, query,where,} from "firebase/firestore";
import { db } from "../service/firebase";

export const AuthContext = createContext()

export const AuthProvider =  ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const auth = getAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [photoURL, setPhotoURL] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [country, setCountry] = useState("")
    const [birthday, setBirthday] = useState("")
    const [occupation, setOccupation] = useState("")

   
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                
            } else {
                setCurrentUser(null)
            }
        });
        console.log(currentUser);
    }, [currentUser, auth])
    

    const clickLogin = () => {
        if (currentUser) {
            signOut(auth);
            navigate("/login");
        } else {
          navigate("/login");
        }
      };
    
    const getUsers = async() => {
        const docRef = collection(db, "users");
        const usuarios = query(docRef, where(documentId(), "==", currentUser.uid))

        const querySnapShot = await getDocs(usuarios)
        querySnapShot.forEach((doc) => {
            console.log(doc.id, "=>" , doc.data());
            const useer = doc.data()
            
            setFirstName(useer.firstName)
            setLastName(useer.lastName)
            setBirthday(useer.birthday)
            setCountry(useer.country)
            setOccupation(useer.occupation)
            setPhoneNumber(useer.phoneNumber)
        })

    }
    
    useEffect(() => {
        if (currentUser) {
          setDisplayName(currentUser.displayName)
          setPhotoURL(currentUser.photoURL)
          setEmail(currentUser.email)
          setPassword(currentUser.password)
          setPhoneNumber(currentUser.phoneNumber)
        }
        getUsers()
        
    }, [currentUser, auth])
    
    

    return (
        <AuthContext.Provider value={{currentUser, clickLogin, password, setPassword, email, setEmail, displayName, setDisplayName, photoURL, setPhotoURL,phoneNumber, setPhoneNumber,firstName, setFirstName, lastName,setLastName,country, setCountry,birthday, setBirthday,occupation, setOccupation,getUsers}}>
            {children}
        </AuthContext.Provider>
    )
}