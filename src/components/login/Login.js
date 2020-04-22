import React from 'react';


const Login = ({ request_token, getAuth, ...props }) => {

    const authentication = (e) => {

        let request_body = {
            "username": e.target.username.value,
            "password": e.target.pass.value,
            "request_token": request_token
        }

        console.log(request_body, request_token);

        getAuth(request_body);
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            authentication(e);
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