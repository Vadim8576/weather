import * as axios from 'axios';

const api_key = 'api_key='+process.env.REACT_APP_TOKEN;


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/configuration/'
});




export const config_api = {

    getCountries() {
        return instanse
                .get('/countries?' + api_key)
                .then(response => response.data)
                
    }
}


/*
GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/