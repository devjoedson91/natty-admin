import axios from 'axios';

// https://api-nattyapi.herokuapp.com

const api = axios.create({

    baseURL: 'http://192.168.100.72:3333'

});

export { api };