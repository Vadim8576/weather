import React from 'react';
import '../../styles/header.css'
import { Container } from 'react-bootstrap';
import Navigation from '../nav/Nav';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Header = ({ isAuth }) => {
    return (

        <div className='main_header bg-dark'>
            <Container>

                <Navigation isAuth={isAuth} />

            </Container>
        </div>
    )
}


const mapStateToProps = (state) => (
    {
        isAuth: state.auth.isAuth
    }
)

const HeaderContainer = compose(connect(mapStateToProps, {
    
}), withRouter)(Header);

export default HeaderContainer;