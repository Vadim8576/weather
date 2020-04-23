import React, { useEffect } from 'react';
// import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchingPopularMovies} from './../../redux/movie_reducer';
import PopularMovies from './PopularMovies';


const MainPage = ({fetchingPopularMovies, popular_movies, isFetching, ...props}) => {

    // debugger;

    useEffect(() => {
        fetchingPopularMovies();
      }, []);

    return (
        <div className='mainPage'>
            
           <PopularMovies popular_movies={popular_movies} isFetching={isFetching}/>

        </div>
    )
}

const getStateToProps = (state) => (
    {
        // request_token: state.auth.request_token,
        popular_movies: state.movies.popular_movies,
        isFetching: state.movies.isFetching
    }
  )
  

const MainPageContainer = connect(getStateToProps,
    {
        fetchingPopularMovies
    })(MainPage);

  export default MainPageContainer;