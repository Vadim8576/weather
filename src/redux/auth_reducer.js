import { auth_api } from '../api/auth_api';

const GET_REQUEST_TOKEN = 'GET_REQUEST_TOKEN';
const AUTH_IS_SUCCES = 'AUTH_IS_SUCCES';

let initialState = {
    request_token: '',
    isAuth: false
};


const auth_reducer = (state = initialState, action) => {

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




export const authentication = (data) => (dispatch) => {
    
        return auth_api.getToken()
            .then(request_token => {
               
                dispatch(getTokenAC(request_token));

                console.log({request_token});

                // let request_body = {
                //     "username": data.username,
                //     "password": data.password,
                //     "request_token": request_token
                // }


                let request_body = {
                    "username": 'ZhVA',
                    "password": 'vadik250783',
                    "request_token": request_token
                }

                dispatch(getAuth(request_body));
                    
            })
}



export const getAuth = (request_body) => (dispatch) => {
    
    return auth_api.getAuth(request_body)
        .then(response => {
            console.log('LogIn=', response);
            dispatch(auth_is_success());
        })
}


export default auth_reducer;