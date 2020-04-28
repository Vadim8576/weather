import React, { useState } from 'react';
import mySetDate from '../../../common/mySetDate';
import PhotoModal from './PhotoModal';
import './../../../styles/info_pages.css';


const PeopleHeader = ({ people, getImages, people_image, images_isFetching }) => {


    const [show, setShow] = useState(false);

    const birthday = people.birthday ? mySetDate(people.birthday) : 'нет данных';
    const deathday = people.deathday ? mySetDate(people.deathday) : '';

    return (
        <div className='details_header border'>
            <PhotoModal
                people_image={people_image}
                show={show}
                setShow={setShow}
                name={people.name}
                images_isFetching={images_isFetching}
            />
            <div className='poster' onClick={() => {
                getImages(people.id);
                setShow(true);
            }}>
                <img src={people.profile_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${people.profile_path}` : '/img/no_photo.jpg'} alt='постер' />
                <div className='loupe'>
                    {/* лупа */}
                    {/* &#128269; */}
                </div>
            </div>

            <div className='text'>
                <h4>{people.name ? people.name : 'Данные отсутствуют'}</h4>
                <hr />
                <p>Дата рождения: {birthday}</p>
                {deathday && <p> Дата смерти: {deathday}</p>}
                <p>Место рождения: {people.place_of_birth ? people.place_of_birth : 'нет данных'}</p>
                <p>Так же известен(на), как: {people.also_known_as.map(i => i + ', ') || 'нет данных'}</p>

                <p>Домашняя страница: {people.homepage ? people.homepage : 'нет данных'}</p>
                {people.biography
                    ? <>
                        <details>
                            <summary>Биография:</summary>
                            <p>{people.biography}</p>
                        </details>
                    </>
                    : 'нет данных о биографии'}

            </div>
        </div>
    )
}


export default PeopleHeader;