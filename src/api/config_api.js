import * as axios from 'axios';
import {api_key} from '../api_key';


// const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


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