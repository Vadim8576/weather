import React, { useEffect } from 'react';
import './../../../styles/popular_movies.css';
import { Spinner } from 'react-bootstrap';
import PaginationButtons from '../../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres } from '../../../redux/genres_reducer';
// import { fetchingPopularMovies } from '../../redux/movie_reducer';
import { getDiscoverMovies, setRequestData, setRequestDataGenreIds, discoverMoviesIsFetching } from '../../../redux/discover_reducer';
import { setCurrentPage } from '../../../redux/pagination_reducer';
import FilterPanel from './FilterPanel';



const MoviesList = ({ discover_movies_is_fetching, list, ...props }) => {



    return (
        <div className='right_side'>

            <PaginationButtons {...props} />
            <hr />
            <div className='card_container'>
                {discover_movies_is_fetching
                    ? <Cards data={list} />
                    : <Spinner animation='border' />
                }
            </div>
            <hr />
            <PaginationButtons {...props} />
        </div>
    )
}




const Cards = ({ data }) => {
    return (
        <>
            {data.map(item =>
                <NavLink to={`/movie-info/${item.id}`} className='navbar-brand' key={item.id}>
                    <div className='card'>
                        <div className='content'>
                            <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/img/no_poster.jpg'} alt='популярный фильм' />

                            {/* <div className=''></div> */}
                            <div className='description'>
                                <span><b>{item.title}</b></span>
                                <span><i>{item.release_date}</i></span>
                                <span>Рейтинг: {item.vote_average}</span>
                            </div>
                        </div>
                    </div>
                </NavLink>)
            }
        </>
    )
}




export default MoviesList;