import * as axios from 'axios';
import {api_key} from './../api_key';


// const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/'
});


export const movie_api = {

    getPopularMovies() {
        const params = '&language=ru-RUS&page=1';
        return instanse
                .get('popular?' + api_key + params)
                .then(response => response.data)
    }
}

