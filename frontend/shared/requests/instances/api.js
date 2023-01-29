import axios from 'axios'

const API = axios.create({
    baseURL: 'https://63d272ef1780fd6ab9c4e915.mockapi.io/api/v1',
});

export { API }