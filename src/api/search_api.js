import * as axios from 'axios';

const api_key = 'api_key='+process.env.REACT_APP_TOKEN;


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/'
    // baseURL: 'https://api.themoviedb.org/3/search/'
});




export const search_api = {

    searchMulti(query, currentPage) {
        // const page=1;
        // const year = 0;
        // const params = '&language=ru-RU&query='+query+'&page='+currentPage+'&include_adult=false'+'&year='+year;
        const params = '&language=ru-RU&query='+query+'&page='+currentPage+'&include_adult=false';
        return instanse
                .get('multi?' + api_key + params)
                .then(response => response.data)
    }
}


/*
GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/