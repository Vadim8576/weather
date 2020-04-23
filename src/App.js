import React, { useEffect } from 'react';
import './styles/global.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Examples from './examples-from-bootstrap';
import { connect } from 'react-redux';
import HeaderContainer from './components/header/HeaderContainer';
import MainPageContainer from './components/mainPage/MainPageContainer';
import Login from './components/login/Login';
import { getAuth, authentication } from './redux/auth_reducer';
// import { fetchingPopularMovie } from './redux/movie_reducer';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './components/prifilePage/ProfilePageContainer';
import Footer from './components/footer/Footer';

function App({ fetchWeather, ...props }) {




  return (
    <>
      <HeaderContainer />
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <div className="App">

              <Switch>
                <Route exact path='/' render={() => <Redirect to={'/main'} />} />
                <Route exact path='/login' render={() =>
                  <Login
                    getAuth={props.getAuth}
                    request_token={props.request_token}
                    authentication={props.authentication}
                  />}
                />
                <Route exact path='/main' render={() =>
                  <MainPageContainer />}
                />
                <Route exact path='/profile' render={() =>
                  <Profile />}
                />
                <Route path='/*' render={() => <Redirect to={'/main'} />} />
              </Switch>


              {/* <Examples /> */}
            </div>
          </Col>

        </Row>

      </Container>
      <Footer />
    </>
  );
}


const getStateToProps = (state) => (
  {
    request_token: state.auth.request_token
    // popular_movie: state.movie.popular_movie
  }
)





// export default App;

export default App = connect(getStateToProps, {
  getAuth,
  authentication
})(App);
