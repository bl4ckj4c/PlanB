import {Button, Col, Container, Form, Row} from "react-bootstrap";
import GameCard from './GameCard';
import {ChevronLeft} from "react-bootstrap-icons";
import {Link, Navigate} from "react-router-dom";
import API from "../API";
import React, {useEffect, useState} from "react";

//special cards
import LoadingCard from "./LoadingCard";
import NoGamesCard from "./NoGamesCard";

function AddGame(props) {
    const [filter, setFilter] = useState("");
    const [gamesToShow, setGamesToShow] = useState([]);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('');


    const handleBackButton = (event) => {
        setPage('mygames');
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
                <>
                    <Container id="nav" className="pb-2 my-border-color border-bottom border-top-0">
                        <Row className='justify-content-between mt-2'>
                            <Col xs={6}>
                                <Button
                                    type="submit"
                                    className="bg-white border-0 p-0"
                                    onClick={() => handleBackButton()}>
                                    <ChevronLeft size={25} color="grey"/>
                                    <span className="text-muted align-middle">Back</span>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <h1 className='m-2'>Add games</h1>
                        </Row>
                        <Row>
                            <Form>
                                <Form.Group>
                                    <Form.Control type='text' placeholder='Search among all the games'
                                    value = {filter} onChange = {(event) => setFilter(event.target.value)}/>
                                </Form.Group>
                            </Form>
                        </Row>
                    </Container>
                    <Container fluid className='pt-3 bg-light pb-5 min-vh-75' id="games">
                        {gamesToShow.length ? 
                            gamesToShow.map(game => <GameCard game = {game} key = {'game'+game.id}/>)
                        :
                            ( loading ?
                                <LoadingCard />
                            :
                                <NoGamesCard filter = {true}/>
                            )
                        }
                    </Container>
                </>
            }
        </>
    );
}

export default AddGame;