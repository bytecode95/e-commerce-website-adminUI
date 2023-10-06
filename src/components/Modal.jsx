import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import beforeimage from "../assets/picture.png";
import instance from "../service/axiosOrder.js";


function ModalBtn() {
    const {id} = useParams()

    // const [name, setName] = useState('');
    // const [qty, setQty] = useState('');
    // const [price, setPrice] = useState('');
    const [image, setImage] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function uploadImage(e) {
        setImage((e.target.files[0]));
    }

    useEffect(() => {

    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        // Send an HTTP PUT request to update the product by product_id
        instance.put(`/updateproduct/${id}`)
            .then((response) => {
                console.log('Product updated successfully');
                // Redirect or show a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors
            });
    };







    return (
        <>
            <Button variant="success" onClick={handleShow}>
                <span><EditIcon/>Update</span>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="mt-5 fs-3 fw-bold text-center">Product Update Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group style={{cursor: 'pointer', height: '300px', width: '300px'}}>
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt="upload image" className="display-image"/>
                        ) : (
                            <img src={beforeimage} alt="upload image" className="display-image"/>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3 p-2">
                        <Form.Label>Upload Files here</Form.Label>
                        <Form.Control onChange={uploadImage} type="file" multiple/>
                    </Form.Group>

                    <Form.Group className="mt-2 p-2">
                        <Form.Label>Name of the Product</Form.Label>
                        <Form.Control id="add-name" type="text" placeholder="enter product name"/>
                        <Form.Label>Qty</Form.Label>
                        <Form.Control id="add-qty" type="text" placeholder="quantity"/>
                        <Form.Label>Price</Form.Label>
                        <Form.Control id="add-price" type="text" placeholder="price"/>
                    </Form.Group>
                    <Form.Group className="mb-3 p-2" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control  as="textarea" rows={3}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={() => handleSubmit(id)} variant="success">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBtn;