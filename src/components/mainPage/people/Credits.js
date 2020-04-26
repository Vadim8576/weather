import React from 'react';
import { NavLink } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import mySetDate from '../../../common/mySetDate';




const Credits = ({filmography, filmography_isFetching}) => {
    return (
        <>
            {filmography_isFetching
                ? <div className='credits'>
                    <div className='cast'>
                        <h5>Фильмография:</h5>
                        <ul>
                            {filmography.cast ? filmography.cast.map(i =>
                                <li key={i.credit_id} className='border'>
                                    <div className='credits_list'>
                                        <div className='photo'>
                                            <NavLink to={`/movie_details/${i.id}`} className='navbar-brand'>
                                                <img src=
                                                    {i.poster_path ? `https://image.tmdb.org/t/p/w500${i.poster_path}` : '/img/no_poster.jpg'}
                                                    alt='профайл' />
                                            </NavLink>
                                        </div>
                                        <div>
                                            {i.original_title && <div><b>{i.title}</b></div>}
                                            {i.character && <div><i>{i.character}</i></div>}
                                            {i.release_date && <div><i>{mySetDate(i.release_date)}</i></div>}
                                        </div>
                                    </div>
                                </li>) : 'нет данных об актерах'}
                        </ul>
                    </div>


                    <div className='crew'>
                        {filmography.crew.length > 0 && <h5> Принимал(а) участие:</h5>}
                        <ul>
                            {filmography.crew ? filmography.crew.map(i =>
                                <li key={i.credit_id} className='border'>
                                    <div className='credits_list'>
                                        <div className='photo'>
                                            <NavLink to={`/movie_details/${i.id}`} className='navbar-brand'>
                                                <img src=
                                                    {i.poster_path ? `https://image.tmdb.org/t/p/w500${i.poster_path}` : '/img/no_photo.jpg'}
                                                    alt='профайл' />
                                            </NavLink>
                                        </div>
                                        <div>
                                            <div><b>{i.title}</b></div>
                                            <div><i>{i.job}</i></div>
                                        </div>
                                    </div>
                                </li>) : 'нет данных о съемочной группе'}
                        </ul>
                    </div>
                </div> : <Spinner animation='border' />}
        </>
    )
}


export default Credits;