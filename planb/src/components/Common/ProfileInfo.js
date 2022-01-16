import {Button, Col, Container, Row, Placeholder, Spinner} from "react-bootstrap";
import {ChevronLeft, PersonCircle} from "react-bootstrap-icons";
import React, {useState} from "react";
import API from '../../API'
import {Navigate} from "react-router-dom";

function ProfileInfo(props) {
    const [page, setPage] = useState('');

    const handleLogout = (event) => {
        API.signOutUser()
            .then(() => {
                props.setIsSignedIn(false);
                setPage('login');
            })
            .catch((error) => console.log(error));
    }

    const handleBackButton = (event) => {
        setPage('mygames');
    }

    return (
        <>
            {page !== '' && <Navigate replace to={`/${page}`}/>}
            {
                <>
                    <Container id="nav" className="pb-2">
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
                    </Container>
                    <Container>
                        <Row className='m-5 text-muted'>
                            <PersonCircle size={90}/>
                        </Row>
                        <Row className='align-items-center'>
                            <Col className='text-muted text-center'>
                                Email
                            </Col>
                        </Row>
                        <Row className='align-items-center'>
                            <Col className='text-center'>
                                {props.userLoading ?
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder bg='secondary' xs={4}/>
                                    </Placeholder>
                                    :
                                    (props.user !== null ?
                                        props.user.email :
                                        <Navigate replace to="/login"/>)
                                }
                            </Col>
                        </Row>
                        <Row className='fixed-bottom mx-4 mb-4'>
                            <Button
                                variant="danger"
                                onClick={() => handleLogout()}
                                disabled={props.userLoading}>
                                {props.userLoading ?
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"/>
                                    :
                                    'Log out'
                                }
                            </Button>
                        </Row>
                    </Container>
                </>
            }
        </>

    );
}

export default ProfileInfo;