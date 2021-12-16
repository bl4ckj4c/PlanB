import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Col, Row, Modal, CloseButton, Container, FormCheck} from 'react-bootstrap';
import {Clock, Dice1, Dice3, Dice5, People, X, Plus, Dash, Check} from 'react-bootstrap-icons';

function Categories(props) {
    const {confirmedCategories, setConfirmedCategories} = props;

    return confirmedCategories.map((item, index) => <Category category={item}
                                                              confirmedCategories={confirmedCategories}
                                                              setConfirmedCategories={setConfirmedCategories}/>);
}

function Category(props) {
    const {category, confirmedCategories, setConfirmedCategories} = props;

    const handleRemovingTag = async () => {
        let newCategories = await confirmedCategories.filter(cat => cat !== category);
        setConfirmedCategories(newCategories);
    }

    return (
        <Badge pill bg="secondary" style={{"line-height": "2.09", "margin": "2px"}}>
            {category}
            <Button className="m-0 p-0 bg-secondary border-0"
                    style={{"height": "18", "width": "18", "vertical-align": "middle", "font-size": "0"}}
                    onClick={() => handleRemovingTag()}
            >
                <X size={18}/>
            </Button>
        </Badge>);
}

function AddCategory(props) {
    const {allCategories, categories, setCategories, confirmedCategories, setConfirmedCategories} = props;

    const [modal, setModal] = useState(false);

    const handleAddCategory = () => {
        setModal(true);
        setCategories([]);
    }

    return (
        <>
            <Badge pill
                   bg="secondary"
                   style={{"margin": "2px", "display":"inline-block"}}>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button className="m-0 p-0 bg-secondary border-0"
                        onClick={() => handleAddCategory()}
                >
                    <Plus size={18}/>
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
            </Badge>


            {/* Modal for adding a new category tag */}
            <Modal
                show={modal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Game categories
                    </Modal.Title>
                    <CloseButton onClick={() => setModal(false)}/>
                </Modal.Header>
                <Modal.Body>
                    <h6 style={{"margin-bottom": "3%"}}>Select one or more game categories you would like to play</h6>
                    <Container>
                        <GameCategoriesList allCategories={allCategories}
                                            categories={categories}
                                            setCategories={setCategories}
                                            confirmedCategories={confirmedCategories}/>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        setModal(false);
                        let newCategories = confirmedCategories;
                        categories.forEach(cat => newCategories = [...newCategories, cat]);
                        setConfirmedCategories(newCategories);
                    }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </>);
}

function GameCategoriesList(props) {
    const {allCategories, categories, setCategories, confirmedCategories} = props;

    return allCategories.map((item, index) => <CategoryListItem
        category={item}
        categories={categories}
        setCategories={setCategories}
        confirmedCategories={confirmedCategories}/>
    );
}

function CategoryListItem(props) {
    const {category, categories, setCategories, confirmedCategories} = props;

    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [alreadyConfirmed, setAlreadyConfirmed] = useState(false);

    const handleSwitch = async (event) => {
        if(alreadyAdded)
        {
            setAlreadyAdded(false);
            let newCategories = await categories.filter(cat => cat !== category);
            setCategories(newCategories);
        }
        else
        {
            setAlreadyAdded(true);
            let newCategories = [...categories, category];
            setCategories(newCategories);
        }
    }

    useEffect(async () => {
        let foundLen = await confirmedCategories.filter(cat => cat === category).length;
        if (foundLen !== 0)
            setAlreadyConfirmed(true);
    }, []);

    return (
        <>
            <Container>
                <Row className="p-1 mx-auto m-1 text-black align-content-center text-start">
                    <Col xs={9}>
                        {category}
                    </Col>
                    <Col xs={1}>
                        {
                            alreadyConfirmed ?
                                <FormCheck
                                    type="switch"
                                    checked
                                    disabled
                                />
                                :
                                <FormCheck
                                    type="switch"
                                    checked={alreadyAdded}
                                    onChange={() => handleSwitch()}
                                />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export {Categories, AddCategory};