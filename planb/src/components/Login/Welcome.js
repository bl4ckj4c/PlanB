import {Container, Row} from "react-bootstrap";
import logo from "../../logo/planb_logo.svg"

function Welcome(props) {
    return (
        <Container style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <Row className="mx-auto" style={{width:270}}>
                <img src={logo} alt="logo"/>
            </Row>
        </Container>
    );
}

export default Welcome;