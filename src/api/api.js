import * as axios from 'axios';


const token = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/authentication/token/'
});


export const api = {

    getToken() {
        return instanse
                .get('new?'+token)
                .then(response => response.data.request_token)
    },

    getAuth(request_body) {
       
        return instanse
                .post('validate_with_login?'+token, request_body)
                .then(response => response)
    }

    
}