import React from 'react';
import { NavLink } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';


const MovieDetailsCredits = ({ credits }) => {

    return (
        <div className='credits'>
            <div className='cast'>

                <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        Актеры:
                                 </ListGroup.Item>
                    {credits.cast ? credits.cast.map(i =>
                        <ListGroup.Item as="li" key={i.credit_id}>
                            <div className='credits_list'>
                                <div className='photo'>
                                    <NavLink to={`/people/${i.id}`} className='link'>
                                        <img className='border' src=
                                            {i.profile_path ? `https://image.tmdb.org/t/p/w138_and_h175_face${i.profile_path}` : '/img/no_photo.jpg'}
                                            alt='профайл' />
                                    </NavLink>
                                </div>
                                <div>
                                    <div>
                                        <NavLink to={`/people/${i.id}`} className='link'>
                                            {i.name}
                                        </NavLink>
                                    </div>
                                    <div><i>{i.character}</i></div>
                                </div>
                            </div>
                        </ListGroup.Item>) : 'нет данных об актерах'}
                </ListGroup>
            </div>
            <div className='crew'>
                <ListGroup as="ul">
                    <ListGroup.Item as="li" active>
                        Съемочная группа:
                                 </ListGroup.Item>
                    {credits.crew ? credits.crew.map(i =>
                        <ListGroup.Item as="li" key={i.credit_id}>
                            <div className='credits_list'>
                                <div className='photo'>
                                    <NavLink to={`/people/${i.id}`} className='link'>
                                        <img className='border' src=
                                            {i.profile_path ? `https://image.tmdb.org/t/p/w138_and_h175_face${i.profile_path}` : '/img/no_photo.jpg'}
                                            alt='профайл' />
                                    </NavLink>
                                </div>
                                <div>
                                    <div>
                                        <NavLink to={`/people/${i.id}`} className='link'>
                                            {i.name}
                                        </NavLink>
                                    </div>
                                    <div><i>{i.job}</i></div>
                                </div>
                            </div>
                        </ListGroup.Item>) : 'нет данных о съемочной группе'}
                </ListGroup>
            </div>
        </div>
    )
}


export default MovieDetailsCredits;