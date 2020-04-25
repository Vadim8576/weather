import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPeople, getImages } from '../../redux/people_reducer';
import { withRouter, NavLink } from 'react-router-dom';
import { compose } from 'redux';
import { Spinner, Modal } from 'react-bootstrap';

import './../../styles/MovieDetails.css';




const setDate = (d) => {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        // hour: 'numeric',
        // minute: 'numeric',
        // second: 'numeric',
        timezone: 'UTC'
    };
    return new Date(d).toLocaleString("ru", options);
}




const People = ({ getPeople, people_isFetching, people, filmography, filmography_isFetching, getImages, images_isFetching, people_image, ...props }) => {



    const birthday = people.birthday ? setDate(people.birthday) : 'нет данных';
    const deathday = people.deathday ? setDate(people.deathday) : '';
    // const age = deathday - birthday;

    console.log('people_image',people_image);

    useEffect(() => {
        const people_id = props.match.params.people_id;
        getPeople(people_id);
    }, [])

    const [show, setShow] = useState(false);


    return (
        <>
            {!people_isFetching && <Spinner animation='border' />}

            <Modal
                people_image={people_image}
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-10w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {images_isFetching
                    ? people_image.map((i, index) => <div key={index} className='people_photos'><img src={`https://image.tmdb.org/t/p/w500${i.file_path}`} alt=''/></div>)
                    : <Spinner animation='border' />
                    }
                    
                </Modal.Body>
            </Modal>
            <div className='movie_details_container'>
                {people_isFetching &&
                    <div className='details_header border'>
                        <div className='poster' onClick={() => {
                            
                            setShow(true);
                            getImages(people.id);
                         
                                
                        }}>
                            <img src={people.profile_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${people.profile_path}` : '/img/no_photo.jpg'} alt='постер' />
                        </div>

                        <div className='text'>
                            <h4>{people.name ? people.name : 'Данные отсутствуют'}</h4>
                            <hr />
                            <p>Дата рождения: {birthday}</p>
                            {deathday && <p> Дата смерти: {deathday}</p>}
                            <p>Место рождения: {people.place_of_birth ? people.place_of_birth : 'нет данных'}</p>
                            <p>Так же известен(на), как: {people.also_known_as.map(i => i + ', ') || 'нет данных'}</p>

                            <p>Домашняя страница: {people.homepage ? people.homepage : 'нет данных'}</p>
                            <p>Биография: {people.biography ? people.biography : 'нет данных'}</p>

                        </div>
                    </div>
                }
                {filmography_isFetching
                    ? <div className='credits border'>
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
                                                {i.release_date && <div><i>{setDate(i.release_date)}</i></div>}
                                            </div>
                                        </div>


                                    </li>) : 'нет данных об актерах'}
                            </ul>
                        </div>
                        <div className='crew'>
                            <h5> Принимал участие:</h5>
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
            </div>
        </>
    )
}


const getStateToProps = (state) => (
    {
        people: state.people.people,
        people_isFetching: state.people.people_isFetching,
        filmography: state.people.filmography,
        filmography_isFetching: state.people.filmography_isFetching,
        people_image: state.people.people_image,
        images_isFetching: state.people.images_isFetching
    }
)


const PeopleContainer = compose(connect(getStateToProps,
    { getPeople, getImages }), withRouter)(People);

export default PeopleContainer;