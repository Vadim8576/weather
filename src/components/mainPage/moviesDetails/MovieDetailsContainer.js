import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails, getCredits } from '../../../redux/movie_reducer';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import './../../../styles/movieDetails.css'
import { Spinner } from 'react-bootstrap';
import MovieDetailsHeader from './MovieDetailsHeader';
import Credits from '../Credits';




const MovieDetails = ({ getDetails, getCredits, movie_details, movie_details_isFetching, credits, credits_isFetching, ...props }) => {


    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getDetails(movie_id);
        getCredits(movie_id);
    }, [props.match.params.movie_id])

    return (

        <div className='movie_details_container'>
            {movie_details_isFetching
                ? <MovieDetailsHeader
                    movie_details={movie_details}
                    movie_details_isFetching={movie_details_isFetching}
                />
                : <Spinner animation='border' />
            }

            {credits_isFetching
                ? <>
                    <Credits id={props.match.params.movie_id} data={credits.cast} type={['movie', 'cast']} />
                    <Credits id={props.match.params.movie_id} data={credits.crew} type={['movie', 'crew']} />
                </>
                : <Spinner animation='border' />
            }

        </div>

    )
}


const getStateToProps = (state) => (
    {
        movie_details: state.movies.movie_details,
        credits: state.movies.credits,
        movie_details_isFetching: state.movies.movie_details_isFetching,
        credits_isFetching: state.movies.credits_isFetching
    }
)


const MovieDetailsContainer = compose(connect(getStateToProps,
    { getDetails, getCredits }), withRouter)(MovieDetails);

export default MovieDetailsContainer;