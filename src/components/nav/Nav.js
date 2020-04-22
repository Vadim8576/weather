import React from 'react';
import NavItem from './NavItem';
import { Navbar, Nav, Form, FormControl,Button } from 'react-bootstrap';


const Navigation = ({isAuth}) => {
    return (

        <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="#home">Logo</Navbar.Brand>
            <Nav className="mr-auto">

                <NavItem link='/main' item='Главная' />
                {isAuth &&
                    <NavItem link='/profile' item='Профиль' />
                }
                {isAuth
                    ? ''
                    : <NavItem link='/login' item='Вход' />
                }
                
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
            </Form>
        </Navbar>


        // <div className='nav'>
        //     <ul>
        //         <NavItem link='/main' item='Главная' />
        //         <NavItem link='/profile' item='Профиль' />
        //     </ul>
        // </div>
    );
}

export default Navigation;