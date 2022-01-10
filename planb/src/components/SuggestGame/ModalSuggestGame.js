import {Modal, Button, Row, Col, Form, Alert, Spinner, FloatingLabel} from 'react-bootstrap';
import {Dice1, Dice3, Dice5} from "react-bootstrap-icons";

//API
import API from "../../API";

import React, {useState} from "react";

function ModalSuggestGame(props) {
    const [gameName, setGameName] = useState("");
    const [description, setDescription] = useState("");
    const [gameDifficulty, setGameDifficulty] = useState("");
    const [alert, setAlert] = useState({variant: "", msg: ""});
    const [loading, setLoading] = useState(false);
    

    const suggestGame = () => {
        if(gameName === ""){
            setAlert({variant: "warning", msg: "Please enter a game name."});
            return;
        }
        if(description === ""){
            setAlert({variant: "warning", msg: "Please enter a game description."});
            return;
        }
        if(gameDifficulty === ""){
            setAlert({variant: "warning", msg: "Please select a game difficulty."});
            return;
        }
        setLoading(true);
        API.suggestGame(gameName, description, gameDifficulty)
            .then((gameId) => {
                setLoading(false);
                setAlert({variant: "success", 
                msg: "Thank you for suggesting us a new game for our collection. We will handle you request in the next few days."});
                //the modal will show the success message for 3 seconds, and then will disappear if the user doesn't click on X
                window.setTimeout(() => props.onHide(), 3000);
            })
            .catch((error) => {
                setLoading(false);
                setAlert({variant: "warning", msg: "Sorry, something went wrong during your request. Please try again later."});
            });

    }

    return (
        <>
            <Modal
                fullscreen = {props.fullscreen}
                show = {props.show}
                onHide = {props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Suggest Game
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/**Place here all the input you want the user to put */}
                    <SuggestionInfo gameName={gameName} setGameName={setGameName} 
                        description={description} setDescription={setDescription}
                        gameDifficulty={gameDifficulty} setGameDifficulty={setGameDifficulty}
                    />
                    {/**putting a spinner while waiting for API return */}
                    {loading ?
                        <Row className="justify-content-center mt-3">
                            <Col xs={12} sm={4} md={4}>
                                <Spinner
                                    className='mx-auto d-block'
                                    variant="secondary"
                                    animation="border">
                                    <span className="visually-hidden">Waiting for API response...</span>
                                </Spinner>
                            </Col>
                        </Row>
                    :
                        <>
                        {/**showing in modal body the alert related to the insertion of a suggestion */}
                            {alert.variant !== "" &&
                            <Alert className = "mt-3" variant={alert.variant}>{alert.msg}</Alert>
                        }
                        </>
                    }
                </Modal.Body>
                <Modal.Footer as='div'>
                
                {/**showing the send request button only in case the request has not been sent, or is not successfull */}
                {/**showing a close button otherwise*/}
                {alert.variant !== "success" &&
                        
                    <Button
                        className='mx-1'
                        style={{
                            width: '100%'
                        }}
                        variant="success"
                        onClick={() => suggestGame()}>
                        Send suggestion!
                    </Button>    
                }
                </Modal.Footer>
                
            </Modal>
        </>
    );
}
function SuggestionInfo(props) {
    const handleSetGameName = (value) => {
        //game name cannot be longer than 100
        if(value.length > 100)
            value = value.substring(0, 100);
        props.setGameName(value);
    }
    const handleSetDescription = (value) => {
        //game description cannot be longer than 250
        if(value.length > 250)
            value = value.substring(0, 250);
        props.setDescription(value);
    }
    
    return (
        <>
            <Form>
                <Form.Group controlId='gameName'>
                    <FloatingLabel className="mb-3 text-muted" label="Game name" controlId="gameName">
                        <Form.Control
                            placeholder='Game name'
                            value={props.gameName}
                            onChange={(ev) => handleSetGameName(ev.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group className='mt-3' controlId='gameDescription'>
                    <FloatingLabel rows={5} className="mb-3 text-muted" label="Insert here a brief game description" controlId="gameDescription">
                        <Form.Control
                            as='textarea'
                            placeholder='Insert here a brief game description'
                            style={{ height: '140px' }}
                            value={props.description}
                            onChange={(ev) => handleSetDescription(ev.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>
            </Form>
            <Form>
                <div key="radio-key" className="mt-3">
                    <Row className="align-items-center mx-auto p-3">
                        <Col xs={4}>
                            <div className="align-items-center d-flex flex-column">
                                <Dice1 className='mx-2'/>
                                Easy
                            </div>
                            <Form.Check
                                className="text-center"
                                name="radio-key"
                                type="radio"
                                id="radio-easy"
                                onChange={(event) => {
                                    if (event.target.checked)
                                        props.setGameDifficulty('Easy');
                                }}
                            />
                        </Col>
                        <Col xs={4}>
                            <div className="align-items-center d-flex flex-column">
                                <Dice3 className='mx-2'/>
                                Mid
                            </div>
                            <Form.Check
                                className="text-center"
                                name="radio-key"
                                type="radio"
                                id="radio-mid"
                                onChange={(event) => {
                                    if (event.target.checked)
                                        props.setGameDifficulty('Mid');
                                }}
                            />
                        </Col>
                        <Col xs={4}>
                            <div className="align-items-center d-flex flex-column">
                                <Dice5 className='mx-2'/>
                                Hard
                            </div>
                            <Form.Check
                                className="text-center"
                                name="radio-key"
                                type="radio"
                                id="radio-hard"
                                onChange={(event) => {
                                    if (event.target.checked)
                                        props.setGameDifficulty('Hard');
                                }}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        </>
    );
}

export default ModalSuggestGame;