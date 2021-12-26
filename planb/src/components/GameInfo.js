import {Button, Col, Container, Image, Modal, Row, Spinner} from "react-bootstrap";
import {ChevronLeft, Dice1, Dice3, Dice5, HourglassSplit, People} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import API from "../API";
import {Categories} from "./Categories";
import Rules from "./Rules";

function GameInfo(props) {
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [showMoreDescription, setShowMoreDescription] = useState(false);
    const [showRules, setShowRules] = useState(false);

    const game = {
        title: props.game.Title,
        categories: [...props.game.Categories],
        description: props.game.Description,
        descriptionCut: props.game.Description.substring(0, 77) + " ...",
        difficulty: props.game.Difficulty,
        frequency: props.game.Frequency,
        ImageId: props.game.ImageId,
        playersMin: props.game.PlayersMin,
        playersMax: props.game.PlayersMax,
        rules: props.game.Rules,
        hour: parseInt(props.game.Duration.split(':')[0]),
        minutes: parseInt(props.game.Duration.split(':')[1])
    }
    let time;
    if (game.hour === 0)
        time = game.minutes + "m";
    else
        time = game.hour + "h" + game.minutes + "m";

    let subtitle = game.categories.join(' | ');

    let diceIcon;
    if (game.difficulty === 'Easy')
        diceIcon = <Dice1 xs={4} size={30} className='col'/>;
    else if (game.difficulty === 'Mid')
        diceIcon = <Dice3 xs={4} size={30} className='col'/>;
    else if (game.difficulty === 'Hard')
        diceIcon = <Dice5 xs={4} size={30} className='col'/>;

    useEffect(() => {
        API.getGameImage(game.ImageId)
            .then((url) => {
                setImageUrl(url);
                setImageLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setImageUrl('error');
                setImageLoading(false);
            });
    }, []);


    return (
        <>
            {/*
            <Container id="nav" className="pb-2">
                <Row className='justify-content-between mt-2'>
                    <Col xs={6}>
                        <Button
                            type="submit"
                            className="bg-white border-0 p-0"
                            /*onClick={() => handleBackButton()}
                        >
                            <ChevronLeft size={25} color="grey"/>
                            <span className="text-muted align-middle">Back</span>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <h1 className='m-2 text-center'>{game.title}</h1>
                </Row>
            </Container>
            */}
            {imageLoading ?
                <Container className="d-flex align-items-center min-vh-75">
                    <Row className="justify-content-center w-100">
                        <Col xs={12} sm={4} md={4}>
                            <Spinner
                                className='mx-auto d-block'
                                variant="secondary"
                                animation="border">
                                <span className="visually-hidden">Loading game's image...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>
                :
                <Container fluid className='min-vh-75'>
                    {/**GAME IMAGE */}
                    <Row key="game-image" className="min-vh-200px">
                        <Col>
                            <Image
                                className='rounded mx-auto d-block'
                                width={200}
                                src={imageUrl}/>
                        </Col>
                    </Row>
                    {/**Row with nplayers, duration, difficulty */}
                    <Row key="game-infos" className='align-items-center justify-content-center mt-4'>
                        <Col className="d-flex flex-column align-items-center">
                            <People xs={4} size={30} className='col'/>
                            <h5>{game.playersMin + '-' + game.playersMax}</h5>
                        </Col>
                        <Col className="d-flex flex-column align-items-center">
                            <HourglassSplit xs={4} size={30} className='col'/>
                            <h5>{time}</h5>
                        </Col>
                        <Col className="d-flex flex-column align-items-center">
                            {diceIcon}
                            <h5>{game.difficulty}</h5>
                        </Col>
                    </Row>
                    {/**GAME CATEGORIES */}
                    <Row key="game-categories" className='align-items-center justify-content-center mt-4'>
                        <Container><h5>Categories:</h5></Container>
                        <Container>
                            <Categories confirmedCategories={game.categories}
                                        setConfirmedCategories=""/>
                        </Container>
                    </Row>
                    {/**GAME DESCRIPTION */}
                    <Row key="game-description" className='align-items-center justify-content-center mt-4'>
                        <Container>
                            <h5>Description:</h5>
                            {showMoreDescription ?
                                <p style={{
                                    textAlign: 'justify',
                                    textJustify: 'inter-word'
                                }}>
                                    {game.description}<br></br>
                                    <Button variant="link" className="p-0"
                                            onClick={() => setShowMoreDescription(false)}>Hide more</Button>
                                </p>
                                :
                                <p style={{
                                    textAlign: 'justify',
                                    textJustify: 'inter-word'
                                }}>
                                    {game.descriptionCut}<br></br>
                                    <Button variant="link" className="p-0" onClick={() => setShowMoreDescription(true)}>Show
                                        more</Button>
                                </p>
                            }

                        </Container>
                    </Row>
                    {/**GAME RULES */}
                    <Row key="game-rules" className='align-items-center justify-content-center mt-4'>
                        <Container>
                            <h5>Rules:</h5>
                            <a href='' onClick={(event) => {
                                event.preventDefault();
                                setShowRules(true);
                            }}>Go to rules!</a>
                            <Modal
                                fullscreen
                                show={showRules}
                                onHide={() => setShowRules(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-vcenter">
                                        <Rules url={game.rules}/>
                                    </Modal.Title>
                                </Modal.Header>
                            </Modal>
                        </Container>
                    </Row>
                </Container>
            }
        </>
    );
}

export default GameInfo;