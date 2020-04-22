import * as axios from 'axios';


const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/authentication/'
});


export const api = {

    getToken() {
        return instanse
                .get('token/new?'+api_key)
                .then(response => response.data.request_token)
                
                // Получаю
                // {   "success": true,
                //     "expires_at": "2016-08-26 17:04:39 UTC",
                //     "request_token": "ff5c7eeb5a8870efe3cd7fc5c282cffd26800ecd"
                // }
    },

    createSession(request_token) {
       
        return instanse
                .post('session/new?'+api_key, request_token)
                .then(response => response.data.session_id)

                // {
                //     "success": true,
                //     "session_id": "79191836ddaa0da3df76a5ffef6f07ad6ab0c641"
                // }
    },

    getAuth(request_body) {
       
        return instanse
                .post('token/validate_with_login?'+api_key, request_body)
                .then(response => response)


                // {
                //     "success": true,
                //     "expires_at": "2018-07-24 04:10:26 UTC",
                //     "request_token": "1531f1a558c8357ce8990cf887ff196e8f5402ec"
                // }
    }

    
}