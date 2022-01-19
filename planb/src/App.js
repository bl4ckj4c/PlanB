import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import API from './API'
import Login from './components/Login/Login';
import Registration from './components/Login/Registration';
import NewSession from './components/NewSession/NewSession';
import ProfileInfo from './components/Common/ProfileInfo';
import Welcome from './components/Login/Welcome';
import WelcomeDesktop from './components/Login/WelcomeDesktop';
import MyGames from './components/MyGames/MyGames';
import AddGame from './components/AddGame/AddGame';

import {useAuthState} from 'react-firebase-hooks/auth';
import GamesFound from "./components/NewSession/GamesFound";

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, loading, error] = useAuthState(API.auth);

    const [games, setGames] = useState([]);
    const [gamesLoading, setGamesLoading] = useState(true);

    const [sessionPlayers, setSessionPlayers] = useState();
    const [sessionHours, setSessionHours] = useState(1);
    const [sessionMinutes, setSessionMinutes] = useState(0);
    const [sessionCategories, setSessionCategories] = useState([]);
    const [sessionDifficulty, setSessionDifficulty] = useState('');


    const resetSession = () => {
        setSessionPlayers(undefined);
        setSessionHours(undefined);
        setSessionMinutes(undefined);
        setSessionCategories([]);
        setSessionDifficulty('');
    };

    useEffect(() => {
        API.enableCORS().then(() => {
        });
    }, []);

    useEffect(() => {
        if (!loading) {
            if (user !== null) {
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        }
    }, [loading]);


    // Checking if the user is on a mobile phone or not
    // taken from https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
    window.mobileCheck = function () {
        let check = false;
        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    //redirecting to error page if you are not on a mobile and not already on an error page
    if (!window.mobileCheck() && window.location.pathname !== "/error") {
        window.location.replace("/error");
    }
    //redirecting to main page if you are on a mobile and on an error page
    if (window.mobileCheck() && window.location.pathname === "/error") {
        window.location.replace("/");
    }

    return (
        <BrowserRouter>
            <Routes>
                {/*<Route exact path="/" element={
                    isSignedIn ? <Navigate replace to="/mygames"/> : (
                        loading ?
                            <Welcome/> :
                            <Navigate replace to="/login"/>
                    )}/>*/}
                <Route exact path="/" element={
                    loading ? <Welcome/> : (
                        isSignedIn ?
                            <Navigate replace to="/mygames"/> :
                            <Navigate replace to="/login"/>
                    )}/>
                <Route exact path="/login" element={
                    isSignedIn ? <Navigate replace to="/mygames"/>
                        :
                        <Login
                            userLoading={loading}
                            userError={error}
                            setIsSignedIn={setIsSignedIn}/>
                }/>
                <Route exact path="/register" element={
                    isSignedIn ? <Navigate replace to="/mygames"/> : <Registration setIsSignedIn={setIsSignedIn}/>
                }/>
                <Route exact path="/mygames" element={
                    isSignedIn ?
                        <MyGames
                            games={games} setGames={setGames}
                            gamesLoading={gamesLoading} setGamesLoading={setGamesLoading}
                            resetSession={resetSession}
                        />
                        :
                        <Navigate replace to="/login"/>
                }/>
                <Route exact path="/profile" element={
                    <ProfileInfo
                        user={user}
                        userLoading={loading}
                        isSignedIn={isSignedIn}
                        setIsSignedIn={setIsSignedIn}/>
                }/>
                <Route exact path="/addgame" element={
                    isSignedIn ? <AddGame/> : <Navigate replace to="/login"/>
                }/>

                <Route exact path="/newsession" element={
                    //isSignedIn ? <div/> : <Navigate replace to = "/login"/>
                    <NewSession
                        games={games}
                        sessionPlayers={sessionPlayers} setSessionPlayers={setSessionPlayers}
                        sessionHours={sessionHours} setSessionHours={setSessionHours}
                        sessionMinutes={sessionMinutes} setSessionMinutes={setSessionMinutes}
                        sessionCategories={sessionCategories} setSessionCategories={setSessionCategories}
                        sessionDifficulty={sessionDifficulty} setSessionDifficulty={setSessionDifficulty}
                    />
                }/>

                <Route exact path="/gamesfound" element={
                    //isSignedIn ? <div/> : <Navigate replace to = "/login"/>
                    <GamesFound
                        games={games}
                        gamesLoading={gamesLoading}
                        sessionPlayers={sessionPlayers}
                        sessionHours={sessionHours}
                        sessionMinutes={sessionMinutes}
                        sessionCategories={sessionCategories}
                        sessionDifficulty={sessionDifficulty}
                    />
                }/>

                {/*<Route exact path="/rules" element={
                    //isSignedIn ? <Rules pdf_url={"https://www.hasbro.com/common/instruct/00009.pdf"} /> : <Navigate replace to="/login"/>
                    //<Rules pdf_url={"https://www.hasbro.com/common/instruct/00009.pdf"} />
                }/>*/}

                {/*<Route exact path="/suggest" element={
                    isSignedIn ? <div/> : <Navigate replace to="/login"/>
                }/>*/}

                <Route exact path="/error" element={<WelcomeDesktop/>}/>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
