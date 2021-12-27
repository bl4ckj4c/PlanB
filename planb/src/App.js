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
import Rules from './components/Common/Rules';
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

    /*useEffect(() => {
        console.log(user);
    }, []);*/

    useEffect(() => {
        if (!loading) {
            if (user !== null) {
                setIsSignedIn(true);
            } else {
                setIsSignedIn(false);
            }
        }
    }, [loading]);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    isSignedIn ? <Navigate replace to="/mygames"/> : (
                        loading ?
                            <Welcome/> :
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
                        />
                        :
                        <Navigate replace to = "/login"/>
                        /*<MyGames/>*/
                }/>
                <Route exact path="/profile" element={
                    /*isSignedIn ?
                        <ProfileInfo
                            user={user}
                            userLoading={loading}
                            isSignedIn={isSignedIn}
                            setIsSignedIn={setIsSignedIn}/>
                        :
                        <Navigate replace to="/login"/>*/
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

                <Route exact path="/suggest" element={
                    isSignedIn ? <div/> : <Navigate replace to="/login"/>
                }/>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
