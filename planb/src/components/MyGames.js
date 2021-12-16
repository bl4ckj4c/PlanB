import {Col, Container, Form, Row} from "react-bootstrap";
import GameCard from './GameCard';
import {PersonCircle, Plus, PlusLg, Search} from "react-bootstrap-icons";


function MyGames(props) {
    return (
        <>
            <Container id="nav" className = "pb-2 border-bottom border-secondary">
                <Row className='justify-content-between mt-2'>
                    <Col xs={6}>
                        <Plus size={30} color="grey"/>
                        <span className = "text-muted align-middle">Add game</span> 
                    </Col>
                    <Col xs={2}>
                        <PersonCircle size={30} color="grey"/>
                    </Col>
                </Row>
                <Row>
                    <h1 className='m-2'>My Games</h1>
                </Row>
                <Row>
                    <Form>
                        <Form.Group>
                            <Form.Control type='text' placeholder='Search among your games'/>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>
            <Container fluid className='pt-3 bg-light' id = "games">
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
            </Container>
        </>
    );
}

export default MyGames;