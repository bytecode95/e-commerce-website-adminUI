import axios from 'axios';

const instance  = axios.create({
    //Dev Server
    baseURL:'http://192.168.8.187:4000/api'
});

export default instance;