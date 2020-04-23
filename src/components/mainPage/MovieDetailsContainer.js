import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails } from '../../redux/movie_reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './../../styles/MovieDetails.css'

const MovieDetails = ({ getDetails, ...props }) => {

    const movie_details = props.movie_details;
    console.log(props.match.params.movie_id);
    // console.log(props.movie_details.backdrop_path);


    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getDetails(movie_id);
    }, [])

    return (
        <div className='movie_details_container'>
            {/* <div>Детали фильма</div> */}

            {movie_details.backdrop_path &&
                <img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie_details.backdrop_path}`} alt='' />
            }
            <div className='lighten'></div>


            <div className='details_header'>
                <div className='poster'>
                    <img src={movie_details.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie_details.poster_path}` : '/img/no_poster.jpg'} alt='постер' />
                </div>

                <div className='text'>
                    <h4>{movie_details.title}</h4>
                </div>
            </div>




        </div>

    )
}


const getStateToProps = (state) => (
    {
        movie_details: state.movies.movie_details
    }
)


const MovieDetailsContainer = compose(connect(getStateToProps,
    { getDetails }), withRouter)(MovieDetails);

export default MovieDetailsContainer;