import React from 'react';
import { NavLink } from 'react-router-dom';
import { Spinner, ListGroup } from 'react-bootstrap';
import mySetDate from '../../../common/mySetDate';




const PeopleCredits = ({ filmography, filmography_isFetching }) => {
    return (
        <>
            {!filmography_isFetching && <Spinner animation='border' />}
            {filmography_isFetching &&
                <div className='credits'>
                    <div className='cast'>
                        <ListGroup as="ul">
                            <ListGroup.Item as="li" active>
                                Фильмография:
                            </ListGroup.Item>
                            {filmography.cast ? filmography.cast.map(i =>
                                <ListGroup.Item as="li" key={i.credit_id}>
                                    <div className='credits_list'>
                                        <div className='photo'>
                                            <NavLink to={`/movie_details/${i.id}`} className='link'>
                                                <img className='border' src=
                                                    {i.poster_path ? `https://image.tmdb.org/t/p/w500${i.poster_path}` : '/img/no_poster.jpg'}
                                                    alt='профайл' />
                                            </NavLink>
                                        </div>
                                        <div>

                                            {i.original_title &&
                                                <div>
                                                    <NavLink to={`/movie_details/${i.id}`} className='link'>
                                                        {i.title}
                                                    </NavLink>
                                                </div>}
                                            {i.character && <div><i>{i.character}</i></div>}
                                            {i.release_date && <div><i>{mySetDate(i.release_date)}</i></div>}
                                        </div>
                                    </div>
                                </ListGroup.Item>) : 'нет данных об актерах'}
                        </ListGroup>
                    </div>


                    <div className='crew'>

                        {filmography.crew.length > 0
                            ? <ListGroup as="ul">
                                <ListGroup.Item as="li" active>
                                    Фильмография:
                                </ListGroup.Item>
                                {filmography.crew.map(i =>
                                    <ListGroup.Item as="li" key={i.credit_id}>
                                        <div className='credits_list'>
                                            <div className='photo'>
                                                <NavLink to={`/movie_details/${i.id}`} className='link'>
                                                    <img className='border' src=
                                                        {i.poster_path ? `https://image.tmdb.org/t/p/w500${i.poster_path}` : '/img/no_photo.jpg'}
                                                        alt='профайл' />
                                                </NavLink>
                                            </div>
                                            <div>
                                                <div>
                                                    <NavLink to={`/movie_details/${i.id}`} className='link'>
                                                        {i.title}
                                                    </NavLink>
                                                </div>
                                                <div><i>{i.job}</i></div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>)}
                            </ListGroup> : '    '

                        }


                    </div>
                </div>
            }
        </>
    )
}


export default PeopleCredits;