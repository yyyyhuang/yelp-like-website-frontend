import React, {useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const NewCollection = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
      }
    const handleClose = () => {
    setShow(false);
    }

    return (
        <div>
            <Button className="reviewButton" onClick={handleShow}>
                Create New Collection
            </Button>
            <Modal
                show={show}
                aria-labelledby="contained-modal-title-v-center"
                centered
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create New Collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Collection Name</Form.Label>
                        <Form.Control></Form.Control>
                        <Button>Save</Button>
                    </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </div>

    )
}

export default NewCollection;