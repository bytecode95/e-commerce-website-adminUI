import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import image1 from '../../assets/spices (1).jpg'
import EmailIcon from '@mui/icons-material/Email';
import Typography from '@mui/material/Typography';
import BadgeIcon from '@mui/icons-material/Badge';
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
import {useState} from "react";
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

    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(email === "" && password ==="" && firstName==="" && lastName===""){
            alert('all fields are mandatory');
        }else{
            instance.post('/signup', {
                first_name: firstName,
                last_name: lastName,
                username:username ,
                email: email,
                password: password
            })
                .then(function (response) {
                    console.log(response);
                    navigate('/login')
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }





    return (
        <form onSubmit={handleSubmit}>
            <Card sx={{display: 'flex', maxWidth: 800, backgroundColor:'white', margin:'auto',marginTop:'100px' }}>
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
                        <Typography  style={{fontSize: '20px',fontWeight:'bold', textAlign:'center', marginBottom:'20px', backgroundColor:'red'}} >
                            Admin SignUP Will go here
                        </Typography>
                        <Typography style={{fontSize: '15px'}} >
                            First Name
                        </Typography>
                        <TextField
                            onChange={(val)=>{setFirstname(val.target.value)}}
                            size="small"
                            style={{padding:'15px'}}

                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                        <Typography style={{fontSize: '15px'}} >
                            Last Name
                        </Typography>
                        <TextField
                            onChange={(val)=>{setLastname(val.target.value)}}
                            size="small"
                            style={{padding:'15px'}}

                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                        <Typography style={{fontSize: '15px'}} >
                            Username
                        </Typography>
                        <TextField
                            onChange={(val)=>{setUserName(val.target.value)}}
                            size="small"
                            style={{padding:'15px'}}

                            label=""
                            InputProps={{
                                style:{width:300},
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                        />
                        <Typography style={{fontSize: '15px'}} >
                            Email
                        </Typography>
                        <TextField
                            onChange={(val)=>{setEmail(val.target.value)}}
                            size="small"
                            style={{padding:'15px'}}

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
                            size="small"
                            style={{padding:'15px'}}
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
                        <ColorButton type={'submit'}   style={{width:'200px', padding: '10px', borderRadius:'20px', marginInline:"40px", marginBottom:'10px'}} variant="contained">Sign UP</ColorButton>
                    </CardActions>

                </Box>

            </Card>
        </form>

    );
}