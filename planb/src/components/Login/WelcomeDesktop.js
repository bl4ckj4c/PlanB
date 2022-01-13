import {Col, Container, Row} from "react-bootstrap";
import logo from "../../logo/desktop_logo.svg"

function WelcomeDesktop(props) {
    return (
        <Container style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Row className="mx-auto" style={{width: 270}}>
                <img src={logo} alt="logo"/>
            </Row>
            <Row className="mt-4">
                <h2 className="text-center">Ooops! It seems you're not using a mobile device</h2>
                <p className="text-center">This web application is not intended to be used on a desktop device</p>
            </Row>
        </Container>
    );
}

export default WelcomeDesktop;