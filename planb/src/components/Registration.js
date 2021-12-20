import {Card, Container, Form, Button, Col, Row, Toast, ToastContainer, FloatingLabel, Spinner} from 'react-bootstrap';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import API from "../API";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {ExclamationCircle} from "react-bootstrap-icons";

function Registration(props) {
    const [emailLogin, setEmailLogin] = useState('');
    const [validEmailLogin, setValidEmailLogin] = useState('initial');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [validPasswordLogin, setValidPasswordLogin] = useState('initial');
    const [passwordConfirmLogin, setPasswordConfirmLogin] = useState('');
    const [validPasswordConfirmLogin, setValidPasswordConfirmLogin] = useState('initial');
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(API.auth);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const handleRegistration = async (event) => {
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let emailFlag = false;
        let passwordFlag = false;

        // Email check
        if (regexEmail.test(emailLogin)) {
            // Valid email address
            setValidEmailLogin('valid');
            emailFlag = true;
        } else {
            // Invalid email
            setValidEmailLogin('invalid');
            emailFlag = false;
        }

        // Password check
        if (passwordLogin.length >= 6) {
            // Valid password
            setValidPasswordLogin('valid');
            passwordFlag = true;
        } else {
            // Invalid password
            setValidPasswordLogin('invalid');
            passwordFlag = false;
        }

        // Start registration
        setButtonLoading(true);
        if (emailFlag && passwordFlag) {
            const res = await createUserWithEmailAndPassword(emailLogin, passwordLogin);
        }
        setButtonLoading(false);
    }

    useEffect(async () => {
        if (!loading) {
            if (user !== undefined) {
                const resDb = await API.createNewUserGameList(user.user.uid);
                props.setIsSignedIn(true);
            } else {
                props.setIsSignedIn(false);

                if (error !== undefined && error.code === 'auth/invalid-email') {
                    setErrorMessage('Invalid email');
                    setShow(true);
                } else if (error !== undefined && error.code === 'auth/email-already-in-use') {
                    setErrorMessage('User already registered, please use the login page');
                    setShow(true);
                } else if (error !== undefined && error.code === 'auth/too-many-requests') {
                    setErrorMessage('We are experiencing some server issues, please retry later.');
                    setShow(true);
                } else if (error !== undefined && error.code === 'auth/quota-exceeded') {
                    setErrorMessage('We are experiencing some server issues, please retry later.');
                    setShow(true);
                } else if (error !== undefined) {
                    setErrorMessage('We are experiencing some server issues, please retry later.');
                    setShow(true);
                }
            }
        }
    }, [loading]);

    useEffect(() => {
        if (emailLogin !== '' && passwordLogin !== '' && passwordConfirmLogin !== '') {
            setButtonEnabled(true);
        } else {
            setButtonEnabled(false);
        }
    }, [emailLogin, passwordLogin, passwordConfirmLogin]);

    useEffect(() => {
        if (passwordConfirmLogin !== '' && passwordLogin !== passwordConfirmLogin) {
            setValidPasswordConfirmLogin('invalid');
        } else {
            setValidPasswordConfirmLogin('valid');
        }
    }, [passwordLogin, passwordConfirmLogin]);

    return (
        <Container fluid className='mt-1'>
            <ToastContainer className='mt-4' position='top-center'>
                <Toast bg="light" onClose={() => setShow(false)} show={show}>
                    <Toast.Header className="text-danger">
                        <ExclamationCircle className="me-2"/>
                        <strong className="me-auto">Registration failed</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Container fluid className='mt-5'>
                <Row className="text-center mx-2">
                    <h1 className="text-center">Register</h1>
                </Row>
                <Form className='mt-5 mx-4'>
                    <FloatingLabel className="mb-3 text-muted" label="Email address" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            value={emailLogin}
                            onChange={(event) => setEmailLogin(event.target.value)}
                            isInvalid={validEmailLogin === 'invalid'}/>
                        <Form.Control.Feedback type="invalid">
                            Please insert a valid email
                        </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel className="mb-3 text-muted" label="Password" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={passwordLogin}
                            onChange={(event) => setPasswordLogin(event.target.value)}
                            isInvalid={validPasswordLogin === 'invalid'}/>
                        {validPasswordLogin === 'invalid' ?
                            <Form.Control.Feedback type="invalid">
                                A minimum of 6 characters are required
                            </Form.Control.Feedback>
                            :
                            <Form.Text>
                                A minimum of 6 characters are required
                            </Form.Text>
                        }
                    </FloatingLabel>
                    <FloatingLabel className="mb-3 text-muted" label="Confirm password" controlId="formBasicPassword2">
                        <Form.Control
                            type="password"
                            placeholder="Confirm password"
                            value={passwordConfirmLogin}
                            onChange={(event) => setPasswordConfirmLogin(event.target.value)}
                            isInvalid={validPasswordConfirmLogin === 'invalid'}/>
                        <Form.Control.Feedback type="invalid">
                            Passwords not matching
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form>
                <Row className='fixed-bottom mx-4 mb-4'>
                    <Button
                        variant="primary"
                        disabled={!buttonEnabled}
                        onClick={handleRegistration}>
                        {
                            buttonLoading ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"/>
                                :
                                'Register'
                        }
                    </Button>
                    <Link to="/" className='text-center text-muted mt-2'>
                        Already got an account?
                    </Link>
                </Row>
            </Container>
        </Container>
    );
}

export default Registration;