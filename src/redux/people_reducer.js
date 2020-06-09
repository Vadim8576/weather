import { people_api } from '../api/people_api';
import {setTotalPages, setCurrentPage} from './pagination_reducer';

const FETCHING_PEOPLE = 'FETCHING_PEOPLE';
const SET_PERSON_LIST = 'FETCHING_PERSON_LIST';
const PERSON_LIST_IS_FETCHING = 'PERSON_LIST_IS_FETCHING';

const FETCHING_IMAGES = 'FETCHING_IMAGES';
const FETCHING_PEOPLE_FILMOGRAPHY = 'FETCHING_PEOPLE_FILMOGRAPHY';




let initialState = {
    people: [],
    people_isFetching: false,
    filmography: [],
    filmography_isFetching: false,
    people_image: [],
    images_isFetching: false,
    person_list: [],
    person_isFetching: false
};



const people_reducer = (state = initialState, action) => {

    switch(action.type) {
        case FETCHING_PEOPLE:
            return {
                ...state,
                people: action.payload,
                people_isFetching: true
            };
        case SET_PERSON_LIST:
            return {
                ...state,
                person_list: action.payload
            };
        case PERSON_LIST_IS_FETCHING:
            return {
                ...state,
                person_isFetching: action.payload
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
const setPersonList = (payload) => ( {type: SET_PERSON_LIST, payload} );
const PersonListIsFetching = (payload) => ( {type: PERSON_LIST_IS_FETCHING, payload} );




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


export const getPersonList = (page) => (dispatch) => {
    dispatch(PersonListIsFetching(false));
    return people_api.getPersonList(page)
        .then(response => {
            
            console.log('getPersonList ', response.results);

            dispatch(setPersonList(response.results));
            dispatch(PersonListIsFetching(true));

            const payload = {
                total_results: response.total_results,
                total_pages: response.total_pages
            }
            dispatch(setTotalPages(payload));

        })
}


export default people_reducer;