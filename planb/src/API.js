import {initializeApp} from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";

import {firebaseConfig} from "./firebase-client/config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});


async function registerNewUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            return user;
        })
        .catch((error) => {
            return error;
        });
}

async function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            return userCredential.user;
        })
        .catch((error) => {
            return error;
        });
}

async function getAllGames() {
    const gamesCollection = collection(db, 'Games');
    const querySnapshot = await getDocs(gamesCollection);
    let games = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        games.push(doc.data());
    });

    return games;
}

const API = {
    registerNewUser,
    signInUser,
    getAllGames
};

export default API;