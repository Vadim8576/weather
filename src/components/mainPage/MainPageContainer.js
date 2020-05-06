import React, { useEffect } from 'react';
// import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {fetchingPopularMovies} from './../../redux/movie_reducer';
import PopularMovies from './PopularMovies';


const MainPage = ({fetchingPopularMovies, ...props}) => {
    
    useEffect(() => {
        console.log(props.current_page)
        fetchingPopularMovies(props.current_page);
      }, [props.current_page]);

    return (
        <>
            
           <PopularMovies {...props} fetchingPopularMovies={fetchingPopularMovies} />

        </>
    )
}

const getStateToProps = (state) => (
    {
        // request_token: state.auth.request_token,
        popular_movies: state.movies.popular_movies,
        popular_movies_isFetching: state.movies.popular_movies_isFetching,
        total_pages: state.pagination.total_pages,
        total_results: state.pagination.total_results,
        current_page: state.pagination.current_page
    }
  )
  

const MainPageContainer = connect(getStateToProps,
    {
        fetchingPopularMovies
    })(MainPage);

  export default MainPageContainer;