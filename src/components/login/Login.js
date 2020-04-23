import React from 'react';


const Login = ({ request_token, getAuth, ...props }) => {

    const auth = (e) => {

        // let form_data = {
        //     "username": e.target.username.value,
        //     "password": e.target.pass.value,
        //     "request_token": request_token
        // }

        let form_data={};

        // console.log(request_body, request_token);

        props.authentication(form_data);
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