import * as axios from 'axios';
import {api_key} from '../api_key';


// const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/movie'
});




export const search_api = {

    searchMovie(query) {
        const page=1;
        const year = 0;
        const params = '&language=ru-RU&query='+query+'&page='+page+'&include_adult=false'+'&year='+year;
        return instanse
                .get('?' + api_key + params)
                .then(response => response.data)
    }
}


/*
GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/