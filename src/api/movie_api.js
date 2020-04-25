import * as axios from 'axios';
import {api_key} from './../api_key';


// const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/'
});




export const movie_api = {

    getPopularMovies(current_page) {
        const params = '&language=ru-RU&page='+current_page;
        return instanse
                .get('top_rated?' + api_key + params)
                .then(response => response.data)
    },

    getDetails(movie_id) {
        const params = '&language=ru-RU';
        return instanse
                .get(movie_id + '?' + api_key + params)
                .then(response => response.data)
    },

    // получить список актеров, съемочной комманды
    getCredits(movie_id) {
        return instanse
                .get(movie_id + '/credits?' + api_key)
                .then(response => response.data)
    }
}


/*
GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/