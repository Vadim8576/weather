import React, { useState, useEffect, useRef } from 'react';
import './../../../styles/popular_movies.css';
import { Spinner, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import PaginationButtons from '../../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';
import RateStars from './rateStars';
// import { fetchingPopularMovies } from '../../redux/movie_reducer';




const MoviesList = ({ rateMovieDelete, discover_movies_is_fetching, list, isAuth, session_id, setRateMovie, accountStates, your_rate, ...props }) => {
    // debugger;
    

    return (
        <div className='right_side'>

            <PaginationButtons {...props} />
            <hr />
            <div className='card_container'>
                {discover_movies_is_fetching
                    ? <Cards
                        data={list}
                        isAuth={isAuth}
                        session_id={session_id}
                        setRateMovie={setRateMovie}
                        accountStates={accountStates}
                        your_rate={your_rate}
                        rateMovieDelete={rateMovieDelete}
                        />
                    : <Spinner animation='border' />
                }
            </div>
            <hr />
            <PaginationButtons {...props} />
        </div>
    )
}




const Cards = ({ data, isAuth, setRateMovie, session_id, accountStates, your_rate, rateMovieDelete }) => {


    console.log('isAuth=', isAuth);
    // console.log('default_rate', your_rate);


    // const [rate, setRate] = useState(0);
    const [rateVisibleId, setRateVisibleId] = useState(null);

    // useEffect(() => {
    //     setRate(your_rate);
    // }, [your_rate]);


    const rateMovie = ({id, rate}) => {
        setRateMovie({ id, session_id, rate });
    }

    const rateMovieRemove = ({id}) => {
        rateMovieDelete({ id, session_id });
    }
  


    return (
        <>
            {data.map(item =>
                <div className='card_wrapp' key={item.id}>

                    <div className={`rate_drop_down border ${rateVisibleId === item.id ? 'visible' : ''}`}>
                        {isAuth
                            ? <>
                                {/* <p>Ваш рейтинг: {your_rate}</p>
                                <input type="number" value={rate} onChange={(e) => setRate(e.currentTarget.value)} step='0.5' min='0.5' max='10' />
                                <button onClick={() => {
                                    console.log(item.id);
                                    const id = item.id;
                                    rateMovie({ id, session_id, rate });
                                    setRateVisibleId(null);
                                }
                                }>Оценить</button> */}

                                <RateStars
                                    id={item.id}
                                    // rate={rate}
                                    rateMovie={rateMovie}
                                    your_rate={your_rate}
                                    setRateVisibleId={setRateVisibleId}
                                    rateMovieRemove={rateMovieRemove}
                                />

                            </>
                            : <>
                                <p>Хотите оценить?</p>
                                <NavLink to='login' className='navbar-brand'>Войти</NavLink>
                            </>

                        }
                    </div>

                    <div className='rate_btn'>

                        <button onClick={() => {
                            if(!rateVisibleId){
                                const id = item.id;
                                accountStates({id, session_id});
                            }

                            rateVisibleId ? setRateVisibleId(null) : setRateVisibleId(item.id);
                            
                        }}>
                            {/* &#9733; */}
                            &#9660;
                           
                            </button>
                      
                    </div>

                    <NavLink to={`/movie-info/${item.id}`} className='navbar-brand'>
                        <div className='card'>
                            <div className='content'>
                                <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/img/no_poster.jpg'} alt='популярный фильм' />




                                {/* <div className='description'>
                                <span><b>{item.title}</b></span>
                                <span><i>{item.release_date}</i></span>
                                <span>Рейтинг: {item.vote_average}</span>
                            </div> */}
                            </div>
                        </div>
                    </NavLink>
                </div>)
            }
        </>
    )
}




export default MoviesList;