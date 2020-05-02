import * as axios from 'axios';
import {api_key} from '../api_key';


// const api_key = 'api_key='+'b4ac21eb69cc3964a743fb16781abe2b';


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/genre/'
});




export const genres_api = {

    getGenres() {
        const params = '&language=ru-RU';
        return instanse
                .get('movie/list?' + api_key + params)
                .then(response => response.data)
    }
}


/*
показываются в кинотеатрах Германии на этой неделе
https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=de-DE&region=DE&release_date.gte=2016-11-16&release_date.lte=2016-12-02&with_release_type=2|3



GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/