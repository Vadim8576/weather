import { api } from './../api/api';

const GET_REQUEST_TOKEN = 'GET_REQUEST_TOKEN';
const AUTH_IS_SUCCES = 'AUTH_IS_SUCCES';

let initialState = {
    request_token: '',
    isAuth: false,
    username: 'Гость'
};


const reducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_REQUEST_TOKEN:
            return {
                ...state,
                request_token: action.payload
            };
        case AUTH_IS_SUCCES:
            return {
                ...state,
                isAuth: true
            };
        default:
        return state;
    }
}




export const getTokenAC = (payload) => ( {type: GET_REQUEST_TOKEN, payload} );
export const auth_is_success = () => ( {type: AUTH_IS_SUCCES} );






export const authentication = () => async (dispatch) => {
   
    const request_token = getToken();
    const session_id = createSession(request_token);


    let request_body = {
        "username": 'ZhVA',
        "password": 'vadik250783',
        "request_token": request_token
    }
    getAuth(request_body);
}






export const  getToken = () => async (dispatch) => {
    alert();
        return await api.getToken()
            .then(request_token => {
                console.log(request_token);
                dispatch(getTokenAC(request_token));
            })
}

export const createSession =  (request_token) => async (dispatch) => {
    return await api.createSession()
        .then(session_id => {
            console.log(session_id);
        })
}




export const getAuth = (request_body) => (dispatch) => {
    

    // console.log('request_body=', request_body);

    return api.getAuth(request_body)
        .then(response => {
            console.log('LogIn=', response);
            dispatch(auth_is_success());
        })
}


export default reducer;