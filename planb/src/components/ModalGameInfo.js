import {Modal, Button} from 'react-bootstrap';

//GameInfo
import GameInfo from './GameInfo';

function ModalGameInfo(props) {
    //props.add === "true"
    const game = props.game;
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {game.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <GameInfo game = {game} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant = "secondary" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

export default ModalGameInfo;