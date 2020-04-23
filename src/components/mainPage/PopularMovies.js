import React from 'react';
import './../../styles/popular_movies_cards.css';
import { Spinner } from 'react-bootstrap';



const PopularMovies = ({ popular_movies, isFetching }) => {
    console.log('isFetching=', isFetching);
    return (
        <div className='popular_movies'>
            <h4>Популярные фильмы на <a href='https://www.themoviedb.org' target='_blank'> TMDb</a>:</h4>
            <hr></hr>
            <div className='card_container'>
                {isFetching
                    ? popular_movies.map(item => <Card key={item.id} {...item} />)
                    : <Spinner animation='border' />
                }
            </div>
        </div>
    )
}


const Card = (props) => {
    return (
        <div className='card'>
            <div className='content'>
                <img src={`https://image.tmdb.org/t/p/w154${props.poster_path}`} alt='популярный фильм' />
                <div className='description'>
                    <span><b>{props.title}</b></span>
                    <span><i>{props.release_date}</i></span>
                    <span>Рейтинг: {props.vote_average}</span>
                </div>
            </div>



        </div>
    )
}


export default PopularMovies;