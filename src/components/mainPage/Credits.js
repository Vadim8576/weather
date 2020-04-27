import React from 'react';
import { NavLink } from 'react-router-dom';
import MapToCredits from './MapToCredits';


const Credits = ({ data, type, id }) => {


    const count = 6;
    let config = {};

    const credit_type = type.join(' ');

    if (credit_type === 'movie cast') {
        config = {
            title: 'Актеры',
            text: {
                name: 'name',
                job: 'character'
            },
            img: {
                property: 'profile_path',
                no_photo: '/img/no_photo.jpg',
                path: 'https://image.tmdb.org/t/p/w138_and_h175_face'
            },
            target: '/people/',
            link: '/casts/',
            class: 'credits_list'
        }
    }

    if (credit_type === 'movie crew') {
        config = {
            title: 'Съемочная группа',
            text: {
                name: 'name',
                job: 'job'
            },
            img: {
                property: 'profile_path',
                no_photo: '/img/no_photo.jpg',
                path: 'https://image.tmdb.org/t/p/w138_and_h175_face'
            },
            target: '/people/',
            link: '/crew/',
            class: 'credits_list'
        }
    }

    if (credit_type === 'people cast') {
        config = {
            title: 'Фильмография',
            text: {
                name: 'title',
                job: 'character'
            },
            img: {
                property: 'poster_path',
                no_photo: '/img/no_poster.jpg',
                path: 'https://image.tmdb.org/t/p/w500'
            },
            target: '/movie_details/',
            link: '/people_filmography/',
            class: 'credits_list'
        }
    }




    if (credit_type === 'people crew') {
        config = {
            title: 'Принимал(а) участие',
            text: {
                name: 'title',
                job: 'job'
            },
            img: {
                property: 'poster_path',
                no_photo: '/img/no_poster.jpg',
                path: 'https://image.tmdb.org/t/p/w500'
            },
            target: '/movie_details/',
            link: '/people_crew/',
            class: 'credits_list'
        }
    }



    return (
        <>
            <div className='credits_tittle bg-primary'>
                <span className='text-white'>{config.title}:</span>
            </div>
            <div className={`${type[1]} border`}>
                {data && data.map((item, index) => {
                    if (index < count) {
                        return (
                            <MapToCredits key={item.credit_id} item={item} config={config} />
                        )
                    } else { return null }

                })}
                <div className={config.class}>
                    <NavLink to={config.link+id} className='link'>
                        Еще...
                    </NavLink>
                </div>
            </div>
        </>
    )
}



export default Credits;