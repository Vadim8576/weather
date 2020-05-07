import * as axios from 'axios';

const api_key = 'api_key='+process.env.REACT_APP_TOKEN;


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
    },


    createSession(request_body) {

       
        request_body = {
            "request_token": request_body
        }

        console.log('запрос на createSession', request_body );

        return instanse
                .post('session/new?'+api_key, request_body)
                .then(response => response)
    }
}


//............................... ЗАПРОСЫ ..........................

/*
Genres - список жанров





*/
