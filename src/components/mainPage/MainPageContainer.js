import React, { useEffect } from 'react';
// import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchingPopularMovies, setCurrentPage} from './../../redux/movie_reducer';
import PopularMovies from './PopularMovies';


const MainPage = ({fetchingPopularMovies, ...props}) => {
    
    useEffect(() => {
        fetchingPopularMovies();
      }, []);

    return (
        <div className='mainPage'>
            
           <PopularMovies {...props} />

        </div>
    )
}

const getStateToProps = (state) => (
    {
        // request_token: state.auth.request_token,
        popular_movies: state.movies.popular_movies,
        isFetching: state.movies.isFetching,
        total_pages: state.movies.total_pages,
        total_results: state.movies.total_results,
        current_page: state.movies.current_page
    }
  )
  

const MainPageContainer = connect(getStateToProps,
    {
        fetchingPopularMovies,
        setCurrentPage
    })(MainPage);

  export default MainPageContainer;