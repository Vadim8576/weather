import React, { useEffect, useState } from 'react';
import './../../styles/popular_movies.css';
import { Spinner } from 'react-bootstrap';
import PaginationButtons from './../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres, setRequestData, setRequestDataGenreIds } from '../../redux/genres_reducer';
import { getDiscoverMovies } from '../../redux/discover_reducer';



const PopularMovies = ({ discover_movies, getDiscoverMovies, discover_movies_is_fetching, popular_movies, popular_movies_isFetching, getGenres, genres, setRequestData, request, setRequestDataGenreIds, request_btn_is_visible, ...props }) => {


    // console.log('request=', request);

    useEffect(() => {
        getGenres();
    }, []);

    useEffect(() => {
        console.log('discover_movies_is_fetching=', discover_movies_is_fetching);
        console.log('popular_movies_isFetching=', popular_movies_isFetching);
    }, [discover_movies_is_fetching, popular_movies_isFetching]);


    return (
        <>
            <div className='tittle'>
                <h5>Популярные фильмы на <a href='https://www.themoviedb.org' target='_blank'> TMDb</a>:</h5>
            </div>
            <div className='sides_wrapper'>

                <div className='left_side'>
                    <div className='sort border'>
                        <h6>Сортировка</h6>
                        <hr />
                        <p>Сортировать по:</p>

                        <select onChange={(e) => setRequestData({ sort_by: e.target.value })}>
                            <option value='popularity.asc'>популярности (возрастание)</option>
                            <option value='popularity.desc'>популярности (убывание)</option>
                            <option value='original_title.asc'>названию (возрастание)</option>
                            <option value='original_title.desc'>названию (убывание)</option>
                            <option value='release_date.asc'>дата релиза (возрастание)</option>
                            <option value='release_date.desc'>дата релиза (убывание)</option>
                        </select>
                    </div>
                    <div className='filter border'>
                        <h6>Фильтр</h6>
                        <hr />
                        <p>Дата выхода:</p>
                        <label>
                            от <input type='date' onChange={(e) => setRequestData({ release_date_gte: e.target.value })} />
                            <br />
                            до <input type='date' onChange={(e) => setRequestData({ release_date_lte: e.target.value })} />
                        </label>
                        <hr />
                        <p>Жанры:</p>
                        {genres && genres.map((item, index) =>
                            <span
                                className={request.genres_ids.indexOf(item.id) !== -1 ? 'active border' : 'border'}
                                key={item.id}
                                onClick={() => setRequestDataGenreIds(item.id)}
                            >
                                {item.name}
                            </span>)
                        }
                    </div>

                </div>
                {request_btn_is_visible &&
                    <div className='request_btn' onClick={() => {
                        getDiscoverMovies(request);
                    }}>Применить</div>
                }

                <div className='right_side'>


                    <h3>Сделать отдельный редюсер для пагинации</h3>


                    
                    <PaginationButtons {...props} />
                    <hr />
                    <div className='card_container'>
                        {discover_movies_is_fetching
                           &&  <Cards data={discover_movies} is_fetching={discover_movies_is_fetching} />
                            
                        }

                        {popular_movies_isFetching
                            ? <Cards data={popular_movies} is_fetching={popular_movies_isFetching} />
                            : <Spinner animation='border' />
                        }




                    </div>
                    <hr />
                    <PaginationButtons {...props} />
                </div>




            </div>
        </>
    )
}




const Cards = ({ data, is_fetching }) => {
    return (
        <>
            {data.map(item =>
                <NavLink to={`/movie_info/${item.id}`} className='navbar-brand' key={item.id}>
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


const mapStateToProps = state => ({
    genres: state.genres.genres,
    request: state.genres.request,
    request_btn_is_visible: state.genres.request_btn_is_visible,
    discover_movies_is_fetching: state.discover.discover_movies_is_fetching,
    discover_movies: state.discover.discover_movies
})





export default connect(mapStateToProps,
    {
        getGenres,
        setRequestData,
        setRequestDataGenreIds,
        getDiscoverMovies
    })(PopularMovies);