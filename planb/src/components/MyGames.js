import {Button, Col, Container, Form, Row} from "react-bootstrap";
import GameCard from './GameCard';
import {PersonCircle, Plus, PlusLg, Search} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import API from "../API";
import React, {useState} from "react";


function MyGames(props) {
    const [newSession, setNewSession] = useState(false);

    const handleNewSession = (event) => {
        setNewSession(true);
    }

    return (
        <>
            {
                newSession ?
                    <Navigate replace to="/newsession"/>
                    :
                    <Container id="nav" className="pb-2 border-bottom border-secondary">
                        <Row className='justify-content-between mt-2'>
                            <Col xs={6}>
                                <Plus size={30} color="grey"/>
                                <span className="text-muted align-middle">Add game</span>
                            </Col>
                            <Col xs={2}>
                                <a href='/profile'>
                                    <PersonCircle
                                        className='mt-1'
                                        size={30}
                                        color="grey"
                                    />
                                </a>
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

                <Container className="mt-5">
                <Row className='fixed-bottom mx-4 mb-4'>
                <Button
                variant="primary"
                type="submit"
                onClick={() => handleNewSession()}>
                New Session
                </Button>
                </Row>
                </Container>
                </>
            }
        </>
    );
}

export default MyGames;