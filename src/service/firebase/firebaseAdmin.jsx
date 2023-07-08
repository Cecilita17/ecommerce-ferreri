import admin from 'firebase-admin';
const serviceAccount = require('./../../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Initialize Cloud Firestore through Firebase
const db = admin.firestore();
export default admin;