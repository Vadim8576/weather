import { search_api } from '../api/search_api';



const SET_FOUND_MOVIES = 'SEARCH_MOVIES';




let initialState = {
    found_movies: [],
    isFetching: false
};



const search_reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_FOUND_MOVIES:
            return {
                ...state,
                found_movies: action.payload,
                isFetching: true
            };


        // case SET_CURRENT_PAGE:
        //     return {
        //         ...state,
        //         current_page: action.payload
        //     };


        default:
            return state;
    }
}




const setFoundMovies = (payload) => ({ type: SET_FOUND_MOVIES, payload });



export const searchMovies = (query) => (dispatch) => {

    search_api.searchMovie(query)
        .then(response => {

            console.log('Found_movie ', response);

            // const payload = {
            //     popular_movies: response.results,
            //     total_results: response.total_results,
            //     total_pages: response.total_pages
            // }
            dispatch(setFoundMovies(response.results));
        
        })
}



// export const setCurrentPage = (query) => (dispatch) => {

//     search_api.searchMovie(query)
//         .then(response => {

//             console.log('movie ', response);

//             const payload = {
//                 popular_movies: response.results,
//                 total_results: response.total_results,
//                 total_pages: response.total_pages
//             }
//             dispatch(fetchingPopularMoviesAC(payload));
//             // dispatch(moviesIsFetching());
//             dispatch(setCurrentPageAC(current_page));
//         })
// }





export default search_reducer;