import {Container, Form, Button, Row, Toast, ToastContainer, FloatingLabel, Spinner} from 'react-bootstrap';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import API from '../API'
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {ExclamationCircle, QuestionCircle} from "react-bootstrap-icons";

function Login(props) {
    const [emailLogin, setEmailLogin] = useState('');
    const [validEmailLogin, setValidEmailLogin] = useState('initial');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [validPasswordLogin, setValidPasswordLogin] = useState('initial');
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(API.auth);
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleLogin = async (event) => {
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

        // Start login
        setButtonLoading(true);
        if (emailFlag && passwordFlag) {
            const res = await signInWithEmailAndPassword(emailLogin, passwordLogin);
        }
        setButtonLoading(false);
    }

    useEffect(() => {
        if (!loading) {
            if (user !== undefined) {
                props.setIsSignedIn(true);
            } else {
                props.setIsSignedIn(false);

                if (error !== undefined && error.code === 'auth/invalid-email') {
                    setErrorMessage('Invalid email');
                    setShow(true);
                } else if (error !== undefined && error.code === 'auth/user-not-found') {
                    setErrorMessage('User not found');
                    setShow(true);
                } else if (error !== undefined && error.code === 'auth/wrong-password') {
                    setErrorMessage('Invalid password');
                    setShow(true);
                } else if (error !== undefined && error.code === 'auth/too-many-requests') {
                    setErrorMessage('We are experiencing some server issues, please retry later');
                    setShow(true);
                } else if (error !== undefined && error.code === 'auth/quota-exceeded') {
                    setErrorMessage('We are experiencing some server issues, please retry later.');
                    setShow(true);
                } else {
                    setErrorMessage('We are experiencing some server issues, please retry later.');
                    setShow(true);
                }
            }
        }
    }, [loading]);

    return (
        <Container fluid className='mt-1'>
            <ToastContainer className='mt-4' position='top-center'>
                <Toast bg="light" onClose={() => setShow(false)} show={show}>
                    <Toast.Header className="text-danger">
                        <ExclamationCircle className="me-2"/>
                        <strong className="me-auto">Login failed</strong>
                    </Toast.Header>
                    <Toast.Body>{errorMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Container fluid className='mt-5'>
                <Row className="text-center mx-2">
                    <h1 className="text-center">Login</h1>
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
                        <Form.Control.Feedback type="invalid">
                            A minimum of 6 characters are required
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Form>
                <Row className='fixed-bottom mx-4 mb-4'>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleLogin}>
                        {
                            buttonLoading ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"/>
                                :
                                'Login'
                        }
                    </Button>
                    <Link to="/register" className='text-center text-muted mt-2'>
                        Otherwise sign up!
                    </Link>
                </Row>
            </Container>
        </Container>
    );
}

export default Login;