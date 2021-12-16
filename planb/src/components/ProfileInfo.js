import {Button, Col, Container, Row, Placeholder} from "react-bootstrap";
import {ChevronLeft, PersonCircle} from "react-bootstrap-icons";
import React from "react";
import API from '../API'
import {Link} from "react-router-dom";

function ProfileInfo(props) {
    const handleLogout = (event) => {
        API.signOutUser()
            .then(() => props.setIsSignedIn(false))
            .catch((error) => console.log(error));
    }

    return (
        <>
            <Container id="nav" className="pb-2">
                <Row className='justify-content-between mt-2'>
                    <Col xs={6}>
                        <ChevronLeft size={25} color="grey"/>
                        <span className="text-muted align-middle">Back</span>
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
                            props.user.email
                        }
                    </Col>
                </Row>
                <Row className='fixed-bottom mx-4 mb-4'>
                    {props.userLoading ?
                        <Placeholder animation="glow">
                            <Placeholder.Button xs={12} bg='danger' aria-hidden="true"/>
                        </Placeholder>
                        :
                        <Button
                            variant="danger"
                            onClick={() => handleLogout()}>
                            Log out
                        </Button>
                    }
                </Row>
            </Container>
        </>
    );
}

export default ProfileInfo;