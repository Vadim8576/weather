import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails, getCredits } from '../../../redux/movie_reducer';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import './../../../styles/movieDetails.css'
import { Spinner, ListGroup } from 'react-bootstrap';
import MovieDetailsHeader from './MovieDetailsHeader';
import MovieDetailsCredits from './MovieDetailsCredits';




const MovieDetails = ({ getDetails, getCredits, movie_details, movie_details_isFetching, credits, ...props }) => {


    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getDetails(movie_id);
        getCredits(movie_id);
    }, [props.match.params.movie_id])

    return (
        <>
            {!movie_details_isFetching && <Spinner animation='border' />}
            {movie_details_isFetching &&
                <div className='movie_details_container'>

                    <MovieDetailsHeader
                        movie_details={movie_details}
                    />


                    <MovieDetailsCredits credits={credits} />
                </div>
            }

        </>
    )
}


const getStateToProps = (state) => (
    {
        movie_details: state.movies.movie_details,
        credits: state.movies.credits,
        movie_details_isFetching: state.movies.movie_details_isFetching
    }
)


const MovieDetailsContainer = compose(connect(getStateToProps,
    { getDetails, getCredits }), withRouter)(MovieDetails);

export default MovieDetailsContainer;