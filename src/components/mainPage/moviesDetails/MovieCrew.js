import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getCredits, getDetails } from '../../../redux/movie_reducer';
import './../../../styles/movieReleases.css';
import './../../../styles/movieDetails.css';
import MapToCredits from '../MapToCredits';




let MovieCasts = ({getCredits, getDetails, movie_details, credits, ...props}) => {
    console.log(credits);

    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getDetails(movie_id);
        getCredits(movie_id);
    }, []);

    return (
        <div className='movie_casts_container'>
            <div className='realeases_header border'>
                <div className='realeases_poster'>
                    <NavLink to={`/movie_details/${props.match.params.movie_id}`} className='link'>
                        <img src={movie_details.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie_details.poster_path}` : '/img/no_poster.jpg'} alt='постер' />
                        Вернуться
                    </NavLink>
                </div>
                <div className='realeases_text'>
                    <h4>{movie_details.title}</h4>
                </div>
                <br />
            </div>


            {credits.crew && credits.crew.map((item, index) => <MapToCredits key={item.credit_id} item={item} config={{
            title: 'Съемочная группа',
            text: {
                name: 'name',
                job: 'job'
            },
            img: {
                property: 'profile_path',
                no_photo: '/img/no_photo.jpg',
                path: 'https://image.tmdb.org/t/p/w138_and_h175_face'
            },
            target: '/people/',
            link: '/crew/',
            class: 'movie_crew_list'
        }} />)}
        </div>
    )
}

const mapStateToProps = (state) => ({
    movie_details: state.movies.movie_details,
    credits: state.movies.credits
})


MovieCasts = compose(connect(mapStateToProps, {
    getCredits,
    getDetails
}), withRouter)(MovieCasts);

export default MovieCasts;