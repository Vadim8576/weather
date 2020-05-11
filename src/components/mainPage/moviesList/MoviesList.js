import React, { useState } from 'react';
import './../../../styles/popular_movies.css';
import { Spinner, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import PaginationButtons from '../../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';
// import { fetchingPopularMovies } from '../../redux/movie_reducer';




const MoviesList = ({ discover_movies_is_fetching, list, isAuth, session_id, rateMovie, getAccountStates, your_rate, ...props }) => {
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
                        rateMovie={rateMovie}
                        getAccountStates={getAccountStates}
                        your_rate={your_rate}
                        />
                    : <Spinner animation='border' />
                }
            </div>
            <hr />
            <PaginationButtons {...props} />
        </div>
    )
}




const Cards = ({ data, isAuth, rateMovie, session_id, getAccountStates, your_rate }) => {


    const [rate, setRate] = useState(10);
    const [rateVisibleId, setRateVisibleId] = useState(null);
    // console.log('isAuth=', isAuth);

    // const popover = (
    //     <Popover id="popover-basic">
    //         <Popover.Title as="h3">Ваш рейтинг</Popover.Title>
    //         <Popover.Content>

    //             {isAuth
    //                 ? <><input type="number" value={rate} onChange={(e) => setRate(e.currentTarget.value)} step='0.5' min='0.5' max='10' />
    //                     <button onClick={() => rateMovie()}>Оценить</button>
    //                 </>
    //                 : <>
    //                     <p>Хотите оценить?</p>
    //                     <NavLink to='login' className='navbar-brand'>Войти</NavLink>
    //                 </>

    //             }

    //         </Popover.Content>
    //     </Popover>

    // )

    return (
        <>
            {data.map(item =>
                <div className='card_wrapp' key={item.id}>

                    <div className={`rate_drop_down border ${rateVisibleId === item.id ? 'visible' : ''}`}>
                        {isAuth
                            ? <>
                                <p>Ваш рейтинг: {your_rate}</p>
                                <input type="number" value={rate} onChange={(e) => setRate(e.currentTarget.value)} step='0.5' min='0.5' max='10' />
                                <button onClick={() => {
                                    console.log(item.id);
                                    const id = item.id;
                                    rateMovie({ id, session_id, rate });
                                    setRateVisibleId(null);
                                }
                                }>Оценить</button>
                            </>
                            : <>
                                <p>Хотите оценить?</p>
                                <NavLink to='login' className='navbar-brand'>Войти</NavLink>
                            </>

                        }
                    </div>

                    <div className='rate_btn'>

                        <button variant='success' onClick={() => {
                            rateVisibleId ? setRateVisibleId(null) : setRateVisibleId(item.id);
                            const id = item.id;
                            if(isAuth) getAccountStates({id , session_id});
                        }}>&#9733;</button>
                      
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