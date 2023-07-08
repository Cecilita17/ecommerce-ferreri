import React, { useEffect, useState } from 'react';
import { db } from './../../service/firebase/index';
import { getAuth, listUsers } from "firebase/auth";
import firebase from 'firebase/app';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(firebase.SDK_VERSION);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersFromFirestore = await fetchUsersFromFirestore();
        const usersWithEmail = await fetchUsersFromAuthentication();
        const mergedUsers = mergeUserData(usersFromFirestore, usersWithEmail);
        setUsers(mergedUsers);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching and merging user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUsersFromFirestore = async () => {
    try {
      const snapshot = await db.collection('users').get();
      const usersFromFirestore = snapshot.docs.map((doc) => doc.data());
      return usersFromFirestore;
    } catch (error) {
      console.log('Error fetching users from Firestore:', error);
      return [];
    }
  };

  const fetchUsersFromAuthentication = async () => {
    try {
      const userRecords = await listUsers(getAuth());
      const usersWithEmail = userRecords.users.map((user) => ({
        uid: user.uid,
        email: user.email,
      }));
      return usersWithEmail;
    } catch (error) {
      console.log('Error fetching users from Firebase Authentication:', error);
      return [];
    }
  };

  const mergeUserData = (usersFromFirestore, usersWithEmail) => {
    const mergedUsers = usersFromFirestore.map((user) => {
      const matchingUser = usersWithEmail.find((u) => u.uid === user.uid);
      if (matchingUser) {
        return { ...user, email: matchingUser.email };
      }
      return user;
    });
    return mergedUsers;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.uid}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            {/* Display other user profile data as needed */}
          </li>
        ))}
      </ul>
      {/* Include your previous code here */}
      {/* Additional components or functionality */}
    </div>
  );
};

export default Users;

