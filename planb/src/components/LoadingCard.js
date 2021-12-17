import {Card, Container} from 'react-bootstrap';
import { Alarm } from 'react-bootstrap-icons';

function LoadingCard() {
    return (
        <Container className='d-flex align-items-center min-vh-75 pb-5' >
            <Card className='mb-5 border-warning w-100'>
                <Card.Body >
                    <Card.Title className='text-warning'>
                        <Alarm /> Loading <Alarm />
                    </Card.Title>
                    <Card.Subtitle className='text-warning'>
                        <small>Sorry, wait for the dinos to bring games to us</small>
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoadingCard;