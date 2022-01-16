import {Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import GameCard from '../Common/GameCard';
import {ChevronLeft} from "react-bootstrap-icons";
import {Navigate} from "react-router-dom";
import API from "../../API";
import React, {useEffect, useState} from "react";

//special cards
import NoGamesCard from "../Common/NoGamesCard";
//modal
import ModalGameInfo from "../Common/ModalGameInfo";

function AddGame(props) {
    const [filter, setFilter] = useState("");
    const [gamesToShow, setGamesToShow] = useState([]);
    const [games, setGames] = useState([]);
    const [usergames, setUsergames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [modalGame, setModalGame] = useState({});


    const handleBackButton = (event) => {
        setPage('mygames');
    }

    //useEffect for loading games
    useEffect(() => {
        //API.getUserGames()
        API.getAllGames()
            .then((games) => {
                //need to show only games that user does not have already
                API.getUserGames().
                    then((usergames) => {
                        const tmp = games.filter(game => !usergames.find(usergame => usergame.id === game.id));
                        tmp.sort((game1, game2) => {
                            const title1 = game1.Title.toUpperCase();
                            const title2 = game2.Title.toUpperCase();
                            if(title1 < title2){
                                return -1;
                            }
                            else if (title1 > title2){
                                return 1;
                            }
                            return 0;
                        });
                        setUsergames(usergames);
                        setGames(tmp);
                        setLoading(false);
                    })
                    .catch((err) => {
                        console.log(err);
                        setUsergames([]);
                        setLoading(false);
                        setGames([]);
                    });
            })
            .catch((err) => {
                console.log(err);
                setUsergames([]);
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
                    return true;
                }
                else if(game.Difficulty.toUpperCase().startsWith(filter.toUpperCase())){
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

    //function that adds (in frontend only) a usergame, and subsequently refreshes the view
    const addUsergame = (gameId) => {
        const game = games.find(game => game.id === gameId);
        const newUsergames = usergames;
        newUsergames.push(game);

        const tmp = games.filter(game => !newUsergames.find(usergame => usergame.id === game.id));
        tmp.sort((game1, game2) => {
            const title1 = game1.Title.toUpperCase();
            const title2 = game2.Title.toUpperCase();
            if(title1 < title2){
                return -1;
            }
            else if (title1 > title2){
                return 1;
            }
            return 0;
        });
        setUsergames(newUsergames);
        setGames(tmp);
    }

    const showGameInfo = (game) => {
        setModalGame(game);
        setModalShow(true);
    }

    const resetFilter = () => {
        setFilter("");
    }

    return (
        <>
            {page !== '' && <Navigate replace to={`/${page}`}/>}
            {
                <>
                    <Container id="nav" className="pb-2 bg-white my-border-color border-bottom border-top-0 border-start-0 border-end-0 fixed-top">
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
                            <Form onSubmit={(event => { event.preventDefault(); })}>
                                <Form.Group>
                                    <Form.Control type='text' placeholder='Search among all the games'
                                    value = {filter} onChange = {(event) => setFilter(event.target.value)}/>
                                </Form.Group>
                            </Form>
                        </Row>
                    </Container>
                    <Container fluid className='pt-3 bg-light pb-5 min-vh-75 below-nav' id="games">
                        {gamesToShow.length ? 
                            gamesToShow.map(game => <GameCard game = {game} key = {'game'+game.id} showGameInfo = {showGameInfo}/>)
                        :
                            ( loading ?
                                <Container className='d-flex align-items-center min-vh-75 pb-5' >
                                    <Spinner
                                        className='mx-auto d-block'
                                        variant="secondary"
                                        animation="border">
                                    </Spinner>
                                </Container>
                            :
                                <NoGamesCard filter = {true} add = {true} resetFilter = {resetFilter}/>
                            )
                        }
                    </Container>
                    <ModalGameInfo
                        fullscreen
                        game={modalGame}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        add = "true"
                        addusergame = {addUsergame}
                    />
                </>
            }
        </>
    );
}

export default AddGame;