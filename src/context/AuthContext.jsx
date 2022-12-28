import { createContext, useState, useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDocs, collection, documentId, query, where, } from "firebase/firestore";
import { getDownloadURL, getStorage, ref,  uploadBytes,   } from "firebase/storage";
import { db } from "../service/firebase";
import Swal from "sweetalert2";

export const AuthContext = createContext()

export const AuthProvider =  ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const auth = getAuth();
    const navigate = useNavigate();
    const storage = getStorage();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const [photoURL, setPhotoURL] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [photo, setPhoto] = useState(null);
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
        /* console.log(currentUser); */
    }, [currentUser, auth])
    

    const clickLogin = () => {
        if (currentUser) {
            signOut(auth);
            navigate("/login");
        } else {
          navigate("/login");
        }
    };
    
    const resetPw = (e) => {
        e.preventDefault()
        console.log(email);
        sendPasswordResetEmail(auth, email)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Password reset e-mail sent. Please check your email/spam folder",
              })
        })
        .catch((error) => {
            console.log(error.code);
            if (error.code === "auth/invalid-email") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Wrong e-mail",
                  })
            }
        });
    }
    
    const getUsers = async () => {
        const docRef = collection(db, "users");
        const usuarios = query(docRef, where(documentId(), "==", currentUser.uid))

        const querySnapShot = await getDocs(usuarios)
        querySnapShot.forEach((doc) => {
            /* console.log(doc.id, "=>" , doc.data()); */
            const useer = doc.data()
            
            setFirstName(useer.firstName)
            setLastName(useer.lastName)
            setBirthday(useer.birthday)
            setCountry(useer.country)
            setOccupation(useer.occupation)
            setPhoneNumber(useer.phoneNumber)
        })
    }

    async function upload(file, currentUser) {
        const fileRef = ref(storage, currentUser.uid );
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(auth.currentUser, { photoURL }).catch((err) => {console.log(err);})
        alert("uploaded file")
        console.log(currentUser.photoURL);
    }

    
    
    useEffect(() => {
        if (!currentUser ) {
            setFirstName("")
            setLastName("")
            setBirthday("")
            setCountry("")
            setOccupation("")
            setPhoneNumber("")
            setPhotoURL("")
        }
    }, [currentUser, getUsers, photoURL])
    
    useEffect(() => {
        if (currentUser) {
          setDisplayName(currentUser.displayName)
          setEmail(currentUser.email)
          setPassword(currentUser.password)
          setPhotoURL(currentUser.photoURL)
        }
        getUsers()
    }, [currentUser])
    
    return (
        <AuthContext.Provider value={{currentUser, clickLogin, password, setPassword, email, setEmail, displayName, setDisplayName, photoURL, setPhotoURL,phoneNumber, setPhoneNumber,firstName, setFirstName, lastName,setLastName,country, setCountry,birthday, setBirthday,occupation, setOccupation,getUsers, resetPw, upload, photo, setPhoto}}>
            {children}
        </AuthContext.Provider>
    )
}