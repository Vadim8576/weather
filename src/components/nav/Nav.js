import React, { useState, useEffect } from 'react';
import NavItem from './NavItem';
import { NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { searchMovies, searchMoviesDropdown } from './../../redux/search_reducer';
import './../../styles/nav.css'


const logoPath = 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg'





const Navigation = ({ isAuth, searchMovies, found_movies, searchMoviesDropdown, found_movies_dropdown, ...props }) => {
    console.log('isAuth=', isAuth);

    const [value, setValue] = useState('');
    const [dropdown, setVisible] = useState({visible: false, class: ''});

    const getQuery = () => {

        // console.log(query);
        if (value) {
            
            setVisible({visible: false, class: ''});
            console.log('redirect');
            props.history.push('/main/search/s_query=' + value);
            setValue('');
            // return <Route to={'/search/s_query=' + query} />;
        }
    }



    const dropDownSearch = (value) => {
        setValue(value);

        if (value.length > 2) {
            // searchMovies(value);
            searchMoviesDropdown(value);
            setVisible({visible: true, class: 'visible'});
        } else {
            setVisible({visible: false, class: ''});
        }
    }







    return (
        <>
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

            </Navbar>
            <div className='search_form'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    getQuery();
                }}>
                    <label>
                        <input type="text" placeholder="Название фильма" className="mr-sm-2" onChange={(e) => {
                            dropDownSearch(e.target.value);
                        }} value={value} />
                        <button variant="outline-light">Search</button>
                        <div className='dropdown_search_container'>
                            <div className={`dropdown_search ${dropdown.class}`}>

                                {dropdown.visible && found_movies_dropdown &&
                                    found_movies_dropdown.map((item, index) => <div key={index}>
                                        <img className='border' src={item.poster_path ? `https://image.tmdb.org/t/p/w92/${item.poster_path}` : '/img/no_poster.jpg'}
                                            alt='п' />
                                        {item.title}
                                    </div>)
                                }

                            </div>

                        </div>
                    </label>

                </form>

            </div>
        </>
    )
}


const mapStateToProps = state => ({
    found_movies: state.found_movies.found_movies,
    found_movies_dropdown: state.found_movies.found_movies_dropdown


})


export default compose(connect(mapStateToProps, { searchMovies, searchMoviesDropdown }), withRouter)(Navigation);
// export default Navigation;