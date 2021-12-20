import {Button, Col, Container, Form, Row} from "react-bootstrap";
import GameCard from './GameCard';
import {PersonCircle, Plus, PlusLg, Search} from "react-bootstrap-icons";
import {Link, Navigate} from "react-router-dom";
import API from "../API";
import React, {useEffect, useState} from "react";

//special cards
import LoadingCard from "./LoadingCard";
import NoGamesCard from "./NoGamesCard";

function MyGames(props) {
    const [newSession, setNewSession] = useState(false);
    const [filter, setFilter] = useState("");
    const [gamesToShow, setGamesToShow] = useState([]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('');

    const handleNewSession = (event) => {
        setNewSession(true);
    }

    const handleAddGameButton = (event) => {
        setPage('addgame');
    }

    //useEffect for loading games
    useEffect(() => {
        //API.getUserGames()
        API.getAllGames()
            .then((games) => {
                setGames(games);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setGames([]);
            })
    }, []);

    //useEffect for filtering games
    useEffect(() => {
        if (filter !== "") {
            //NOT WORKING
            const filtered = games.filter(game => {
                if(game.Title.toUpperCase().startsWith(filter.toUpperCase())){
                    console.log(game.Title + "\n"+game.Difficulty + "\n"+ game.Categories);
                    return true;
                }
                else if(game.Difficulty.toUpperCase().startsWith(filter.toUpperCase())){
                    console.log(game.Title + "\n"+game.Difficulty + "\n"+ game.Categories);
                    return true;
                }
                else if (game.Categories.find(item => item.toUpperCase().startsWith(filter.toUpperCase())))
                    return true;
                return false;
            });
            setGamesToShow(filtered);
        } else {
            setGamesToShow(games);
        }
    }, [filter, games.length]);

    return (
        <>
            {page !== '' && <Navigate replace to={`/${page}`}/>}
            {
                newSession ?
                    <Navigate replace to="/newsession"/>
                    :
                    <>
                        <Container id="nav" className="pb-2 bg-white my-border-color border-bottom border-top-0 fixed-top">
                            <Row className='justify-content-between mt-2'>
                                <Col xs={6}>
                                    <Button
                                        type="submit"
                                        className="bg-white border-0 p-0"
                                        onClick={() => handleAddGameButton()}>
                                        <Plus size={30} color="grey"/>
                                        <span className="text-muted align-middle">Add game</span>
                                    </Button>
                                </Col>
                                <Col xs={2}>
                                    <a href='/profile'>
                                        <PersonCircle
                                            className='mt-1'
                                            size={30}
                                            color="grey"
                                        />
                                    </a>
                                </Col>
                            </Row>
                            <Row>
                                <h1 className='m-2'>My Games</h1>
                            </Row>
                            <Row>
                                <Form>
                                    <Form.Group>
                                        <Form.Control type='text' placeholder='Search among your games'
                                        value = {filter} onChange = {(event) => setFilter(event.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Container>
                        <Container fluid className='pt-4 bg-light pb-5 min-vh-75 below-nav' id="games">
                            {gamesToShow.length ? 
                                gamesToShow.map(game => <GameCard game = {game} key = {'game'+game.id}/>)
                            :
                                ( loading ?
                                    <LoadingCard />
                                :
                                    (games.length ? <NoGamesCard filter = {true}/> : <NoGamesCard filter = {false}/>)
                                )
                            }
                        </Container>

                        <Container>
                            <Row className='fixed-bottom mx-4 mb-4'>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    onClick={() => handleNewSession()}>
                                    New Session
                                </Button>
                            </Row>
                        </Container>
                    </>
            }
        </>
    );
}

export default MyGames;