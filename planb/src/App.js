import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import API from './API'
import Login from './components/Login';
import Registration from './components/Registration';
import NewSession from './components/NewSession';
import ProfileInfo from './components/ProfileInfo';
import Welcome from './components/Welcome';
import Rules from './components/Rules';
import MyGames from './components/MyGames';
import AddGame from './components/AddGame';

import {useAuthState} from 'react-firebase-hooks/auth';

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [user, loading, error] = useAuthState(API.auth);

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
                    <Registration
                        setIsSignedIn={setIsSignedIn}/>
                }/>
                <Route exact path="/mygames" element={
                    /*isSignedIn ? <MyGames /> : <Navigate replace to = "/login"/> */
                    <MyGames/>
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
                    <NewSession/>
                }/>

                <Route exact path="/gamesfound" element={
                    //isSignedIn ? <div/> : <Navigate replace to = "/login"/>
                    <NewSession/>
                }/>

                <Route exact path="/rules" element={
                    isSignedIn ? <Rules/> : <Navigate replace to="/login"/>
                }/>

                <Route exact path="/suggest" element={
                    isSignedIn ? <div/> : <Navigate replace to="/login"/>
                }/>
            </Routes>
        </BrowserRouter>
    )
        ;
}

export default App;
