import React from 'react';
import { Badge } from 'react-bootstrap';
import mySetDate from '../../../common/mySetDate';
import { NavLink } from 'react-router-dom';


const MovieDetailsHeader = ({ movie_details }) => {

    const release_date = movie_details.release_date ? mySetDate(movie_details.release_date) : 'нет данных';

    return (
        <>
            <div className='details_header border'>
                <div className='poster'>
                    <img src={movie_details.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie_details.poster_path}` : '/img/no_poster.jpg'} alt='постер' />
                    <div className='details_header_rate'>
                        <p>Рейтинг: <Badge variant="info">{movie_details.vote_average ? movie_details.vote_average : '0'}</Badge></p>

                        {movie_details.videos.results.length > 0 &&
                            <><hr /><p>Трейлеры:</p></>}
                        {movie_details.videos.results.map(i =>
                            <div key={i.id}>
                                <a href={`https://www.themoviedb.org/video/play?key=${i.key}`}>
                                    {i.name}
                                </a><br />
                            </div>
                        )
                        }

                    </div>
                    <details>
                        <summary>детали</summary>
                        <p>подробнее о деталях</p>
                    </details>
                </div>

                <div className='text'>
                    <h4>{movie_details.title ? movie_details.title : 'Нет названия'}</h4>
                    <hr />
                    <p>Оригинальное название: {movie_details.original_title ? movie_details.original_title : 'нет данных'}</p>
                    <p>Слоган: {movie_details.tagline ? movie_details.tagline : 'нет данных'}</p>
                    <p>Жанр: {movie_details.genres ? movie_details.genres.map(i => i.name + ', ') : 'нет данных'}</p>
                    <p>Дата релиза: {release_date} &nbsp;
                                <NavLink to={`/movie_releases/${movie_details.id}`} className='nav-link'>подробнее</NavLink>
                    </p>
                    <p>Страна производства: {movie_details.production_countries ? movie_details.production_countries.map(i => i.name + ', ') : 'нет данных'}</p>
                    <p>Студия:
                                {movie_details.production_companies
                            ? movie_details.production_companies.map(i =>
                                <span key={i.id}><br />
                                    {i.logo_path
                                        && <img className='company_logo' src={`https://image.tmdb.org/t/p/original${i.logo_path}`} alt='logo' />}
                                        &nbsp;{i.name}

                                </span>

                            )
                            : 'нет данных'}
                    </p>
                    <p>Бюджет: {movie_details.budget ? movie_details.budget + '$' : 'нет данных'}</p>
                    <p>Сборы: {movie_details.revenue ? movie_details.revenue + '$' : 'нет данных'}</p>
                    <p>Продолжительность: {movie_details.runtime ? movie_details.runtime + ' мин' : 'нет данных'}</p>
                    <p>Статус: {movie_details.status ? movie_details.status : 'нет данных'}</p>
                    <p>Домашняя страница: {movie_details.homepage ? movie_details.homepage : 'нет данных'}</p>
                    <p>Краткое описание: {movie_details.overview ? movie_details.overview : 'нет данных'}</p>
                </div>
            </div>
        </>
    )
}


export default MovieDetailsHeader;