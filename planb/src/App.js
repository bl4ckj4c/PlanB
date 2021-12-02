import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import * as Icon from 'react-bootstrap-icons';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Col, Container, Form, Row} from "react-bootstrap";

import API from './API'
import SignInScreen from './components/login';
import GameCard from './components/GameCard';
import {PersonCircle, Plus, PlusLg, Search} from "react-bootstrap-icons";


import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import {firebaseConfig} from "./firebase-client/config";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        const games = collection(db, 'Games');
        getDocs(games).then((items) => {
            console.log(items.docs.map(doc => doc.data()));
        });

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
                {/*<Route exact path="/" element={
                    <SignInScreen
                        isSignedIn={isSignedIn}
                        setIsSignedIn={setIsSignedIn}/>
                }/>*/}
                <Route exact path="/mygames" element={
                    <>
                        <Container>
                            <Row className='justify-content-between mt-2'>
                                <Col xs={2}>
                                    <Plus size={30}/>
                                </Col>
                                <Col xs={2}/>
                                <Col xs={2}>
                                    <PersonCircle size={30} color="grey"/>
                                </Col>
                            </Row>
                            <Row>
                                <h1 className='m-2'>My Games</h1>
                            </Row>
                            <Row>
                                <Form>
                                    <Form.Group>
                                        <Form.Control type='text' placeholder='Search among your games'/>
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Container>
                        <Container fluid className='mt-3'>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                            <GameCard/>
                        </Container>
                    </>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
