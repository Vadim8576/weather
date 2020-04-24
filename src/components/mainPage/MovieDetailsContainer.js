import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails } from '../../redux/movie_reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './../../styles/MovieDetails.css'

const MovieDetails = ({ getDetails, ...props }) => {

    const movie_details = props.movie_details;
    console.log(props.match.params.movie_id);


    console.log(movie_details.genres);


    if(movie_details.genres) movie_details.genres.map(g => console.log(g.name));


    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getDetails(movie_id);
    }, [])

    return (
        <div className='movie_details_container'>
            {/* <div>Детали фильма</div> */}

            {/* {movie_details.backdrop_path &&
                <img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie_details.backdrop_path}`} alt='' />
            } */}

            {/* <div className='lighten'></div> */}


            <div className='details_header'>
                <div className='poster'>
                    <img src={movie_details.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie_details.poster_path}` : '/img/no_poster.jpg'} alt='постер' />
                </div>

                <div className='text'>
                    <h4>{movie_details.title ? movie_details.title : 'Нет названия'}</h4>

                    <p>Оригинальное название: {movie_details.original_title ? movie_details.original_title : 'нет данных'}</p>
                    <p>Слоган: {movie_details.tagline ? movie_details.tagline : 'нет данных'}</p> 
                    <p>Дата релиза: {movie_details.release_date ? movie_details.release_date : 'нет данных'}</p>
                    <p>Страна производства: {movie_details.production_countries ? movie_details.production_countries.map(i => i.name + ', ') : 'нет данных'}</p>
                    <p>Студия: {movie_details.production_companies ? movie_details.production_companies.map(i => i.name + ', ') : 'нет данных'}</p>
                    <p>Бюджет: {movie_details.budget ? movie_details.budget +'$' : 'нет данных'}</p>
                    <p>Рейтинг: {movie_details.popularity ? movie_details.popularity : 'нет данных'}</p>
                    <p>Сборы: {movie_details.revenue ? movie_details.revenue + '$' : 'нет данных'}</p>
                    <p>Продолжительность: {movie_details.runtime ? movie_details.runtime + ' мин' : 'нет данных'}</p>
                    <p>Статус: {movie_details.status ? movie_details.status : 'нет данных'}</p>
                    <p>Жанры: {movie_details.genres ? movie_details.genres.map(i => i.name + ', ') : 'нет данных'}</p>
                    <p>Домашняя страница: {movie_details.homepage ? movie_details.homepage : 'нет данных'}</p>
                    <p>Краткое описание: {movie_details.overview ? movie_details.overview : 'нет данных'}</p>
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