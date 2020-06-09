import { account_api } from '../api/account_api';

const SET_USER = 'SET_USER';
const SET_RATED_MOVIED = 'SET_RATED_MOVIED';


let initialState = {
    user_name: null,
    account_id: null,
    rated_movies: []
};


const account_reducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user_name: action.payload.username,
                account_id: action.payload.id
            };
        case SET_RATED_MOVIED:
            return {
                ...state,
                rated_movies: action.payload
            };
        default:
            return state;
    }
}




export const setUser = (payload) => ({ type: SET_USER, payload });
export const setRatedMoviesAC = (payload) => ({ type: SET_RATED_MOVIED, payload });





export const getDetails = (session_id) => (dispatch) => {

    return account_api.getDetails(session_id)
        .then(response => {

            console.log('Account Details', response);
        
            dispatch(setUser(response));

            const account_id = response.id;
            console.log('id=', account_id);
            
            
            // dispatch(getRatedMovies({session_id, account_id}));


        })
}

export const getRatedMovies = (paload) => (dispatch) => {

    return account_api.getRatedMovies(paload)
        .then(response => {

            console.log('Rated Movies', response.results);
        
            dispatch(setRatedMoviesAC(response.results));

        })
}






export default account_reducer;