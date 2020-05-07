import * as axios from 'axios';

const api_key = 'api_key='+process.env.REACT_APP_TOKEN;


const instanse = axios.create({
    baseURL: 'https://api.themoviedb.org/3/discover/'
});




export const discover_api = {

    discover_movies(request, currentPage=1) {

        const {sort_by, release_date_gte, release_date_lte, genres_ids} = request;
        // console.log('params=', request);

        const params = '&language=ru-RU&sort_by='+sort_by+'&include_adult=false&include_video=false&with_genres='+genres_ids.join(',')
        +'&release_date.gte='+release_date_gte+'&release_date.lte='+release_date_lte+'&page='+currentPage;
        return instanse
                .get('movie?' + api_key + params)
                .then(response => response.data)
    }
}


/*
показываются в кинотеатрах Германии на этой неделе
https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=de-DE&region=DE&release_date.gte=2016-11-16&release_date.lte=2016-12-02&with_release_type=2|3



GET /movie/upcoming - список предстоящих фильмов в кинотеатрах


*/