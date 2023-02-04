import axios from 'axios';

// https://api-nattyapi.herokuapp.com

const api = axios.create({

    baseURL: 'https://natty-server-production.up.railway.app'

});

export { api };