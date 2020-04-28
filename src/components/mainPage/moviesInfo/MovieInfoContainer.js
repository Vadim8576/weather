import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails, getCredits } from '../../../redux/movie_reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Spinner } from 'react-bootstrap';
import MovieInfoHeader from './MovieInfoHeader';
import List from './../List';




const MovieInfo = ({ getDetails, getCredits, movie_info, movie_info_isFetching, credits, credits_isFetching, ...props }) => {
    // a = {context: 'movie cast', view: 'horizontal'}

    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getDetails(movie_id);
        getCredits(movie_id);
    }, [props.match.params.movie_id])

    return (

        <>
            {movie_info_isFetching
                ? <MovieInfoHeader
                    movie_info={movie_info}
                    movie_info_isFetching={movie_info_isFetching}
                />
                : <Spinner animation='border' />
            }


            {credits_isFetching
                ? <>
                    <List id={props.match.params.movie_id} data={credits.cast} type={{context: 'movie cast', view: 'horizontal'}} />
                    <List id={props.match.params.movie_id} data={credits.crew} type={{context: 'movie crew', view: 'horizontal'}} />
                </>
                : <Spinner animation='border' />
            }

        </>

    )
}


const mapStateToProps = (state) => (
    {
        movie_info: state.movies.movie_info,
        credits: state.movies.credits,
        movie_info_isFetching: state.movies.movie_info_isFetching,
        credits_isFetching: state.movies.credits_isFetching
    }
)


const MovieInfoContainer = compose(connect(mapStateToProps,
    { getDetails, getCredits }), withRouter)(MovieInfo);

export default MovieInfoContainer;