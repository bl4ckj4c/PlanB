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
import {PersonCircle, Plus, PlusLg, Search} from "react-bootstrap-icons";

//our imports
import MyGames from './components/MyGames';

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        API.getAllGames().then(result => console.log(result));
    }, []);

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
        /*<SignInScreen
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}/>*/
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    isSignedIn ? <Navigate replace to = "/mygames"/> : <Navigate replace to = "/login"/> 
                }/>
                <Route exact path="/login" element={
                    <Login/>
                }/>
                <Route exact path="/register" element={
                    <Registration
                    setIsSignedIn={setIsSignedIn}/>
                }/>
                <Route exact path="/mygames" element={
                    /*isSignedIn ? <MyGames /> : <Navigate replace to = "/login"/> */
                    <MyGames />
                }/>
                <Route exact path="/addgame" element={
                    isSignedIn ? <div/> : <Navigate replace to = "/login"/> 
                }/>
                
                <Route exact path="/newsession" element={
                    isSignedIn ? <div/> : <Navigate replace to = "/login"/> 
                }/>

                <Route exact path="/rules" element={
                    isSignedIn ? <div/> : <Navigate replace to = "/login"/> 
                }/>

                <Route exact path="/suggest" element={
                    isSignedIn ? <div/> : <Navigate replace to = "/login"/> 
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
