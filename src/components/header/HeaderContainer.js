import React from 'react';
import '../../styles/header.css'
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from '../nav/Nav';
import { connect } from 'react-redux';

const Header = ({isAuth}) => {
    return (

        <div className='header'>
            <Container>
                <Row>
                    <Col>
                        <Navigation isAuth={isAuth} />
                    </Col>
                </Row>

            </Container>
        </div>
    )
}


const mapStateToProps = (state) => (
    {
        isAuth: state.auth.isAuth
    }
)

const HeaderContainer = connect(mapStateToProps, null)(Header);

export default HeaderContainer;