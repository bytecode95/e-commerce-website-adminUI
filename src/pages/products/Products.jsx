import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import { useParams} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import instance from "../../service/axiosOrder.js";
import EditIcon from '@mui/icons-material/Edit';
import Base_Url from '../../common/Base_URL.jsx'


export default function Products(){
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [show, setShow] = useState(false);
    const [updateproduct, setUpdateProduct] = useState([])

    // const [image, setImage] = useState();
    const handleClose = () => {
        setShow(false);
        getproductData();
    }
    const handleShow = () => setShow(true);

    // function uploadImage(e) {
    //     setImage((e.target.files[0]));
    // }

    useEffect(()=>{
        getproductData()
    }, [id])



    const getproductData = ()=>{
        instance.get('/getdetails')
            .then(function (response) {
                // handle success
                setProduct(response.data);
                //console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const deleteproductData = (id) =>{
        instance.delete(`/deleteproduct/${id}`)
            .then(function () {
                getproductData();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getproductbyId = async (id) => {
        // Get the product details by product_id from the backend API
        const {data} = await instance.get(`/getdetails/${id}`)
        //console.log(data[0])
        setUpdateProduct(data[0]);
        setupdateproID(data[0].id)
    }

    // const intitialName = updateproduct.pro_name;


    const [updatename, setUpdateName] = useState('');
    const [updateqty, setUpdateQty] = useState('');
    const [updateprice, setUpdatePrice] = useState('');
    const [updateproid, setupdateproID] = useState('')


    const handleUpdate = async () => {

        const data = {
            id:updateproid,
            pro_name: updatename,
            price: updateprice,
            quantity: updateqty
        }
        // Send an HTTP PUT request to update the product by product_id

        instance.put(`/updateproduct/${id}`, data)
            .then((response) => {
                //console.log(response)
                //console.log('Product updated successfully');
                
                // Redirect or show a success message
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle errors
            });
    };





    return(
        <>
            <h3 className="text-center fw-bold mb-3">Product Grid</h3>
            <Row   className="d-flex align-items-center justify-content-around flex-wrap g-4">
                {
                    product.map((val,index)=>(
                        <Col key={index} >
                            <Card style={{ width: '20rem' }} className="shadow" >
                                <Card.Img  style={{width:'200px', height:'200px',margin:'auto',marginTop:'10px'}} src={`${Base_Url}${val.pro_image}`} />
                                <Card.Body style={{textAlign:'center'}}>
                                    <Card.Title >{val.pro_name}</Card.Title>
                                    <Button onClick={()=>deleteproductData(val.id)} style={{margin:'5px'}} variant="danger"><span><DeleteIcon/>Delete</span></Button>
                                    <Button onClick={()=> {
                                        getproductbyId(val.id);
                                        handleShow();
                                    }} style={{margin:'5px'}} variant="success"><span><EditIcon/>Update</span></Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
            <Modal
                show={show}
                onHide={handleClose}
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="mt-5 fs-3 fw-bold text-center">Product Update: {updateproduct.pro_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    All fields need to be updated
                    {/*<Form.Group style={{cursor: 'pointer', height: '300px', width: '300px'}}>*/}
                    {/*    {image ? (*/}
                    {/*        <img src={URL.createObjectURL(image)} alt="upload image" className="display-image"/>*/}
                    {/*    ) : (*/}
                    {/*        <img src={beforeimage} alt="upload image" className="display-image"/>*/}
                    {/*    )}*/}
                    {/*</Form.Group>*/}
                    {/*<Form.Group controlId="formFileMultiple" className="mb-3 p-2">*/}
                    {/*    <Form.Label>Upload Files here</Form.Label>*/}
                    {/*    <Form.Control onChange={uploadImage} type="file" multiple/>*/}
                    {/*</Form.Group>*/}

                    <Form.Group className="mt-2 p-2">
                        <Form.Label>Name of the Product</Form.Label>
                        <Form.Control onChange={(e)=>{setUpdateName(e.target.value)}} id="add-name" type="text" placeholder="enter product name"/>
                        <Form.Label>Qty</Form.Label>
                        <Form.Control onChange={(e)=>{setUpdateQty(e.target.value)}} id="add-qty" type="text" placeholder="quantity"/>
                        <Form.Label>Price</Form.Label>
                        <Form.Control  onChange={(e)=>{setUpdatePrice(e.target.value)}} name="price" id="add-price" type="text" placeholder="price"/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpdate} variant="success">Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>



    )
}