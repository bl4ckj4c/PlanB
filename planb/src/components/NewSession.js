import {Col, Container, Form, Row, Button} from "react-bootstrap";
import {ChevronLeft, HourglassSplit, People, PersonCircle, Plus} from "react-bootstrap-icons";
import React, {useState} from "react";
import API from "../API";
import {Navigate} from "react-router-dom";

function NewSession(props) {
    const [page, setPage] = useState('');
    const [players, setPlayers] = useState();
    const [time, setTime] = useState();
    const [hours, setHours] = useState(1);
    const [minutes, setMinutes] = useState(0);

    const handleBackButton = (event) => {
        setPage('mygames');
    }

    const handleFindGames = (event) => {
        setPage('foundgames');
    }

    const handlePlayers = (event) => {
        setPlayers(event.target.value);
    }

    const handleTime = async (event) => {
        const t = event.target.value;
        await setTime(t);
        const h = t.split(':')[0];
        const m = t.split(':')[1];
        console.log(h)
        console.log(m)
        setHours(h);
        setMinutes(m);
    }

    return (
        <>
            {
                page === 'mygames' ?
                    <Navigate replace to = "/mygames"/>
                    :
                    page === 'foundgames' ?
                        <Navigate replace to = "/foundgames"/>
                        :
                        <>
                            <Container id="nav" className = "pb-2 border-bottom border-secondary">
                                <Row className='justify-content-between mt-2'>
                                    <Col xs={6}>
                                        <Button
                                            type="submit"
                                            className="bg-white border-0 p-0"
                                            onClick={() => handleBackButton()}>
                                            <ChevronLeft size={25} color="grey"/>
                                            <span className = "text-muted align-middle">Back</span>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <h1 className='m-2'>New Session</h1>
                                </Row>
                            </Container>
                            <Container fluid className='mt-3 p-5'>
                                <Form>
                                    <Form.Group className='mb-3' controlId='formNumberOfPlayers'>
                                        <Row className="align-items-center mx-auto">
                                        <Col xs={4}>
                                        <Form.Label column>
                                            <People size={40}/>
                                        </Form.Label>
                                        </Col>
                                        <Col xs={8}>
                                            <Form.Control
                                                type='number'
                                                placeholder='Number of players'
                                                value={players}
                                                onChange={(ev) => handlePlayers(ev)}
                                            />
                                        </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                                <Form>
                                    <Form.Group className='mb-3' controlId='formNumberOfPlayers'>
                                        <Row className="align-items-center mx-auto">
                                        <Col xs={4}>
                                        <Form.Label column>
                                            <HourglassSplit size={40}/>
                                        </Form.Label>
                                        </Col>
                                        <Col xs={8} className="justify-content-center">
                                            <Form.Control
                                                type='time'
                                                placeholder='Duration'
                                                value={time}
                                                onChange={(ev) => handleTime(ev)}
                                            />
                                        </Col>
                                        </Row>
                                    </Form.Group>
                                </Form>
                            </Container>
                        </>
            }
        </>
    );
}

export default NewSession;