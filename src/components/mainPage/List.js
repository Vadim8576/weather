import React from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/list.css';
import mySetDate from '../../common/mySetDate';


const List = ({ data, type, id }) => {


    let count = 6;
    const len = data ? data.length : 'нет данных';
    let config = {};

    if (type.context === 'movie cast') {
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
            more_link: '/casts/',
            type: type.view // вид списка (горизонтальный, вертикальный...)
        }
    }

    if (type.context === 'movie crew') {
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
            more_link: '/crew/',
            type: type.view
        }
    }

    if (type.context === 'people cast') {
        config = {
            title: 'Фильмы',
            text: {
                name: 'title',
                job: 'character'
            },
            img: {
                property: 'poster_path',
                no_photo: '/img/no_poster.jpg',
                path: 'https://image.tmdb.org/t/p/w500'
            },
            target: '/movie-info/',
            more_link: '/people-filmography/',
            type: type.view
        }
    }




    if (type.context === 'people crew') {
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
            target: '/movie-info/',
            more_link: '/people-crew/',
            type: type.view
        }
    }



    return (
        <>  {len > 0 &&
            <>
            <div className='credits_tittle bg-primary'>
                <span className='text-white'>{config.title}:</span>
            </div>
            <div className={config.type + '_list_wrap border'}>
                {data && data.map((item, index) => {
                    if (!id) count = len;
                    if (index < count) {
                        return (

                            <div key={index} className={config.type + '_list' + ' border'}>
                                <div className={config.type + '_photo'}>
                                    <NavLink to={config.target + item.id} className='link'>
                                        <img className='border' src=
                                            {item[config.img.property] ? config.img.path + item[config.img.property] : config.img.no_photo}
                                            alt='профайл' />
                                    </NavLink>
                                </div>
                                <div className='list_text'>
                                    <div>
                                        <NavLink to={config.target + item.id} className='link'>
                                            {item[config.text.name] && item[config.text.name]}
                                        </NavLink>
                                    </div>
                                    <div><i>{item[config.text.job] && item[config.text.job]}</i></div>
                                    {type.context === 'people cast' || type.context === 'people crew'
                                        ? <div><i>{mySetDate(item.release_date)}</i></div>
                                        : ''
                                    }

                                </div>
                            </div>
                        )
                    } else { return null }

                })}
                {(data && data.length > count) // Если id передан, покажем кнопку ЕЩЕ, если нет - это полный список
                    ? id &&
                    <div className={config.type + '_list border'}>
                        <NavLink to={config.more_link + id} className='link'>
                            Еще...
                    </NavLink>
                    </div>
                    : ''
                }
                {data && data.length === 0 && 'Нет данных'}

            </div>
            </>
            }
        </>
    )
}



export default List;