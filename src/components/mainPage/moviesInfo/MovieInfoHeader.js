import React from 'react';
import { Badge } from 'react-bootstrap';
import mySetDate from '../../../common/mySetDate';
import { NavLink, Link } from 'react-router-dom';
import './../../../styles/info_pages.css';


const MovieDetailsHeader = ({ movie_info }) => {

    const release_date = movie_info.release_date ? mySetDate(movie_info.release_date) : 'нет данных';

    return (

        <div className='details_header border'>
            <div className='details_header_left'>
                <div className='poster'>
                    <img src={movie_info.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie_info.poster_path}` : '/img/no_poster.jpg'} alt='постер' />
                </div>

                <div className='details_header_rate'>
                    <p>Пользовательский рейтинг: <Badge variant="info">{movie_info.vote_average ? movie_info.vote_average : '0'}</Badge></p>

                    {movie_info.videos.results.length > 0 &&
                        <><hr /><p>Трейлеры:</p></>}
                    {movie_info.videos.results.map(i =>
                        <div key={i.id}>
                            <a href={`https://www.themoviedb.org/video/play?key=${i.key}`} target='_blank'>
                                {i.name}
                            </a><br />
                        </div>
                    )
                    }

                </div>
            </div>

            <div className='text'>
                <h4>{movie_info.title ? movie_info.title : 'Нет названия'}</h4>
                <hr />
                <p>Оригинальное название: {movie_info.original_title ? movie_info.original_title : 'нет данных'}</p>
                <p>Слоган: {movie_info.tagline ? movie_info.tagline : 'нет данных'}</p>
                <p>Жанр: {movie_info.genres ? movie_info.genres.map(i => i.name + ', ') : 'нет данных'}</p>
                <p>Дата релиза: {release_date} &nbsp;
                                <NavLink to={`/movie-releases/${movie_info.id}`} className='nav-link'>подробнее</NavLink>
                </p>
                <p>Страна производства: {movie_info.production_countries ? movie_info.production_countries.map(i => i.name + ', ') : 'нет данных'}</p>
                <p>Студия:
                                {movie_info.production_companies
                        ? movie_info.production_companies.map(i =>
                            <span key={i.id}><br />
                                {i.logo_path
                                    && <img className='company_logo' src={`https://image.tmdb.org/t/p/original${i.logo_path}`} alt='logo' />}
                                        &nbsp;{i.name}

                            </span>

                        )
                        : 'нет данных'}
                </p>
                <p>Бюджет: {movie_info.budget ? movie_info.budget + '$' : 'нет данных'}</p>
                <p>Сборы: {movie_info.revenue ? movie_info.revenue + '$' : 'нет данных'}</p>
                <p>Продолжительность: {movie_info.runtime ? movie_info.runtime + ' мин' : 'нет данных'}</p>
                <p>Статус: {movie_info.status ? movie_info.status : 'нет данных'}</p>

                {movie_info.homepage
                    && <p><a href={movie_info.homepage} target='_blank' className='nav-link'>Домашняя страница</a></p>
                }

                {/* <p>Домашняя страница: {movie_info.homepage ? movie_info.homepage : 'нет данных'}</p> */}
                {movie_info.overview
                    ? <>
                        <details>
                            <summary>Краткое описание:</summary>
                            <p>{movie_info.overview}</p>
                        </details>
                    </>
                    : 'Описание отсутствует'}
            </div>
        </div>

    )
}


export default MovieDetailsHeader;