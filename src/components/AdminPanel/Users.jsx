import React, { useEffect, useState } from 'react';
import { db } from './../../service/firebase/index';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { getStorage } from "firebase/storage";
import "./Users.css"


const Users = () => {
  const [users, setUsers] = useState([]);
  const [usersF, setUsersF] = useState([]);
  const [mergedUsers, setMergedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const storage = getStorage();


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user data:', error);
        setLoading(true);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsersFromFirestore = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersFromFirestore = querySnapshot.docs.map((doc) => doc.data());
        setUsersF(usersFromFirestore);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching users from Firestore:', error);
        setLoading(true);
      }
    };

    fetchUsersFromFirestore();
  }, []);

  useEffect(() => {
    const mergeUsers = async () => {
      const merged = await mergeArrays(usersF, users);
      setMergedUsers(merged);
    };

    mergeUsers();
  }, [users, usersF]);

  const mergeArrays = async (arr1, arr2) => {
    const merged = await Promise.all(
      arr1.map(async (item1) => {
        const matchingItem = arr2.find((item2) => item2.uid === item1.uid);
        if (matchingItem) {
          const photoURL = await getDownloadURL(ref(storage, matchingItem.uid));
          console.log(photoURL)
          return {
            uid: item1.uid,
            firstName: item1.firstName || '',
            email: matchingItem.email || '',
            photoURL: photoURL || '',
          };
        }
        return {
          uid: item1.uid || '',
          firstName: item1.firstName || '',
          email: 'items dont match',
          photoURL: '',
        };
      })
    );

    return merged;
  };

  const uploadProfilePicture = async (file, user) => {
    const imageName = user.uid;
    const fileRef = ref(storage, imageName);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);

    // Store the photoURL in the user's data in Firestore or update the respective user's document with the photoURL
    // Example: db.collection('users').doc(user.uid).update({ photoURL });

    console.log(`Uploaded profile picture for user ${user.uid}`);
    console.log('Photo URL:', photoURL);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {mergedUsers.map((user) => (
          <li className='usersLi' key={user.uid}>
            <img className='usersImg' src={user.photoURL} alt="Profile" />
            <p>Email: {user.email}</p>
            <p>Name: {user.firstName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
