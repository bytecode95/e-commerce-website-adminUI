import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import beforeimage from '../../assets/picture.png'
import {Form} from "react-bootstrap";
import './style.css'
import { useState} from "react";
import instance from "../../service/axiosOrder.js";
import {Alert} from "@mui/material";

export default function AddProducts(){
    const[image, setImage] = useState('');
    const[name, setName] = useState('');
    const[qty, setQty] = useState('');
    const[price, setPrice] = useState('');
    const[desc, setDesc] = useState('');

    const [warning, setWarning] = useState(false);
    function uploadImage(e){
        setImage((e.target.files[0]));
    }

    const postData = async (e)=>{
        e.preventDefault();
        const formData = new FormData()
        formData.append('image', image)
        formData.append('name', name)
        formData.append('qty', qty)
        formData.append('price', price)
        formData.append('desc', desc)


        const config = {
            headers:{'Content-Type': 'multipart/form-data'}
        }

        try {
            const data = await instance.post('/addproducts', formData,config );
            if(data){
                setWarning(true);
                setTimeout(() => {
                    setWarning(false);
                }, 2000);
            }
            console.log(data);

        }catch (err){
            console.log(err);
        }
    }

    return(
        <Form onSubmit={postData}  action="/addproducts" className="mb-5"  encType="multipart/form-data" >
            <h3 className="text-center fw-bold">Create Product</h3>
            <Card className="shadow" style={{ width: '35rem', margin:'auto', marginTop:'20px', padding:'40px' }}>
                <Form.Group style={{ cursor:'pointer', height:'300px', width:'300px', display:'flex', margin:'auto' }}>
                    {image ? (
                        <img src={URL.createObjectURL(image)}  alt="upload image"   className="display-image" />
                    ) : (
                        <img src={beforeimage} alt="upload image" className="display-image" />
                    )}
                </Form.Group>
                {/*<input*/}
                {/*    style={{margin:"auto", backgroundColor:'#76d300', padding:'10px', borderRadius:'10px', borderStyle:"solid"}}*/}
                {/*    type="file"*/}
                {/*    onChange={uploadImage}*/}
                {/*    name="image"*/}

                {/*/>*/}
                <Form.Group controlId="formFileMultiple" className="mb-3 p-2">
                    <Form.Label className="fw-bold" >Upload images here</Form.Label>
                    <Form.Control onChange={uploadImage} name="image" type="file" multiple />
                </Form.Group>

                <Form.Group className="mt-2 p-2" >
                    <Form.Label>Name of the Product</Form.Label>
                    <Form.Control  onChange={(e)=>{setName(e.target.value)}}  id="add-name" type="text" placeholder="enter product name" />
                    <Form.Label>Qty</Form.Label>
                    <Form.Control  onChange={(e)=>{setQty(e.target.value)}}  id="add-qty" type="text" placeholder="quantity" />
                    <Form.Label>Price</Form.Label>
                    <Form.Control onChange={(e)=>{setPrice(e.target.value)}} id="add-price" type="text" placeholder="price" />
                </Form.Group>
                <Form.Group className="mb-3 p-2" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control onChange={(e)=>{setDesc(e.target.value)}}  as="textarea" rows={3} />
                </Form.Group>

                <Button   className="w-50 m-auto mb-2" type="submit"  variant="primary">Add Product</Button>

                {
                    warning && <Alert style={{color:'white', backgroundColor:'#76d300'}} variant="filled"  > Product was added Successfully! </Alert>
                }
            </Card>


        </Form>
    )
}