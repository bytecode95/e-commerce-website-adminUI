import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import image1 from '../../assets/spices (1).jpg'
import Typography from '@mui/material/Typography';
import {
    Box,
    Button, CardMedia,

    IconButton,
    InputAdornment,
    styled,
    TextField
} from "@mui/material";

import { Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email.js";
import {useState} from "react";
import {useAuth} from "../../data/useAuth.jsx";
import instance from "../../service/axiosOrder.js";


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#76d300'),
    backgroundColor: '#76d300',
    '&:hover': {
        backgroundColor: '#76d300',
    },
}));



export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(username === "" && password ===""){
            alert('all fields are mandatory');
        }else{
            //send login data to server
            instance.post('/login', {
                username: username,
                password: password
            })
                .then((response)=> {

                    if(!response.data.error){
                        login(response.data);
                        navigate('/home/*')

                    }else{
                        alert("You dont have a permission to login")
                    }
                })
                .catch((error)=> {
                    console.log(error);
                    alert("You dont have a permission to login")
                });
        }

    };




    return (
        <form onSubmit={handleSubmit}>
            <Card style={{display: 'flex', maxWidth:'800px' , backgroundColor:'#ffffff', margin:'auto', marginTop:'100px' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 350, height:'full', display: { xs: 'none', md: 'flex' }} }
                    image={image1}
                    alt="login img"
                />
                <Box style={{margin: 'auto'}}>
                    <CardContent >
                        <Typography  style={{fontSize: '40px', fontWeight:'bold', textAlign:'center'}} >
                            Welcome
                        </Typography>
                        <Typography  style={{fontSize: '20px',fontWeight:'bold', textAlign:'center', marginBottom:'20px', backgroundColor:'#e22137'}} >
                            Admin Login Will go here
                        </Typography>
                        <Typography style={{fontSize: '15px'}} >
                            Username
                        </Typography>
                        <TextField

                            onChange={(val)=>{setUserName(val.target.value)}}
                            style={{padding:'15px'}}
                            size="small"

                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />

                        <Typography style={{fontSize: '15px'}} >
                            Password
                        </Typography>
                        <TextField

                            onChange={(val)=>{setPassword(val.target.value)}}
                            style={{padding:'15px'}}
                            size="small"
                            type = {showPassword ? 'text' : 'password'}
                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                    </CardContent>
                    <CardActions>
                        <ColorButton type={'submit'}  style={{width:'200px', padding: '10px', borderRadius:'20px', marginInline:"40px", marginBottom:'10px'}} variant="contained">Login</ColorButton>
                    </CardActions>
                    <Typography style={{fontSize: '15px', margin: 'auto', color:'black'}} >
                        You Do not have an account? Create one!
                    </Typography>
                    <CardActions>
                        <ColorButton onClick={()=>{navigate('/signup')}} style={{width:'200px', padding: '10px', borderRadius:'20px', marginInline:"40px", marginBottom:'10px'}} variant="contained">Sign UP</ColorButton>
                    </CardActions>

                </Box>

            </Card>
        </form>

    );
}
