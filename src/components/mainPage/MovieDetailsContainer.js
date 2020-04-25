import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails, getCredits } from '../../redux/movie_reducer';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import './../../styles/MovieDetails.css'
import { Badge, Row, Col, Spinner } from 'react-bootstrap';



const setDate = (d) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      // hour: 'numeric',
      // minute: 'numeric',
      // second: 'numeric',
      timezone: 'UTC'
    };
    return new Date(d).toLocaleString("ru", options);
  }




const MovieDetails = ({ getDetails, getCredits, movie_details, movie_details_isFetching, credits, ...props }) => {

     const  release_date = movie_details.release_date ? setDate( movie_details.release_date) : 'нет данных';

    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getDetails(movie_id);
        // getCredits(movie_id);
    }, [props.match.params.movie_id])

    return (
        <>
            {!movie_details_isFetching && <Spinner animation='border' />}
            {movie_details_isFetching &&
                <div className='movie_details_container'>

                    <div className='details_header border'>
                        <div className='poster'>
                            <img src={movie_details.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie_details.poster_path}` : '/img/no_poster.jpg'} alt='постер' />
                            <div className='details_header_rate'>
                                <p>Рейтинг: <Badge variant="info">{movie_details.vote_average ? movie_details.vote_average : '0'}</Badge></p>
                            </div>
                        </div>

                        <div className='text'>
                            <h4>{movie_details.title ? movie_details.title : 'Нет названия'}</h4>
                            <hr />
                            <p>Оригинальное название: {movie_details.original_title ? movie_details.original_title : 'нет данных'}</p>
                            <p>Слоган: {movie_details.tagline ? movie_details.tagline : 'нет данных'}</p>
                            <p>Жанр: {movie_details.genres ? movie_details.genres.map(i => i.name + ', ') : 'нет данных'}</p>
                            <p>Дата релиза: {release_date}</p>
                            <p>Страна производства: {movie_details.production_countries ? movie_details.production_countries.map(i => i.name + ', ') : 'нет данных'}</p>
                            <p>Студия: {movie_details.production_companies ? movie_details.production_companies.map(i => i.name + ', ') : 'нет данных'}</p>
                            <p>Бюджет: {movie_details.budget ? movie_details.budget + '$' : 'нет данных'}</p>
                            <p>Сборы: {movie_details.revenue ? movie_details.revenue + '$' : 'нет данных'}</p>
                            <p>Продолжительность: {movie_details.runtime ? movie_details.runtime + ' мин' : 'нет данных'}</p>
                            <p>Статус: {movie_details.status ? movie_details.status : 'нет данных'}</p>
                            <p>Домашняя страница: {movie_details.homepage ? movie_details.homepage : 'нет данных'}</p>
                            <p>Краткое описание: {movie_details.overview ? movie_details.overview : 'нет данных'}</p>
                        </div>
                    </div>


                    <div className='credits border'>
                        <div className='cast'>
                            <h5>Актеры:</h5>
                            <ul>
                                {credits.cast ? credits.cast.map(i =>
                                    <li key={i.credit_id} className='border'>
                                        <div className='credits_list'>
                                            <div className='photo'>

                                                <NavLink to={`/people/${i.id}`} className='navbar-brand'>
                                                    <img src=
                                                        {i.profile_path ? `https://image.tmdb.org/t/p/w138_and_h175_face${i.profile_path}` : '/img/no_photo.jpg'}
                                                        alt='профайл' />
                                                </NavLink>

                                            </div>
                                            <div>
                                                <div><b>{i.name}</b></div>
                                                <div><i>{i.character}</i></div>
                                            </div>
                                        </div>
                                    </li>) : 'нет данных об актерах'}
                            </ul>
                        </div>
                        <div className='crew'>
                            <h5>Съемочная группа:</h5>
                            <ul>
                                {credits.crew ? credits.crew.map(i =>
                                    <li key={i.credit_id} className='border'>
                                        <div className='credits_list'>
                                            <div className='photo'>
                                            <NavLink to={`/people/${i.id}`} className='navbar-brand'>
                                                <img src=
                                                    {i.profile_path ? `https://image.tmdb.org/t/p/w138_and_h175_face${i.profile_path}` : '/img/no_photo.jpg'}
                                                    alt='профайл' />
                                            </NavLink>
                                            </div>
                                            <div>
                                                <div><b>{i.name}</b></div>
                                                <div><i>{i.job}</i></div>
                                            </div>
                                        </div>
                                    </li>) : 'нет данных о съемочной группе'}
                            </ul>
                        </div>
                    </div>
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