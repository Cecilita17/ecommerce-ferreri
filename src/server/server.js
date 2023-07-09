const express = require('express');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert('./../serviceAccountKey.json'),
});

const app = express();

// Define a route to fetch the user list
app.get('/api/users', async (req, res) => {
  try {
    const userRecords = await admin.auth().listUsers();
    const users = userRecords.users.map((user) => ({
      uid: user.uid,
      email: user.email,
    }));
    res.json(users);
  } catch (error) {
    console.log('Error fetching user list:', error);
    res.status(500).json({ error: 'Failed to fetch user list' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
