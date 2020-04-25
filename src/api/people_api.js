import * as axios from 'axios';
import {api_key} from '../api_key';


// const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/person/'
});




export const people_api = {

    getPeople(id) {
        const params = '&language=ru-RU&page=';
        return instanse
                .get(id+'?' + api_key + params)
                .then(response => response.data)
    },

    getFilmography(id) {
        const params = '&language=ru-RU&page=';
        return instanse
                .get(id+'/movie_credits?' + api_key + params)
                .then(response => response.data)
    },

    getImages(id) {
        return instanse
                .get(id+'/images?' + api_key)
                .then(response => response.data.profiles)
    }
}


/*
GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/