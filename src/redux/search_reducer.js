import { search_api } from '../api/search_api';
import { setTotalPages } from './pagination_reducer';



const SET_FOUND_MULTI = 'SET_FOUND_MULTI';
const SET_FOUND_MOVIES_DROPDOWN = 'SET_FOUND_MOVIES_DROPDOWN';




let initialState = {
    found_movies: [],
    found_person: [],
    found_tv: [],
    isFetching: false,
    found_movies_dropdown: []
};



const search_reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_FOUND_MULTI:
            return {
                ...state,
                found_movies: action.payload.filter(item => item.media_type === 'movie'),
                found_person: action.payload.filter(item => item.media_type === 'person'),
                found_tv: action.payload.filter(item => item.media_type === 'tv'),
                isFetching: true
            };

        case SET_FOUND_MOVIES_DROPDOWN:
            return {
                ...state,
                found_movies_dropdown: action.payload
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




const setFoundMulti = (payload) => ({ type: SET_FOUND_MULTI, payload });
const setFoundMoviesDropdown = (payload) => ({ type: SET_FOUND_MOVIES_DROPDOWN, payload });



export const searchMulti = (query, currentPage=1) => (dispatch) => {

    search_api.searchMulti(query, currentPage)
        .then(response => {


            console.log('Found_movie ', response);

            const payload = {
                total_results: response.total_results,
                total_pages: response.total_pages
            }
    
            dispatch(setTotalPages(payload));
            // dispatch(setCurrentPage(currentPage));


            dispatch(setFoundMulti(response.results));
        
        })
}

export const searchMoviesDropdown = (query) => (dispatch) => {

    search_api.searchMulti(query)
        .then(response => {

            // console.log('Found_movie ', response);
            console.log('Found_movie ', response);
            dispatch(setFoundMoviesDropdown(response.results));
        
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