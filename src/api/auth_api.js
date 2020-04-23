import * as axios from 'axios';
import {api_key} from './../api_key';



// const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/authentication/'
});


export const auth_api = {

    getToken() {
        return instanse
                .get('token/new?'+api_key)
                .then(response => response.data.request_token)
    },

    getAuth(request_body) {
       
        return instanse
                .post('token/validate_with_login?'+api_key, request_body)
                .then(response => response)
    }
}


//............................... ЗАПРОСЫ ..........................

/*
Genres - список жанров





*/
