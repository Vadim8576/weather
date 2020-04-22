import React from 'react';


const Login = ({ request_token, getAuth, ...props }) => {

    const auth = (e) => {

        // let request_body = {
        //     "username": e.target.username.value,
        //     "password": e.target.pass.value,
        //     "request_token": request_token
        // }

        let request_body = {
            "username": 'ZhVA',
            "password": 'vadik250783',
            "request_token": request_token
        }

        // console.log(request_body, request_token);

        props.authentication();
        // getAuth(request_body);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            auth(e);
        }}>
            <label>
                Redux-form
                <input type='text' placeholder='user name' name='username' />
                <input type='text' placeholder='password' name='pass' />
                <button>Send</button>
            </label>
        </form>


    )
}


export default Login;