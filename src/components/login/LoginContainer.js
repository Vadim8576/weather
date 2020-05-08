import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAuth, authentication } from '../../redux/auth_reducer';


let Login = ({ request_token, getAuth, authentication, ...props }) => {

    const auth = (e) => {

        // console.log(e.target);
        // let form_data = {
        //     "username": e.target.username.value,
        //     "password": e.target.pass.value,
        //     "request_token": request_token
        // }

        let form_data = {};

        // console.log(request_body, request_token);

        authentication(form_data);
        // getAuth(request_body);
    }

    return (
        
        <Form onSubmit={(e) => {
                e.preventDefault();
                auth(e);
            }}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Имя пользователя</Form.Label>
                <Form.Control type="username" placeholder="Имя пользователя" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {/* <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
                Войти
            </Button>
        </Form>

    )
}



const mapStateToProps = (state) => (
    {
        request_token: state.auth.request_token
    }
)


export default Login = connect(mapStateToProps, {
    getAuth,
    authentication
})(Login);