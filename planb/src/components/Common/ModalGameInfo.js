import {Modal, Button, Row, Spinner, Col} from 'react-bootstrap';
import {Navigate} from "react-router-dom";

//API
import API from "../../API";

//GameInfo
import GameInfo from './GameInfo';
import React, {useState} from "react";
import {CaretLeft} from 'react-bootstrap-icons';

function ModalGameInfo(props) {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonConfirmLoading, setButtonConfirmLoading] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [page, setPage] = useState("");

    //props.add === "true"
    const game = props.game;
    const addGame = () => {
        //console.log(game);
        setButtonLoading(true);
        API.insertOrRemoveUserGame(game.id, "insert")
            .then(() => {
                props.addusergame(game.id);
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
        setButtonConfirmLoading(true);
        API.insertOrRemoveUserGame(game.id, "remove")
            .then(() => {
                props.deleteusergame(game.id);
                setButtonConfirmLoading(false);
                setShowDeleteWarning(false);
                props.onHide();
            })
            .catch((err) => {
                console.log(err);
                setButtonConfirmLoading(false);
                setShowDeleteWarning(false);
            });
        setButtonConfirmLoading(false);
        setShowDeleteWarning(false);
        props.onHide();
    }

    const showRules = () => {

    }

    return (
        <>
            {page === "Home" && <Navigate replace to="/"/>}
            <Modal
                fullscreen={props.fullscreen}
                show={props.show}
                onHide={props.onHide}
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
                    {
                        props.newSession ?
                            <Button className='mx-1'
                                    style={{width: '100%', 'padding-left':'0'}}
                                    variant="secondary"
                                    onClick={() => setPage("Home")}>
                                <Row>
                                    <Col xs={2}>
                                        <CaretLeft size={22}/>
                                    </Col>
                                    <Col xs={8}>
                                        Back to <strong>My Games</strong>
                                    </Col>
                                    <Col xs={1} />
                                </Row>
                            </Button>
                            :
                            props.add === "true" ?
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
                                    onClick={() => {
                                        setShowDeleteWarning(true);
                                        //props.setShow(false);
                                    }}>
                                    {buttonLoading ?
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"/>
                                        :
                                        'Remove'
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
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Attention!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure to remove this game from your collection?
                </Modal.Body>
                <Modal.Footer as='div'>
                    <Button
                        className='mx-1'
                        style={{
                            width: '100%'
                        }}
                        variant="outline-secondary"
                        onClick={() => setShowDeleteWarning(false)}>
                        Keep it
                    </Button>
                    <Button
                        className='mx-1'
                        style={{
                            width: '100%'
                        }}
                        variant="danger"
                        onClick={() => deleteGame()}>
                        {buttonConfirmLoading ?
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"/>
                            :
                            'Remove it'
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalGameInfo;