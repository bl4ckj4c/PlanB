import {Col, Container, Form, Row, Button, Badge, Alert} from "react-bootstrap";
import {ChevronLeft, HourglassSplit, People, PersonCircle, Plus, Dice1, Dice3, Dice5, X} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import API from "../../API";
import {Categories, AddCategory} from "../Common/Categories";
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

function NewSession(props) {
    const {
        games,
        sessionPlayers, setSessionPlayers,
        sessionHours, setSessionHours,
        sessionMinutes, setSessionMinutes,
        sessionCategories, setSessionCategories,
        sessionDifficulty, setSessionDifficulty
    } = props;

    const minDuration = 15; // in minutes
    const maxDuration = 720; // in minutes
    const durationStep = 15; // in minutes

    const [page, setPage] = useState('');

    //const [time, setTime] = useState(sessionHours === undefined ? "" : (sessionHours + ":" + sessionMinutes));
    const [sliderValue, setSliderValue] = useState(sessionHours === undefined ? 60 : fromTimeToMinutes(sessionHours, sessionMinutes));
    const [sliderValueString, setSliderValueString] = useState(sessionHours === undefined ? "1h" : fromTimeToSliderLabel(sessionHours, sessionMinutes));

    const [confirmedCategories, setConfirmedCategories] = useState(sessionCategories);
    const [allCategories, setAllCategories] = useState([]);
    const [showAddTag, setShowAddTag] = useState(true);

    const [valid, setValid] = useState(false);
    const [autoHidingAlert, setAutoHidingAlert] = useState(false);

    useEffect(() => {
        const c = [];
        games.forEach(game => {
            for (const cat of game.Categories) {
                if (!c.find(tmp => tmp === cat)) {
                    c.push(cat);
                }
            }
        });
        setAllCategories(c);
    }, []);

    useEffect(() => {
        if (confirmedCategories.length === allCategories.length || allCategories.length === 0)
            setShowAddTag(false);
        else
            setShowAddTag(true);
    }, [allCategories, confirmedCategories]);

    function fromTimeToMinutes(hours, minutes) {
        // 12, 45 --> 12*60 + 45
        let h = parseInt(hours);
        let m = parseInt(minutes);
        return h * 60 + m;
    }

    function fromTimeToSliderLabel(hours, minutes) {
        // 12, 45 --> 12h 45m
        let h = hours.toString();
        let m = minutes.toString();
        if (m !== '0') {
            return h + 'h ' + m + 'm';
        } else
            return h + 'h';
    }

    useEffect(() => {
        setSliderValueString(sessionHours === undefined ? "1h" : fromTimeToSliderLabel(sessionHours, sessionMinutes));
    }, [page]);

    function fromValToSliderLabel(val) {
        // 125 --> 2h 5m
        if (val < minDuration + 5) return "< 15m";
        if (val > maxDuration - 5) return "> 12h";
        let h = Math.floor(val / 60);
        let m = val - h * 60;
        h = h.toString();
        m = m.toString();
        if (m !== '0')
            return h + 'h ' + m + 'm';
        else
            return h + 'h';
    }

    useEffect(() => {
        let s = fromValToSliderLabel(sliderValue);
        setSliderValueString(s);
    }, [sliderValue, page]);

    const handleBackButton = (event) => {
        setPage('mygames');
    }

    const handleFindGames = (event) => {
        if (valid) {
            setPage('gamesfound');
        } else {
            onShowAlert().then(r => window.setTimeout(() => {
                setAutoHidingAlert(false)
            }, 2000));
        }
    }

    const onShowAlert = async () => {
        await setAutoHidingAlert(true);
    }

    const handlePlayers = (event) => {
        setSessionPlayers(event.target.value);
    }

    /*const handleTime = async (event) => {
        const t = event.target.value;
        await setTime(t);
        const h = t.split(':')[0];
        const m = t.split(':')[1];
        setSessionHours(h);
        setSessionMinutes(m);
    }*/

    const handleTimeSlider = async (event) => {
        const val = event.target.value;
        setSliderValue(val);
        let h = Math.floor(val / 60);
        let m = val - h * 60;
        h = h.toString();
        m = m.toString();
        setSessionHours(h);
        setSessionMinutes(m);
    }

    const handleSliderTooltipLabel = async (val) => {
        let h = Math.floor(val / 60);
        let m = val - h * 60;
        h = h.toString();
        m = m.toString();
        return h + "h " + m + "m";
    }

    useEffect(() => {
        if (sessionPlayers === undefined ||
            sessionPlayers === '' ||
            sessionHours === undefined ||
            sessionHours === '' ||
            sessionMinutes === undefined ||
            sessionMinutes === '' ||
            sessionCategories === undefined ||
            sessionCategories === '' ||
            sessionDifficulty === '') {
            setValid(false);
        } else {
            setValid(true);
        }
    }, [sessionPlayers, sessionHours, sessionMinutes, sessionCategories, sessionDifficulty]);


    return (
        <>
            {
                games.length === 0 ?
                    <Navigate replace to="/mygames"/>
                    :
                    page === 'mygames' ?
                        <Navigate replace to="/mygames"/>
                        :
                        page === 'gamesfound' ?
                            <Navigate replace to="/gamesfound"/>
                            :
                            <>
                                <Container id="nav"
                                           className="pb-2 my-border-color border-bottom border-top-0 border-start-0 border-end-0">
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
                                        <h1 className='m-2'>Filter</h1>
                                    </Row>
                                </Container>
                                <Container fluid className='mt-3 p-5'>
                                    <Form onSubmit={(event => {
                                        event.preventDefault();
                                    })}>
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
                                                        min={1}
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
                                                    {/*<Form.Control
                                                        type='time'
                                                        placeholder='Duration'
                                                        value={time}
                                                        onChange={(ev) => handleTime(ev)}
                                                    />*/}
                                                    <Row>
                                                        <RangeSlider
                                                            value={sliderValue}
                                                            defaultValue={60}
                                                            min={minDuration}
                                                            max={maxDuration}
                                                            step={durationStep}
                                                            tooltip={'off'}
                                                            onChange={(ev) => handleTimeSlider(ev)}
                                                        />
                                                    </Row>
                                                    <Row>
                                                        <Col xs={1}/>
                                                        <Col xs={9} className="text-center">
                                                            {
                                                                sliderValueString
                                                            }
                                                        </Col>
                                                        <Col xs={2}/>
                                                    </Row>
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
                                                        checked={sessionDifficulty === 'Easy'}
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
                                                        checked={sessionDifficulty === 'Mid'}
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
                                                        checked={sessionDifficulty === 'Hard'}
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
                                                    setConfirmedCategories={setConfirmedCategories}
                                                    setCategories={setSessionCategories}/>
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
                                <Container className="flex justify-content-between fixed-bottom">
                                    {
                                        autoHidingAlert ?
                                            <Container className="mb-5 pb-2">
                                                <Alert variant="warning" className="text-center">
                                                    Some filters are still undefined!
                                                </Alert>
                                            </Container>
                                            :
                                            <div/>
                                    }
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
                                </Container>
                            </>
            }
        </>
    );
}

export default NewSession;