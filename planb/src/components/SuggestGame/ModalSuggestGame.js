import {Modal, Button, Row, Col, Form, Alert, Spinner, FloatingLabel} from 'react-bootstrap';
import {Dice1, Dice3, Dice5} from "react-bootstrap-icons";

//API
import API from "../../API";

import React, {useState} from "react";

function ModalSuggestGame(props) {
    const [gameName, setGameName] = useState("");
    const [description, setDescription] = useState("");
    const [alert, setAlert] = useState({variant: "", msg: ""});
    const [loading, setLoading] = useState(false);
    

    const suggestGame = () => {
        if(gameName === ""){
            setAlert({variant: "warning", msg: "Please enter a game name."});
            return;
        }
        setLoading(true);
        API.suggestGame(gameName, description)
            .then((gameId) => {
                setLoading(false);
                setAlert({variant: "success", 
                msg: "Thank you for suggesting us a new game!\nLook to my coming on the first light of the fifth day, at dawn look to the east 🧙‍♂️"});
                //the modal will show the success message for 3 seconds, and then will disappear if the user doesn't click on X
                //window.setTimeout(() => props.onHide(), 6000);
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
                        disabled = {alert.variant === "success"}
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
                            disabled = {props.disabled}
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
                            disabled = {props.disabled}
                            style={{ height: '140px' }}
                            value={props.description}
                            onChange={(ev) => handleSetDescription(ev.target.value)}
                        />
                    </FloatingLabel>
                </Form.Group>
            </Form>
        </>
    );
}

export default ModalSuggestGame;