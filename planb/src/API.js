import {initializeApp} from "firebase/app";
import {
    getFirestore,
    collection,
    query,
    where,
    doc,
    getDocs,
    addDoc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove
} from "firebase/firestore";
import {
    getStorage,
    ref,
    getDownloadURL
} from "firebase/storage";
import {
    getAuth,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {firebaseConfig} from "./firebase-client/config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        //const uid = user.uid;
        //console.log(user.email);
        currentUser = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
        };
    } else {
        // User is signed out
        currentUser = null;
    }
});

async function createNewUserGameList(userID) {
    // Create new document for the new user into table 'UserGames'
    const docRef = await addDoc(collection(db, 'UserGames'), {
        UID: userID,
        Games: []
    });
    try {
        return !!docRef.id;
    } catch (err) {
        return false;
    }
}

async function signOutUser() {
    signOut(auth)
        .then(() => {
            // Signed out
        })
        .catch(() => {
            // Not signed out, still logged in
        });
}

async function getAllGames() {
    const gamesCollection = collection(db, 'Games');
    const querySnapshot = await getDocs(gamesCollection);
    let games = [];

    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        let game = doc.data();
        game.id = doc.id;
        games.push(game);
    });

    return games;
}

async function getUserGames() {
    // User authenticated
    if(currentUser !== null) {
        const gamesCollection = collection(db, 'UserGames');
        const q = query(gamesCollection, where('UID', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        let games = [];

        querySnapshot.forEach((doc) => {
            games = doc.data().Games;
        });
        return games;
    }
    // User not authenticated
    else {
        throw 'User not authenticated';
    }
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
                GameRef: gameID
            })
        });
    } else if (type === 'remove') {
        await updateDoc(userRef, {
            Games: arrayRemove({
                Frequency: 0,
                GameRef: gameID
            })
        });
    }
}

async function getGameImage(gameImageID) {
    console.log(gameImageID);
    const url = await getDownloadURL(ref(storage, gameImageID));
    console.log(url);
    return url;
}

const API = {
    createNewUserGameList,
    signOutUser,
    getAllGames,
    getUserGames,
    insertOrRemoveUserGame,
    getGameImage,
    auth
};

export default API;