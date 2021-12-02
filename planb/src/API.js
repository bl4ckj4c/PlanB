import firebase from "firebase/compat";
import {appconfig} from "./firebase-client/config";


async function getAllGames() {
    /*const games = collection(db, 'Games');
    getDocs(games).then((items) => {
        console.log(items.docs.map(doc => doc.data()));
    });*/
}

const API = {
    getAllGames
};

export default API;