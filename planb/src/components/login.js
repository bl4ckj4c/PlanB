import {Card, Container, Form, Button, Col, Row} from 'react-bootstrap';
import {useState} from "react";
import {Link} from "react-router-dom";

function Login(props) {
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');

    return (
        <Container fluid className='mt-5'>
            <Row className="text-center mx-2">
                <h1 className="text-center">Login</h1>
            </Row>
            <Form className='mt-5 mx-4'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Email address"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
            </Form>
            <Row className='fixed-bottom mx-4 mb-4'>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <Link to="/register" className='text-center text-muted mt-2'>
                    Otherwise sign up!
                </Link>
            </Row>
        </Container>
    );
}

export default Login;