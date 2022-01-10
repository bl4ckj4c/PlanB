import {Navigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import GameCard from "../Common/GameCard";
import ModalGameInfo from "../Common/ModalGameInfo";
import {Button, Col, Container, Row} from "react-bootstrap";
import {ChevronLeft} from "react-bootstrap-icons";

function GamesFound(props) {
    const {
        games,
        gamesLoading,
        sessionPlayers,
        sessionHours,
        sessionMinutes,
        sessionCategories,
        sessionDifficulty
    } = props;

    const [foundGames, setFoundGames] = useState([]);
    const [loadingFoundGames, setLoadingFoundGames] = useState(true);

    const [modalShow, setModalShow] = useState(false);
    const [modalGame, setModalGame] = useState({});
    const [page, setPage] = useState('');

    console.log(games);

    const filterGames = () => {
        const sessionTotMinutes = (parseInt(sessionHours) * 60 + parseInt(sessionMinutes));

        return games.filter((game) => {
            const h = parseInt(game.Duration.split(':')[0]);
            const m = parseInt(game.Duration.split(':')[1]);
            const gameTotMinutes = (h * 60 + m);

            return ( sessionPlayers <= game.PlayersMax &&
                sessionPlayers >= game.PlayersMin &&
                gameTotMinutes <= sessionTotMinutes &&
                sessionDifficulty === game.Difficulty &&
                game.Categories.some(cat => {
                    for (const sessionCat of sessionCategories) {
                        if (cat === sessionCat) {
                            return true;
                        }
                    }
                }));
        });
    };

    useEffect(() => {
        const filtered = filterGames();
        setFoundGames(filtered);
        setLoadingFoundGames(false);
    }, []);

    if (gamesLoading || games === [] || games === undefined) {
        console.error("Games are not defined yet or they have still to be loaded.");
        return (<Navigate replace to="/mygames"/>);
    }

    if(sessionPlayers === undefined ||
       sessionHours === undefined ||
       sessionMinutes === undefined ||
       sessionCategories === undefined ||
       sessionDifficulty === '') {
        console.error("Some filters are undefined.");
        return (<Navigate replace to="/newsession"/>);
    }

    const showGameInfo = (game) => {
        setModalGame(game);
        setModalShow(true);
    }

    const handleBackButton = (event) => {
        setPage('newsession');
    }

    return (
        <>
            {
                page === 'newsession' ?
                    <Navigate replace to="/newsession"/>
                    :
                    loadingFoundGames ?
                        <div>We are loading your games...</div>
                        :
                        foundGames.length === 0 ?
                            <Container id="nav" className="pb-2 border-bottom border-secondary">
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
                                    <h1 className='m-2'>No Games Found :(</h1>
                                </Row>
                            </Container>
                            :
                            <>
                                <Container id="nav" className="pb-2 border-bottom border-secondary">
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
                                        <h1 className='m-2'>Games Found!</h1>
                                    </Row>
                                </Container>
                                <Container fluid className='mt-3'>
                                    <>{foundGames.map(game => <GameCard game={game} key={'game' + game.id}
                                                                        showGameInfo={showGameInfo}/>)}</>
                                    <ModalGameInfo
                                        game={modalGame}
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </Container>
                            </>
            }
        </>
    );
}

export default GamesFound;