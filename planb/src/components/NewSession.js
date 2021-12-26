import {Col, Container, Form, Row, Button, Badge} from "react-bootstrap";
import {ChevronLeft, HourglassSplit, People, PersonCircle, Plus, Dice1, Dice3, Dice5, X} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import API from "../API";
import { Categories, AddCategory } from "./Categories";

function NewSession(props) {
    const {
        games,
        sessionPlayers, setSessionPlayers,
        sessionHours, setSessionHours,
        sessionMinutes, setSessionMinutes,
        sessionCategories, setSessionCategories,
        sessionDifficulty, setSessionDifficulty
    } = props;

    const [page, setPage] = useState('');

    const [time, setTime] = useState();

    const [confirmedCategories, setConfirmedCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [showAddTag, setShowAddTag] = useState(true);

    useEffect(() => {
        const c = [];
        games.forEach(game => {
            for(const cat of game.Categories)
            {
                if(!c.find(tmp => tmp === cat)) {
                    c.push(cat);
                }
            }
        });
        setAllCategories(c);
    }, []);

    useEffect(() => {
        if (confirmedCategories.length === allCategories.length)
            setShowAddTag(false);
        else
            setShowAddTag(true);
    }, [allCategories, confirmedCategories]);

    const handleBackButton = (event) => {
        setPage('mygames');
    }

    const handleFindGames = (event) => {
        setPage('gamesfound');
    }

    const handlePlayers = (event) => {
        setSessionPlayers(event.target.value);
    }

    const handleTime = async (event) => {
        const t = event.target.value;
        await setTime(t);
        const h = t.split(':')[0];
        const m = t.split(':')[1];
        setSessionHours(h);
        setSessionMinutes(m);
    }

    return (
        <>
            {
                page === 'mygames' ?
                    <Navigate replace to="/mygames"/>
                    :
                    page === 'gamesfound' ?
                        <Navigate replace to="/gamesfound"/>
                        :
                        <>
                            <Container id="nav" className="pb-2 border-bottom border-secondary">
                                <Row className='justify-content-between mt-2'>
                                    <Col xs={6}>
                                        <Button
                                            type="submit"
                                            className="bg-white border-0 p-0"
                                            onClick={() => handleBackButton()}>
                                            <ChevronLeft size={25} color="grey"/>
                                            <span className="text-muted align-middle">Back</span>
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
                                                    value={sessionPlayers}
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
                                <Form>
                                    <div key="radio-key" className="mb-3">
                                        <Row className="align-items-center mx-auto p-3">
                                            <Col xs={4}>
                                                <div className="text-center">
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
                                                            setSessionDifficulty('Easy');
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={4}>
                                                <div className="text-center">
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
                                                            setSessionDifficulty('Mid');
                                                    }}
                                                />
                                            </Col>
                                            <Col xs={4}>
                                                <div className="text-center">
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
                                                            setSessionDifficulty('Hard');
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Form>
                            </Container>
                            <Container>
                                <Row>
                                    <h2 className='m-2'>Categories</h2>
                                </Row>
                                <Container>
                                    <Categories confirmedCategories={confirmedCategories}
                                                setConfirmedCategories={setConfirmedCategories}/>
                                    {
                                        showAddTag ?
                                            <AddCategory allCategories={allCategories}
                                                         categories={sessionCategories}
                                                         setCategories={setSessionCategories}
                                                         confirmedCategories={confirmedCategories}
                                                         setConfirmedCategories={setConfirmedCategories}/>
                                            :
                                            <div/>
                                    }

                                </Container>
                            </Container>
                            <Container className="mt-5">
                                <Row className='fixed-bottom mx-4 mb-4'>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        onClick={() => handleFindGames()}>
                                        Search among your games
                                    </Button>
                                </Row>
                            </Container>
                        </>
            }
        </>
    );
}

export default NewSession;