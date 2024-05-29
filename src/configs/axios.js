import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_HTTPS_URL,
});

instance.defaults.withCredentials = true;
// instance.defaults.headers.common['Authorization'] = `Bearer ` + localStorage.getItem('accessToken');
// Un-comment this in case you want to pass cookies to the server through req.headers

//REQUEST
instance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
});


//RESPONSE
instance.interceptors.response.use((response) => {
    return response.data;
}, (err) => {
    let msg = err.response.data.message;
    if (msg) {
        err.message = msg;
    }
    return Promise.reject(new Error(msg));
});


export default instance;