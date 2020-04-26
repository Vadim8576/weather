import { config_api } from '../api/config_api';

const FETCHING_COUNTRIES = 'FETCHING_COUNTRIES';




let initialState = {
    countries: {}
};




const config_reducer = (state = initialState, action) => {

    switch(action.type) {
        case FETCHING_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            };

        default:
        return state;
    }
}




const fetchingCountries = (payload) => ( {type: FETCHING_COUNTRIES, payload} );


export const getCountries = () => (dispatch) => {

    config_api.getCountries()
        .then(response => {

            // console.log('Countries', response);   

            
            let payload = {};

            response.map(i => {
                payload[i.iso_3166_1] = i.english_name;
                return payload;
            })


            dispatch(fetchingCountries(payload));



            console.log(payload);  

        })
}




export default config_reducer;