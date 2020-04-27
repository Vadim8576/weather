import React from 'react';
import { NavLink } from 'react-router-dom';



const MapToCredits = ({ item, config }) => {


    // const config = {
    //     title: 'Актеры',
    //     text: {
    //         name: 'name',
    //         job: 'character'
    //     },
    //     img: {
    //         property: 'profile_path',
    //         no_photo: '/img/no_photo.jpg',
    //         path: 'https://image.tmdb.org/t/p/w138_and_h175_face'
    //     },
    //     target: '/people/',
    //     link: '/casts/'
    // }

    return (
        <div className={config.class+' border'}>
            <div className='photo'>
                <NavLink to={config.target + item.id} className='link'>
                    <img className={config.class+'_photo border'} src=
                        {item[config.img.property] ? config.img.path + item[config.img.property] : config.img.no_photo}
                        alt='профайл' />
                </NavLink>
            </div>
            <div>
                <div>
                    <NavLink to={config.target + item.id} className='link'>
                        {item[config.text.name]}
                    </NavLink>
                </div>
                <div><i>{item[config.text.job]}</i></div>
            </div>
        </div>
    )
}



export default MapToCredits;