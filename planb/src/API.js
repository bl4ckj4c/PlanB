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
    if (currentUser !== null) {
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

async function insertOrRemoveUserGame(gameID, type) {
    const usersCollection = collection(db, 'UserGames');
    const q = query(usersCollection, where('UID', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);
    const gameRef = doc(db, 'Games', gameID);
    const game = await getDoc(gameRef);

    let ids = [];
    querySnapshot.forEach((doc) => {
        ids.push(doc.id);
    });
    const userRef = doc(db, 'UserGames', ids[0]);

    const gameData = game.data();

    if (type === 'insert') {
        await updateDoc(userRef, {
            Games: arrayUnion({
                Title: gameData.Title,
                Categories: gameData.Categories,
                Description: gameData.Description,
                Difficulty: gameData.Difficulty,
                Duration: gameData.Duration,
                PlayersMax: gameData.PlayersMax,
                PlayersMin: gameData.PlayersMin,
                Rules: gameData.Rules,
                ImageId: gameData.ImageId,
                Frequency: 0,
                id: game.id
            })
        });
    } else if (type === 'remove') {
        const userData = await getDoc(userRef);
        const frequency = userData.data().Games.find((element) => element.id === gameID).Frequency;

        await updateDoc(userRef, {
            Games: arrayRemove({
                Title: gameData.Title,
                Categories: gameData.Categories,
                Description: gameData.Description,
                Difficulty: gameData.Difficulty,
                Duration: gameData.Duration,
                PlayersMax: gameData.PlayersMax,
                PlayersMin: gameData.PlayersMin,
                Rules: gameData.Rules,
                ImageId: gameData.ImageId,
                Frequency: frequency,
                id: game.id
            })
        });
    }
}

async function getGameImage(gameImageID) {
    try {
        const url = await getDownloadURL(ref(storage, gameImageID));
        return url;
    } catch (err) {
        const url = await getDownloadURL(ref(storage, '404.jpg'));
        return url;
    }
}

async function suggestGame(title, description) {
    const docRef = await addDoc(collection(db, 'SuggestGame'), {
        Title: title,
        Description: description
    });
    try {
        return !!docRef.id;
    } catch (err) {
        throw false;
    }
}

async function enableCORS() {
    /*const res = await fetch("https://cors-anywhere.herokuapp.com/corsdemo", {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html; charset=utf-8"
        }
    });
    console.log(res);
    const text = await res.text();

    console.log(text)

    const value = text.split("value=\"")[2].split("\"")[0];
    console.log(value);*/

    const corsRes = await fetch("https://cors-anywhere.herokuapp.com/corsdemo?accessRequest=339886b2d4c0aacfd4634e6fcd365a3e319ebc375fcd2a8b0b86aa56a2b352e9", {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    });
}

const API = {
    createNewUserGameList,
    signOutUser,
    getAllGames,
    getUserGames,
    insertOrRemoveUserGame,
    getGameImage,
    suggestGame,
    auth,
    enableCORS
};

export default API;