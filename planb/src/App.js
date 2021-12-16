import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import * as Icon from 'react-bootstrap-icons';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {Col, Container, Form, Row} from "react-bootstrap";

import API from './API'
import SignInScreen from './components/login_old';
import Login from './components/Login';
import Registration from './components/Registration';
import NewSession from './components/NewSession';
import ProfileInfo from './components/ProfileInfo';
import Welcome from './components/Welcome';
import Rules from './components/Rules';
import {PersonCircle, Plus, PlusLg, Search} from "react-bootstrap-icons";

import {useAuthState} from 'react-firebase-hooks/auth';

//our imports
import MyGames from './components/MyGames';

function App() {
    const [isSignedIn, setIsSignedIn] = useState(true);
    const [gameList, setGameList] = useState([]);
    const [user, loading, error] = useAuthState(API.auth);

    useEffect(() => {
        //API.getAllGames().then(result => console.log(result));
        //API.getUserGames('EGTY3JBs1iVP5UZ59J3wv76pWnL2').then(result => console.log(result));
        console.log(user);
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

    useEffect(() => {
        if (isSignedIn) {
            API.getAllGames()
                .then((res) => {
                    console.log(res);
                    //setGameList(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setGameList([]);
        }
    }, [isSignedIn])

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
                    //isSignedIn ? <ProfileInfo/> : <Navigate replace to = "/login"/>
                    <ProfileInfo
                        user={user}
                        userLoading={loading}
                        setIsSignedIn={setIsSignedIn}/>
                }/>
                <Route exact path="/addgame" element={
                    isSignedIn ? <div/> : <Navigate replace to="/login"/>
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
