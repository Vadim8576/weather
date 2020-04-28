import React, { useState } from 'react';
import NavItem from './NavItem';
import { NavLink, Redirect, withRouter, Route } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';



const logoPath = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'





const Navigation = ({ isAuth, ...props }) => {
    console.log('isAuth=', isAuth);

    const [value, setValue] = useState('');



    const getQuery = (query) => {

        console.log(query);
        if (query) {
            console.log('redirect');
            props.history.push('/main/search/s_query=' + query);
            // return <Route to={'/search/s_query=' + query} />;
        }
    }




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
            <form onSubmit={(e) => {
                e.preventDefault();
                getQuery(value);
                setValue('');
            }}>
                <input type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setValue(e.target.value)} value={value} />
                <button variant="outline-light">Search</button>
            </form>
        </Navbar>
    )
}



export default compose(connect(null, null), withRouter)(Navigation);
// export default Navigation;