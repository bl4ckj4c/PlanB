import {Modal, Button, Row, Spinner} from 'react-bootstrap';
//API
import API from "../API";

//GameInfo
import GameInfo from './GameInfo';
import React, {useState} from "react";

function ModalGameInfo(props) {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    //props.add === "true"
    const game = props.game;
    const addGame = () => {
        //console.log(game);
        setButtonLoading(true);
        API.insertOrRemoveUserGame(game.id, "insert")
            .then((data) => {
                console.log(data);
                props.onHide();
                setButtonLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setButtonLoading(false);
            });
    }

    const deleteGame = () => {
        //console.log(game);
        setButtonLoading(true);
        API.insertOrRemoveUserGame(game.id, "remove")
            .then((data) => {
                console.log(data);
                props.onHide();
                setButtonLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setButtonLoading(false);
            });
    }

    const showRules = () => {

    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {game.Title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GameInfo game={game}/>
                </Modal.Body>
                <Modal.Footer as='div'>
                    {props.add === "true" ?
                        <Button
                            className='mx-1'
                            style={{
                                width: '100%'
                            }}
                            variant="success"
                            onClick={() => addGame()}>
                            {buttonLoading ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"/>
                                :
                                'Add'
                            }
                        </Button>
                        :
                        <Button
                            className='mx-1'
                            style={{
                                width: '100%'
                            }}
                            variant="danger"
                            onClick={() => setShowDeleteWarning(true)}>
                            {buttonLoading ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"/>
                                :
                                'Delete'
                            }
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showDeleteWarning}
                onHide={() => setShowDeleteWarning(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Are you sure to delete this game from your collection?
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        </>
    );
}

export default ModalGameInfo;