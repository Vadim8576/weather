import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getPeople } from '../../../redux/people_reducer';
import './../../../styles/page_with_full_list.css';
import List from './../List';




let MovieCasts = ({ getPeople, people, people_isFetching, filmography, filmography_isFetching, ...props }) => {
    // debugger;
    useEffect(() => {
        const people_id = props.match.params.people_id;
        getPeople(people_id);
    }, []);

    return (
        <>
            <div className='realeases_header border'>
                <div className='realeases_poster'>
                    <NavLink to={`/people/${props.match.params.people_id}`} className='link'>
                        <img src={people.profile_path ? `https://image.tmdb.org/t/p/w138_and_h175_face${people.profile_path}` : '/img/no_photo.jpg'} alt='постер' />
                        Вернуться
                    </NavLink>
                </div>
                <div className='realeases_text'>
                    <h4>{people.name}</h4>
                </div>
                <br />
            </div>

Добавить сортировку по году<br /><br />
            <List id={null} data={filmography.cast} type={{context: 'people cast', view: 'vertical'}} />


            {/* {filmography.cast && filmography.cast.map((item, index) => <MapToCredits key={item.id} item={item} config={{
                title: 'Актеры',
                text: {
                    name: 'name',
                    job: 'character'
                },
                img: {
                    property: 'poster_path',
                    no_photo: '/img/no_poster.jpg',
                    path: 'https://image.tmdb.org/t/p/w500'
                },
                target: '/movie_info/',
                link: '/people_filmography/',
                class: 'movie_casts_list'
            }} />)} */}
        </>
    )
}

const mapStateToProps = (state) => ({
    people: state.people.people,
    people_isFetching: state.people.people_isFetching,
    filmography: state.people.filmography,
    filmography_isFetching: state.people.filmography_isFetching,
})


MovieCasts = compose(connect(mapStateToProps, {
    getPeople
}), withRouter)(MovieCasts);

export default MovieCasts;