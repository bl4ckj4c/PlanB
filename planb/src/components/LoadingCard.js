import {Card, Container} from 'react-bootstrap';
import { Alarm } from 'react-bootstrap-icons';

function LoadingCard() {
    return (
        <Container className=' fixed-top d-flex align-items-center min-vh-100' >
            <Card className='mb-2 border-warning w-100'>
                <Card.Body >
                    <Card.Title className='text-warning'>
                        <Alarm /> Loading <Alarm />
                    </Card.Title>
                    <Card.Subtitle className='text-warning'>
                        <small>Sorry, wait for the dinos to bring you games to us</small>
                    </Card.Subtitle>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoadingCard;