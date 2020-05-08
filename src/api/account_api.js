import * as axios from 'axios';

const api_key = 'api_key='+process.env.REACT_APP_TOKEN;


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});


export const account_api = {

    getDetails(session_id) {
        return instanse
                .get('account?'+api_key+'&session_id='+session_id)
                .then(response => response.data)
    },


    getRatedMovies({session_id, account_id, page=1}) {
        return instanse
                .get('account/'+account_id+'/rated/movies?'+api_key+'&language=ru-RU&session_id='+session_id+'&sort_by=created_at.asc&page='+page)
                .then(response => response.data)
    }
}


