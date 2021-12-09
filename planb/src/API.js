import {initializeApp} from "firebase/app";
import {
    getFirestore,
    collection,
    query,
    where,
    doc,
    getDocs,
    setDoc,
    addDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";

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
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);

            // Create new document for the new user into table 'UserGames'
            const docRef = await addDoc(collection(db, 'UserGames'), {
                UID: user.uid,
                Games: []
            });

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

async function getUserGames(uid) {
    const gamesCollection = collection(db, 'UserGames');
    const q = query(gamesCollection, where('UID', '==', uid));
    const querySnapshot = await getDocs(q);
    let games = [];

    querySnapshot.forEach((doc) => {
        doc.data().Games.forEach(async (game) => {
            const res = await getDoc(game.GameRef);
            games.push(res.data());
        });
    });
    return games;
}

async function insertOrRemoveUserGame(uid, gameID, type) {
    const gamesCollection = collection(db, 'UserGames');
    const q = query(gamesCollection, where('UID', '==', uid));
    const querySnapshot = await getDocs(q);

    let ids = [];

    // Update the user game collection with the new game
    querySnapshot.forEach((doc) => {
        ids.push(doc.id);
    });
    const userRef = doc(db, 'UserGames', ids[0]);

    if (type === 'insert') {
        await updateDoc(userRef, {
            Games: arrayUnion({
                Frequency: 0,
                GameRef: '/Game/' + gameID
            })
        });
    } else if (type === 'remove') {
        await updateDoc(userRef, {
            Games: arrayRemove({
                Frequency: 0,
                GameRef: '/Game/' + gameID
            })
        });
    }
}

const API = {
    registerNewUser,
    signInUser,
    getAllGames,
    getUserGames,
    insertOrRemoveUserGame
};

export default API;