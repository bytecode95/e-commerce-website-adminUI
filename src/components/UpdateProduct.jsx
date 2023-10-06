// components/EditProduct.js

import  { useState, useEffect } from 'react';

import {useParams} from "react-router-dom";
import instance from "../service/axiosOrder.js";

export default function UpdateProduct(){
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: 0,
        description: '',
        imageUrl: '',
    });

    useEffect(() => {
        // Fetch the product details by product_id from the backend API
        instance.get(`/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Send an HTTP PUT request to update the product by product_id
        instance.put(`/updateproduct/${id}`, product)
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
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={product.imageUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

