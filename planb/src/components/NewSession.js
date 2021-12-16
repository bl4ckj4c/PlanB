import {Col, Container, Form, Row} from "react-bootstrap";
import {ChevronLeft, HourglassSplit, People, PersonCircle, Plus} from "react-bootstrap-icons";
import React from "react";

function NewSession(props) {
    return (
        <>
            <Container id="nav" className = "pb-2 border-bottom border-secondary">
                <Row className='justify-content-between mt-2'>
                    <Col xs={6}>
                        <ChevronLeft size={25} color="grey"/>
                        <span className = "text-muted align-middle">Back</span>
                    </Col>
                </Row>
                <Row>
                    <h1 className='m-2'>New Session</h1>
                </Row>
            </Container>
            <Container fluid className='mt-3'>
                <Form as={Row}>
                    <Form.Group className='mb-3' controlId='formNumberOfPlayers'>
                        <Form.Label column>
                            <People size={40}/>
                        </Form.Label>
                        <Col>
                            <Form.Control type='text' placeholder='Number of players'/>
                        </Col>
                    </Form.Group>
                </Form>
                <Form as={Row}>
                    <Form.Group className='mb-3' controlId='formNumberOfPlayers'>
                        <Form.Label column>
                            <HourglassSplit size={40}/>
                        </Form.Label>
                        <Col>
                            <Form.Control type='time' placeholder='Duration'/>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default NewSession;