import React from 'react';
import './../../styles/popular_movies.css';
import { Spinner, Pagination } from 'react-bootstrap';
import PaginationButtons from './../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';



const PopularMovies = ({ popular_movies, isFetching, ...props }) => {

    return (
        <div className='popular_movies'>
            
            <h4>Самые популярные фильмы на <a href='https://www.themoviedb.org' target='_blank'> TMDb</a>:</h4>
            

            {isFetching && <PaginationButtons {...props} />}

            <hr />


            {/* <NavLink to='/main' className='navbar-brand'><img className='logo' src={logoPath} alt='logo' /></NavLink> */}

            <div className='card_container'>
                {isFetching
                    ? popular_movies.map(item => <NavLink to={`/movie_details/${item.id}`} className='navbar-brand' key={item.id}><Card {...item} /></NavLink>)
                    : <Spinner animation='border' />
                }
            </div>
            <hr />
            {isFetching && <PaginationButtons {...props} />}
        </div>
    )
}




const Card = ({poster_path, ...props}) => {
    return (
        <div className='card'>
            <div className='content'>
                <img src={poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}` : '/img/no_poster.jpg'} alt='популярный фильм' />
                
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