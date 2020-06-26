import React, { useEffect } from 'react';
import RateStars from './rateStars';
import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';




const Card = ({ item, session_id, rateMovie, rateMovieRemove, isAuth, your_rate, accountStates, rateVisibleId, setRateVisibleId }) => {



    return (
        <div className='card_wrapp'>
            {/* <NavDropdown title="0" id="basic-nav-dropdown">

            </NavDropdown> */}
            <div className={`rate_drop_down border ${rateVisibleId === item.id ? 'visible' : ''}`}>
                {isAuth
                    ? <>
                        
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




            <div className='rate_btn border' onClick={(e) => {
                if (!rateVisibleId) {
                    const id = item.id;
                    accountStates({ id, session_id });
                    setRateVisibleId(item.id);
                } else {
                    setRateVisibleId(null);
                }
                e.preventDefault();
                e.stopPropagation();
            }}>
                {/* &#9660; */}
                {/* сердечко &#10084; */}
                &#9733;
            </div>

            <NavLink to={`/movie-info/${item.id}`} className='navbar-brand'>
                <div className='card'>
                    <div className='content'>
                        <img src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '/img/no_poster.jpg'} alt='популярный фильм' />


                            <div className='description'>
                                <span>{item.title}</span>
                                <br />
                                <span><i>{item.release_date}</i></span>
                                <span>Рейтинг: {item.vote_average}</span>
                            </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}


export default Card;