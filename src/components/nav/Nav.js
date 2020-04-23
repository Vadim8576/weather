import React from 'react';
import NavItem from './NavItem';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl,Button } from 'react-bootstrap';



const logoPath = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'

const Navigation = ({isAuth}) => {
    console.log('isAuth=', isAuth);
    return (

        <Navbar bg="dark" variant="dark">
            <NavLink to='/main' className='navbar-brand'><img className='logo' src={logoPath} alt='logo' /></NavLink>
            {/* <Navbar.Brand href="#home"></Navbar.Brand> */}
            <Nav className="mr-auto">

                <NavItem link='/main' item='Главная' />
                <NavItem link='/people' item='Люди' />

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