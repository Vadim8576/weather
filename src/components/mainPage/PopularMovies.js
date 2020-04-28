import React from 'react';
import './../../styles/popular_movies.css';
import { Spinner } from 'react-bootstrap';
import PaginationButtons from './../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';



const PopularMovies = ({ popular_movies, popular_movies_isFetching, ...props }) => {

    return (
        <>

            <h4>Самые популярные фильмы на <a href='https://www.themoviedb.org' target='_blank'> TMDb</a>:</h4>


            {popular_movies_isFetching && <PaginationButtons {...props} />}

            <hr />


            {/* <NavLink to='/main' className='navbar-brand'><img className='logo' src={logoPath} alt='logo' /></NavLink> */}

            <div className='card_container'>
                {popular_movies_isFetching
                    ? popular_movies.map(item =>
                        <NavLink to={`/movie_info/${item.id}`} className='navbar-brand' key={item.id}>
                            <Card {...item} />
                        
                        </NavLink>)
                    : <Spinner animation='border' />
                }
            </div>
            <hr />
            {popular_movies_isFetching && <PaginationButtons {...props} />}
        </>
    )
}




const Card = ({ poster_path, ...props }) => {
    return (
        <div className='card'>
            <div className='content'>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : '/img/no_poster.jpg'} alt='популярный фильм' />

                {/* <div className=''></div> */}
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