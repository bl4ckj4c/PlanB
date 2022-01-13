import React, {useEffect} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {HourglassSplit, Dice1, Dice3, Dice5, People} from 'react-bootstrap-icons';

function GameCard(props) {
    const game = {
        id: props.game.id,
        title: props.game.Title,
        categories: [...props.game.Categories],
        playersMin: props.game.PlayersMin,
        playersMax: props.game.PlayersMax,
        hour: parseInt(props.game.Duration.split(':')[0]),
        minutes: parseInt(props.game.Duration.split(':')[1]),
        difficulty: props.game.Difficulty
    }
    //making the time better to display to users
    let time;
    if(game.hour === 0)
        time = game.minutes+"m";
    else if(game.minutes === 0)
            time = game.hour+"h";
    else if(game.minutes === 0)
        time = game.hour+"h";
        else
            time = game.hour+"h"+game.minutes+"m";

    //displaying game categories (max 3)
    let subtitle;
    if(game.categories.length < 4)
        subtitle = game.categories.join(' | ');
    else {
        subtitle = game.categories[0] + ' | ' + game.categories[1] + ' | '  + game.categories[2] + ' | +' + (game.categories.length-3); 
    }

    //choosing the dice icon depending on game difficulty
    let diceIcon;
    if(game.difficulty === 'Easy')
        diceIcon = <Dice1 className='mx-2'/>;
    else if(game.difficulty === 'Mid')
        diceIcon = <Dice3 className='mx-2'/>;
    else if(game.difficulty === 'Hard')
        diceIcon = <Dice5 className='mx-2'/>;

    const showGameInfo = (game) => {
        props.showGameInfo(game)
    }
    return (
        <Card onClick={() => showGameInfo(props.game)} className='mb-2 cursor-pointer'>
            <Card.Body>
                <Card.Title>
                    {game.title}
                </Card.Title>
                <Card.Subtitle className='text-muted'>
                    <small>{subtitle}</small>
                </Card.Subtitle>
                <Row className='align-items-center mt-3'>
                    <Col>
                        <People className='mx-2'/>
                        <small>{game.playersMin + '-' + game.playersMax}</small>
                    </Col>
                    <Col>
                        <HourglassSplit className='mx-2'/>
                        <small>{time}</small>
                    </Col>
                    <Col>
                        {diceIcon}
                        <small>{game.difficulty}</small>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default GameCard;