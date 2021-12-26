import {Modal, Button, Row} from 'react-bootstrap';
//API
import API from "../API";

//GameInfo
import GameInfo from './GameInfo';

function ModalGameInfo(props) {
    //props.add === "true"
    const game = props.game;
    const addGame = () => {
      //console.log(game);
      API.insertOrRemoveUserGame(game.id, "insert")
      .then((data)=> console.log(data))
      .catch((err) => console.log(err));
    }
    const deleteGame = () => {
      //console.log(game);
      API.insertOrRemoveUserGame(game.id, "remove")
        .then((data)=> console.log(data))
        .catch((err) => console.log(err));
    }
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
            <Row className='align-items-center justify-content-center mt-4'>
              {props.add === "true" ?
                <Button variant = "success" onClick={() => addGame()}>Add</Button>
              :
                <Button variant = "danger" onClick={() => deleteGame()}>Delete</Button>
              }
            </Row>
        </Modal.Body>
      </Modal>
    );
  }

export default ModalGameInfo;