import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CollectionDataService from "../services/collections";
import collections from "../services/collections";

import "./NewCollection.css"

const NewCollection = ({ user, handleSave }) => {

    const [show, setShow] = useState(false);
    const [value, setValue] = useState("");
    var data = {
        user_id: user.googleId,
        name: value
    }
    const handleShow = () => {
        setShow(true);
      }
    const handleClose = () => {
        setShow(false);
    }

    const handleChange = e => {
        setValue(e.target.value);
    }

    // const handleSave = () => {
    //     var data = {
    //         user_id: user.googleId,
    //         name: value
    //     }

    //     CollectionDataService.createCollection(data)
    //         .then(response => {
    //             const newCollections = CollectionDataService.get(data.user_id);
    //             setCollections(newCollections);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // }

    return (
        <div>
            <Button className="collectionButton" onClick={handleShow}>
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
                        <Form.Label className="modalFormLabel">Collection Name</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            required
                            onChange={ handleChange }
                            defaultValue={ "" }
                        />
                        <Button onClick={ () => { handleSave(data); handleClose() } }>Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default NewCollection;