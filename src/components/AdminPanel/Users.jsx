import React, { useEffect, useState } from 'react';
import { db } from './../../service/firebase/index';
import { collection, getDocs } from 'firebase/firestore';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [usersF, setUsersF] = useState([]);
  const [mergedUsers, setMergedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching user data:', error);
        setLoading(true); // Set loading to false even in case of error
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
        setLoading(true); // Set loading to false even in case of error
      }
    };

    fetchUsersFromFirestore();
  }, []);

  useEffect(() => {
    const mergeUsers = () => {
      const merged = mergeArrays(usersF, users);
      setMergedUsers(merged);
    };

    mergeUsers();
  }, [users, usersF]);

  const mergeArrays = (arr1, arr2) => {
    const merged = arr1.map((item1) => {
      const matchingItem = arr2.find((item2) => item2.uid === item1.uid);
      if (matchingItem) {
        return {
          uid: item1.uid,
          firstName: item1.firstName || '',
          email: matchingItem.email || '',
        };
      }
      return {
        uid: item1.uid || '',
        firstName: item1.firstName || '',
        email: 'items dont match',
      };
    });
  
    return merged;
  };
  
  
  

  console.log(mergedUsers);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {mergedUsers.map((user) => (
          <li key={user.uid}>
            <p>Email: {user.email}</p>
            <p>First Name: {user.firstName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

