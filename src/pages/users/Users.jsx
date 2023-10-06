import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import user from '../../assets/user.png'
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import instance from "../../service/axiosOrder.js";


export default function Users(){
    const [admin, setAdmin] = useState([]);

    useEffect(() => {
        showPanel();
    },[]);

    const showPanel = () =>{
        instance.get('/adminpanel')
            .then(function (response) {
                // handle success
               // console.log(response.data)
                setAdmin(response.data)

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }



    return (
        <>

            <Container fluid className="d-flex align-items-center justify-content-center">
                {
                    admin.map((val, index)=>(
                        <Card key={index} style={{ width: '18rem', margin:'30px' }}>
                            <div className="p-3">
                                <Card.Img style={{width:'200px', display:'flex', margin:'auto'}} variant="top" src={user} />
                                <Card.Body className="text-center">
                                    <Card.Title>{val.username}</Card.Title>
                                    <Card.Title>{`${val.first_name}${" "}${val.last_name}`}</Card.Title>
                                    <Card.Text>
                                        {val.email}
                                    </Card.Text>
                                    <Button className="d-block m-auto" variant="primary">Edit Your Profile</Button>
                                </Card.Body>
                            </div>
                        </Card>
                    ))
                }

            </Container>


        </>
    )
}