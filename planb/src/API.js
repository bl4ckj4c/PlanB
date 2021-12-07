import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {firebaseConfig} from "./firebase-client/config";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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
    getAllGames
};

export default API;