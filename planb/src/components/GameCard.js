import React, {useEffect} from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import {Clock, Dice1, Dice3, Dice5, People} from 'react-bootstrap-icons';

function GameCard(props) {
    const game = {
        title: 'Monopoly',
        categories: ['Family', 'Dice'],
        playersMin: 2,
        playersMax: 7,
        time: '1h',
        difficulty: 'Easy'
    }

    let subtitle = game.categories.join(' | ');

    let diceIcon;
    if(game.difficulty === 'Easy')
        diceIcon = <Dice1 className='mx-2'/>;
    else if(game.difficulty === 'Mid')
        diceIcon = <Dice3 className='mx-2'/>;
    else if(game.difficulty === 'Hard')
        diceIcon = <Dice5 className='mx-2'/>;

    return (
        <Card className='mb-2'>
            <Card.Body>
                <Card.Title>
                    {game.title}
                </Card.Title>
                <Card.Subtitle className='my-1 text-muted'>
                    {subtitle}
                </Card.Subtitle>
                <Row className='align-items-center mt-3'>
                    <Col>
                        <People className='mx-2'/>
                        {game.playersMin + ' - ' + game.playersMax}
                    </Col>
                    <Col>
                        <Clock className='mx-2'/>
                        {game.time}
                    </Col>
                    <Col>
                        {diceIcon}
                        {game.difficulty}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default GameCard;