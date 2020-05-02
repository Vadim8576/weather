import React, { useEffect, useState } from 'react';
import './../../styles/popular_movies.css';
import { Spinner } from 'react-bootstrap';
import PaginationButtons from './../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres, setRequestData, setRequestDataGenreIds } from '../../redux/genres_reducer';


const PopularMovies = ({ popular_movies, popular_movies_isFetching, getGenres, genres, setRequestData, request, setRequestDataGenreIds, genres_class, ...props }) => {

    console.log('request=', request);

    useEffect(() => {
        getGenres();
    }, []);


    let ids = [];

    // const cls = [''];

    // if (genres_class) {
    //     cls.push(' active');
    // }


    
    // const [id, setId] = useState([]);
    // setId(id => [...id, 'query']);
    // console.log(id);


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
                            <option value='popularity.asc'>популярности (убывание)</option>
                            <option value='popularity.desc'>популярности (возрастание)</option>
                            <option value='original_title.asc'>названию (убывание)</option>
                            <option value='original_title.desc'>названию (возрастание)</option>
                            <option value='release_date.asc'>дата релиза (убывание)</option>
                            <option value='release_date.desc'>дата релиза (возрастание)</option>
                        </select>
                    </div>
                    <div className='filter border'>
                        <h6>Фильтр</h6>
                        <hr />
                        <p>Дата выхода:</p>
                        <label>
                            от <input type='date' name='release_date_gte' onChange={(e) => setRequestData({ release_date_gte: e.target.value })} />
                            <br />
                            до <input type='date' name='release_date_lte' onChange={(e) => setRequestData({ release_date_lte: e.target.value })} />
                        </label>
                        <hr />
                        <p>Жанры:</p>
                        {genres && genres.map((item, index) => <span key={item.id} onClick={() => {

                            // setRequestDataGenreIds({ genres_ids: item.id });


                            if (ids.length > 0) {
                                const id = ids.indexOf(item.id);
                                if (id != -1) { // если такой уже есть - удалить
                                    // setRequestData({ genres_ids: item.id });
                                    // setRequestData({genres_ids: request.genres_ids = request.genres_ids.filter(genre => genre !== item.id)});
                                    ids = ids.filter(genre => genre !== item.id).join();
                                } else { // если такого нет - добавить
                                    // setRequestData({ genres_ids: item.id });
                                    ids.push(item.id);

                                }
                            } else {
                                // setRequestData({ genres_ids: item.id });
                                ids.push(item.id);
                            }

                            // const idstr = ids.join();
                            setRequestDataGenreIds( ids )
                            console.log(ids);

                        }

                        } className={'border'}>{item.name}</span>)
                        }
                    </div>

                </div>

                <div className='right_side'>
                    {popular_movies_isFetching && <PaginationButtons {...props} />}

                    <hr />

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
                </div>




            </div>
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


const mapStateToProps = state => ({
    genres: state.genres.genres,
    request: state.genres.request,
    genres_class: state.genres.genres_class
})





export default connect(mapStateToProps,
    {
        getGenres,
        setRequestData,
        setRequestDataGenreIds
    })(PopularMovies);