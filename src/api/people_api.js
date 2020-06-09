import * as axios from 'axios';

const api_key = 'api_key='+process.env.REACT_APP_TOKEN;


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
    },

    getPersonList(page) {
        console.log('page = ', page);
        const params = '&language=ru-RU&page=' + page;
        return instanse
                .get('popular?' + api_key + params)
                .then(response => response.data)
    }
}


/*
GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/