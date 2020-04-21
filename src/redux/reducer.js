import { api } from './../api/api';

const FETCH_WEATHER = 'FETCH_WEATHER';


let initialState = {
    weather: {}
};


const reducer = (state = initialState, action) => {

    switch(action.type) {
        case FETCH_WEATHER:
            return {
                ...state,
               weather: action.payload
            };
        default:
        return state;
    }
}




export const fetch = (payload) => ( {type: FETCH_WEATHER, payload} );


export const fetchWeather = () => (dispatch) => {
    // alert();
        return api.fetchWeather()
            .then(data => {
                
               dispatch(fetch(data));
            })
}



export default reducer;