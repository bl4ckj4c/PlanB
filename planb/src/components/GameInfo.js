import {Button, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {ChevronLeft, Dice1, Dice3, Dice5, HourglassSplit, People} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import API from "../API";
import { Categories } from "./Categories";

function GameInfo(props) {
    const [imageUrl, setImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(true);

    const game = {
        title: props.game.Title,
        categories: [...props.game.Categories],
        playersMin: props.game.PlayersMin,
        playersMax: props.game.PlayersMax,
        hour: parseInt(props.game.Duration.split(':')[0]),
        minutes: parseInt(props.game.Duration.split(':')[1]),
        difficulty: props.game.Difficulty,
        frequency: props.game.Frequency,
        ImageId: props.game.ImageId
    }
    let time;
    if (game.hour === 0)
        time = game.minutes + "m";
    else
        time = game.hour + "h" + game.minutes + "m";

    let subtitle = game.categories.join(' | ');

    let diceIcon;
    if (game.difficulty === 'Easy')
        diceIcon = <Dice1 xs={4} size={40} className='col'/>;
    else if (game.difficulty === 'Mid')
        diceIcon = <Dice3 xs={4} size={40} className='col'/>;
    else if (game.difficulty === 'Hard')
        diceIcon = <Dice5 xs={4} size={40} className='col'/>;

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
                <Container fluid className='mt-3 min-vh-75'>
                    {/**GAME IMAGE */}
                    <Row className="min-vh-200px">
                        <Col>
                            <Image
                                className='rounded mx-auto d-block'
                                width={200}
                                src={imageUrl}/>
                        </Col>
                    </Row>
                    {/**NUMBER OF PLAYERS */}
                    <Row className='align-items-center justify-content-center mt-5'>
                        <Col xs={1}/>
                        <People xs={4} size={40} className='col'/>
                        <Col xs={4}>
                            <h3>
                                {game.playersMin + '-' + game.playersMax}
                            </h3>
                        </Col>
                        <Col xs={3}/>
                    </Row>
                    {/**GAME DURATION */}
                    <Row className='align-items-center justify-content-center mt-4'>
                        <Col xs={1}/>
                        <HourglassSplit xs={4} size={40} className='col'/>
                        <Col xs={4}>
                            <h3>
                                {time}
                            </h3>
                        </Col>
                        <Col xs={3}/>
                    </Row>
                    {/**GAME DIFFICULTY */}
                    <Row className='align-items-center justify-content-center mt-4'>
                        <Col xs={1}/>
                        {diceIcon}
                        <Col xs={4}>
                            <h3>
                                {game.difficulty}
                            </h3>
                        </Col>
                        <Col xs={3}/>
                    </Row>
                    {/**GAME CATEGORIES */}
                    <Row className='align-items-center justify-content-center mt-4'>
                        <Container>
                            <Categories confirmedCategories={game.categories}
                                        setConfirmedCategories=""/>
                        </Container>
                    </Row>

                </Container>
            }
        </>
    );
}

export default GameInfo;