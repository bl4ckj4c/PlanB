import {Button, Card, Container} from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import ModalSuggestGame from '../SuggestGame/ModalSuggestGame';

import React, {useState} from "react";

function NoGamesCard(props) {
    //Note: props.filter = true if this card is displayed due to a filter
    //props.filter = false, this card is displayed because user does not have games
    const [suggestGame, setSuggestGame] = useState(false);
    return (
        <>
            <Container className='d-flex align-items-center min-vh-75 pb-5' >
                <Card className='mb-5 border-danger w-100'>
                    <Card.Body>
                        <Card.Title className='text-danger'>
                            <ExclamationTriangle /> Wait wait wait... <ExclamationTriangle />
                        </Card.Title>
                        <Card.Subtitle>
                            {props.filter ? 
                                    "It seems incredible, we know, but nothing matches your research!"
                                :   "It seems like you don't have games!" 
                                }
                        </Card.Subtitle>
                        { (props.filter && props.add) &&
                            <Card.Text className = "mt-3">
                                    If you're looking for something missing, you can&nbsp; 
                                    <a href="#" onClick = {() => setSuggestGame(true)}>Suggest a game!</a>
                            </Card.Text>
                        }
                    </Card.Body>
                </Card>
            </Container>
            {suggestGame &&
                <ModalSuggestGame 
                    fullscreen
                    show={suggestGame}
                    onHide={() => setSuggestGame(false)}
                />
            }
        </>
    );
}

export default NoGamesCard;