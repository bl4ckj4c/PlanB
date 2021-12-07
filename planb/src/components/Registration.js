import {Card, Container, Form, Button, Col, Row} from 'react-bootstrap';
import {useState, useEffect} from "react";

function Registration(props) {
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [passwordConfirmLogin, setPasswordConfirmLogin] = useState('');
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        if (emailLogin !== '' && passwordLogin !== '' && passwordConfirmLogin !== '') {
            setButtonEnabled(true);
        }
    }, [emailLogin, passwordLogin, passwordConfirmLogin]);

    return (
        <Container fluid className='mt-5'>
            <Row className="text-center mx-2">
                <h1 className="text-center">Register</h1>
            </Row>
            <Form className='mt-5 mx-4'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        placeholder="Email address"
                        value={emailLogin}
                        onChange={(event) => {
                            setEmailLogin(event.target.value);
                        }}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={passwordLogin}
                        onChange={(event) => {
                            setPasswordLogin(event.target.value);
                        }}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword2">
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={passwordConfirmLogin}
                        onChange={(event) => {
                            setPasswordConfirmLogin(event.target.value);
                        }}/>
                </Form.Group>
            </Form>
            <Row className='fixed-bottom mx-4 mb-4'>
                <Button variant="primary" type="submit" disabled={!buttonEnabled}>
                    Register
                </Button>
            </Row>
        </Container>
    );
}

export default Registration;