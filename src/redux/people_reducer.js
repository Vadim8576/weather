import { people_api } from '../api/people_api';

const FETCHING_PEOPLE = 'FETCHING_PEOPLE';
const FETCHING_IMAGES = 'FETCHING_IMAGES';
const FETCHING_PEOPLE_FILMOGRAPHY = 'FETCHING_PEOPLE_FILMOGRAPHY';




let initialState = {
    people: [],
    people_isFetching: false,
    filmography: [],
    filmography_isFetching: false,
    people_image: [],
    images_isFetching: false
};



const people_reducer = (state = initialState, action) => {

    switch(action.type) {
        case FETCHING_PEOPLE:
            return {
                ...state,
                people: action.payload,
                people_isFetching: true
            };
        case FETCHING_PEOPLE_FILMOGRAPHY:
            return {
                ...state,
                filmography: action.payload,
                filmography_isFetching: true
            };
        case FETCHING_IMAGES:
            return {
                ...state,
                people_image: action.payload,
                images_isFetching: true
            };

      
        default:
        return state;
    }
}




const fetchingPeople = (payload) => ( {type: FETCHING_PEOPLE, payload} );
const fetchingPeopleFilmography = (payload) => ( {type: FETCHING_PEOPLE_FILMOGRAPHY, payload} );
const fetchingImage = (payload) => ( {type: FETCHING_IMAGES, payload} );




export const getPeople = (people_id) => async (dispatch) => {

    await people_api.getPeople(people_id)
        .then(response => {
            console.log('people ', response);
            dispatch(fetchingPeople(response));
        })

    await dispatch(getFilmography(people_id));

}

export const getFilmography = (people_id) => (dispatch) => {

    people_api.getFilmography(people_id)
        .then(response => {

            console.log('Filmography ', response);

            dispatch(fetchingPeopleFilmography(response));

        })
}



export const getImages = (people_id) => (dispatch) => {

    return people_api.getImages(people_id)
        .then(response => {

            console.log('getImages ', response);

            dispatch(fetchingImage(response));

        })
}



export default people_reducer;