import {Card} from 'react-bootstrap';
import { Alarm } from 'react-bootstrap-icons';

function LoadingCard() {
    return (
        <Card className='mb-2 border-warning'>
            <Card.Body >
                <Card.Title className='text-warning'>
                    <Alarm /> Loading <Alarm />
                </Card.Title>
                <Card.Subtitle className='text-warning'>
                    <small>Sorry, wait for the dinos to bring you games to us</small>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}

export default LoadingCard;