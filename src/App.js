import React, { useEffect } from 'react';
import './styles/global.css';
import HeaderContainer from './components/header/HeaderContainer';
import MainPageContainer from './components/mainPage/MainPageContainer';
import Footer from './components/footer/Footer';
import {withSuspense} from './Lazy/withSuspense';


import { getAuth, authentication } from './redux/auth_reducer';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';



// import Login from './components/login/Login';
const Login = React.lazy(() => import('./components/login/Login'));
// import Profile from './components/profilePage/ProfilePageContainer';
const Profile = React.lazy(() => import('./components/profilePage/ProfilePageContainer'));
// import MovieDetailsContainer from './components/mainPage/MovieDetailsContainer';
const MovieDetailsContainer = React.lazy(() => import('./components/mainPage/moviesDetails/MovieDetailsContainer'));
// import PeopleContainer from './components/mainPage/PeopleContainer';
const PeopleContainer = React.lazy(() => import('./components/mainPage/people/PeopleContainer'));
const MovieReleasesContainer = React.lazy(() => import('./components/mainPage/moviesDetails/MovieReleasesContainer'));
const MovieCasts = React.lazy(() => import('./components/mainPage/moviesDetails/MovieCasts'));
const MovieCrew = React.lazy(() => import('./components/mainPage/moviesDetails/MovieCrew'));
const PeopleFilmography = React.lazy(() => import('./components/mainPage/people/PeopleFilmography'));
const PeopleCrew = React.lazy(() => import('./components/mainPage/people/PeopleCrew'));




let App = ({ fetchWeather, ...props }) => {


  return (
    <div className="App">
      <HeaderContainer />

      <Container className="justify-content-md-center">
        {/* <Row className="justify-content-md-center"> */}
        {/* <Col> */}

        <Switch>
          <Route exact path='/movie_details/:movie_id?' render={withSuspense(MovieDetailsContainer)} />

          <Route exact path='/movie_releases/:movie_id?' render={withSuspense(MovieReleasesContainer)} />

          <Route exact path='/casts/:movie_id?' render={withSuspense(MovieCasts)} />
          <Route exact path='/crew/:movie_id?' render={withSuspense(MovieCrew)} />
          <Route exact path='/people_filmography/:people_id?' render={withSuspense(PeopleFilmography)} />
          <Route exact path='/people_crew/:people_id?' render={withSuspense(PeopleCrew)} />

          <Route exact path='/people/:people_id?' render={withSuspense(PeopleContainer)} />

          <Route exact path='/' render={() => <Redirect to={'/main'} />} />
          <Route exact path='/login' render={withSuspense(Login)} />
          <Route exact path='/main' render={() =>
            <MainPageContainer />}
          />
          <Route exact path='/profile' render={() =>
            withSuspense(Profile)}
          />

          <Route path='/*' render={() => <Redirect to={'/main'} />} />

        </Switch>


        {/* </Col> */}

        {/* </Row> */}

      </Container>

      <Footer />
    </div>
  );
}


const getStateToProps = (state) => (
  {
    request_token: state.auth.request_token
    // popular_movie: state.movie.popular_movie
  }
)





// export default App;

export default App = compose(connect(getStateToProps, {
  getAuth,
  authentication
}), withSuspense)(App);
