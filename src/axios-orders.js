import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-aa790.firebaseio.com/'
})

export default instance;