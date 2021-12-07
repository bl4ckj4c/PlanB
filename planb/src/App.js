import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import * as Icon from 'react-bootstrap-icons';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Col, Container, Form, Row} from "react-bootstrap";

import API from './API'
import SignInScreen from './components/login_old';
import GameCard from './components/GameCard';
import Login from './components/Login';
import Registration from './components/Registration';
import {PersonCircle, Plus, PlusLg, Search} from "react-bootstrap-icons";



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
                    <Login/>
                }/>
                <Route exact path="/register" element={
                    <Registration
                    setIsSignedIn={setIsSignedIn}/>
                }/>
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
