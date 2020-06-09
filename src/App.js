import React, { useEffect } from 'react';
import './styles/global.css';
import HeaderContainer from './components/header/HeaderContainer';
import PopularMovies from './components/mainPage/moviesList/PopularMoviesContainer';
import Footer from './components/footer/Footer';
import {withSuspense} from './Lazy/withSuspense';


import { getAuth, authentication } from './redux/auth_reducer';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';



const Login = React.lazy(() => import('./components/login/LoginContainer'));
const Profile = React.lazy(() => import('./components/profilePage/ProfilePageContainer'));
const MovieInfo = React.lazy(() => import('./components/mainPage/moviesInfo/MovieInfoContainer'));
const PeopleInfo = React.lazy(() => import('./components/mainPage/peopleInfo/PeopleInfoContainer'));
const MovieReleases = React.lazy(() => import('./components/mainPage/moviesInfo/MovieReleasesContainer'));
const MovieCasts = React.lazy(() => import('./components/mainPage/moviesInfo/MovieCasts'));
const MovieCrew = React.lazy(() => import('./components/mainPage/moviesInfo/MovieCrew'));
const PeopleFilmography = React.lazy(() => import('./components/mainPage/peopleInfo/PeopleFilmography'));
const PeopleCrew = React.lazy(() => import('./components/mainPage/peopleInfo/PeopleCrew'));
const Search = React.lazy(() => import('./components/mainPage/SearchContainer'));
const NowPlaying = React.lazy(() => import('./components/mainPage/moviesList/NowPlayingContainer'));
const Upcoming = React.lazy(() => import('./components/mainPage/moviesList/UpcomingContainer'));
const Person = React.lazy(() => import('./components/mainPage/PersonContainer'));




let App = ({ fetchWeather, ...props }) => {


  return (
    <div className="App">
      <HeaderContainer />

      <Container className="justify-content-md-center">
        {/* <Row className="justify-content-md-center"> */}
        {/* <Col> */}

        <Switch>
          <Route exact path='/' render={() => <Redirect to={'/popular-movies'} />} />

          <Route exact path='/movie-info/:movie_id?' render={withSuspense(MovieInfo)} />
          <Route exact path='/movie-releases/:movie_id?' render={withSuspense(MovieReleases)} />
          <Route exact path='/casts/:movie_id?' render={withSuspense(MovieCasts)} />
          <Route exact path='/crew/:movie_id?' render={withSuspense(MovieCrew)} />
          <Route exact path='/people-filmography/:people_id?' render={withSuspense(PeopleFilmography)} />
          <Route exact path='/people-crew/:people_id?' render={withSuspense(PeopleCrew)} />
          <Route exact path='/people/:people_id?' render={withSuspense(PeopleInfo)} />
          <Route exact path='/search/:s_query=:s_query?' render={withSuspense(Search)} />
          <Route exact path='/login' render={withSuspense(Login)} />
          <Route exact path='/profile' render={withSuspense(Profile)} />

          <Route exact path='/popular-movies' render={() => <PopularMovies />} />
          <Route exact path='/now-playing' render={withSuspense(NowPlaying)} />
          <Route exact path='/upcoming' render={withSuspense(Upcoming)} />
          <Route exact path='/person' render={withSuspense(Person)} />

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
