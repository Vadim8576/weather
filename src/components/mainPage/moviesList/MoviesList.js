import React, { useState, useEffect } from 'react';
import './../../../styles/popular_movies.css';
import { Spinner, Popover, OverlayTrigger, Button } from 'react-bootstrap';
// import PaginationButtons from '../../pagination/PaginationButtons';
import Card from './Card';


// import { fetchingPopularMovies } from '../../redux/movie_reducer';




const MoviesList = ({ rateMovieDelete, discover_movies_is_fetching, data, isAuth, session_id, setRateMovie, accountStates, your_rate, ...props }) => {
    // debugger;


    return (
        <div className='card_container'>
            {discover_movies_is_fetching
                ? <Cards
                    data={data}
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
    )
}




const Cards = ({ data, isAuth, setRateMovie, session_id, accountStates, your_rate, rateMovieDelete }) => {


    console.log('isAuth=', isAuth);
    // console.log('default_rate', your_rate);


    // const [rate, setRate] = useState(0);

    const [rateVisibleId, setRateVisibleId] = useState(null);


    useEffect(() => {
        //document.addEventListener('click', handleClickOutside);
        //return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleClickOutside = (e) => {

        const rate_drop_down = document.getElementsByClassName('rate_drop_down');
        const rate_btn = document.getElementsByClassName('.rate_btn');

        for (let b in rate_drop_down)
            if (!e.path.includes(b)) {
                // Если в области кликнутого элемента нет "rate_drop_down", то проверяем ниже
                // Не произведен ли клик на кнопку, открывающую окно смайлов
                for (let c in rate_btn)
                    if (!e.path.includes(c)) setRateVisibleId(null);
                // Если клик не производился и на кнопку открытия окна смайлов, то скрываем блок.


            }

        // setRateVisibleId(null);
    }



    const rateMovie = ({ id, rate }) => {
        setRateMovie({ id, session_id, rate });
    }

    const rateMovieRemove = ({ id }) => {
        rateMovieDelete({ id, session_id });
    }



    return (
        <>
            {data.length > 0
            ?data.map(item =>
                <Card
                    key={item.id}
                    item={item}
                    session_id={session_id}
                    rateMovie={rateMovie}
                    rateMovieRemove={rateMovieRemove}
                    isAuth={isAuth}
                    your_rate={your_rate}
                    accountStates={accountStates}
                    rateVisibleId={rateVisibleId}
                    setRateVisibleId={setRateVisibleId}
                />
            )
            : <p>Нет фильмов, соответствующих данному фильтру</p>
            }
        </>
    )
}







export default MoviesList;