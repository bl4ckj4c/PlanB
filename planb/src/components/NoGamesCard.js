import {Card, Container} from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';

function NoGamesCard(props) {
    //Note: props.filter = true if this card is displayed due to a filter
    //props.filter = false, this card is displayed because user does not have games
    console.log(props.filter);
    return (
        <Container className='fixed-top d-flex align-items-center min-vh-100' >
            <Card className='mb-2 border-danger w-100'>
                <Card.Body>
                    <Card.Title className='text-danger'>
                        <ExclamationTriangle /> Wait wait wait.. <ExclamationTriangle />
                    </Card.Title>
                    <Card.Subtitle className='text-danger'>
                        <small>
                            {props.filter ? 
                                "You're looking for something you don't have"
                            :   "It seems like you don't have games!" 
                            }
                        </small>
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default NoGamesCard;