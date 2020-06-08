import React, {useEffect} from 'react';
import RateStars from './rateStars';
import { NavLink } from 'react-router-dom';




const Card = ({item, session_id, rateMovie, rateMovieRemove, isAuth, your_rate, accountStates, rateVisibleId, setRateVisibleId}) => {
   


    return (
        <div className='card_wrapp'>
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

            <div className='rate_btn' onClick={(e) => {
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
                &#9660;
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


export default Card;