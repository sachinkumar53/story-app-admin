import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from "./firebaseConfig";
import { getAuth } from 'firebase/auth'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

export const usersRef = collection(db,"users");
export const publicationsRef = collection(db,"publications");
export const topRatedStoriesRef = collection(db,"top_rated");