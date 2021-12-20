import {Card, Container} from 'react-bootstrap';
import { ExclamationTriangle } from 'react-bootstrap-icons';

function NoGamesCard(props) {
    //Note: props.filter = true if this card is displayed due to a filter
    //props.filter = false, this card is displayed because user does not have games
    return (
        <Container className='d-flex align-items-center min-vh-75 pb-5' >
            <Card className='mb-5 border-danger w-100'>
                <Card.Body>
                    <Card.Title className='text-danger'>
                        <ExclamationTriangle /> Wait wait wait.. <ExclamationTriangle />
                    </Card.Title>
                    <Card.Subtitle className='text-danger'>
                        <small>
                            {props.filter ? 
                                "It seems incredible, we know, but nothing matches your research"
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