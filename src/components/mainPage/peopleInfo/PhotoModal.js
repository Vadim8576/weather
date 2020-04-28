import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import './../../../styles/photos_modal.css'



const PhotoModal = ({ people_image, show, setShow, name, images_isFetching }) => {

    const [current_photo, setCurrentPhoto] = useState(0);

    const selectCurrentPhoto = (value) => {
        let new_current = current_photo + value;
        if (new_current > people_image.length - 1) new_current = 0;
        if (new_current < 0) new_current = people_image.length - 1;
        setCurrentPhoto(new_current);
    }

    return (
        <Modal
            people_image={people_image}
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="people-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title id="people-custom-modal-styling-title">
                    {name ? name : 'Фотографии'}
                        &nbsp;
                        {people_image.length > 0 && <>({current_photo + 1 + ' из '}{people_image.length})</>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {images_isFetching ?
                    <div className='people_photos_container'>

                        {people_image.length > 0 &&
                            <>
                                <div className='arrow' onClick={() => selectCurrentPhoto(-1)}>&#60;</div>
                                <div className='people_photos'>
                                    {people_image.map((i, index) => {
                                        if (index === current_photo) {
                                            return (
                                                
                                                <img key={index} src={`https://image.tmdb.org/t/p/w500${i.file_path}`} alt='Фото' />

                                            )
                                        }
                                    })}
                                </div>
                                <div className='arrow' onClick={() => selectCurrentPhoto(1)}>&#62;</div>
                            </>
                        }
                        {people_image.length <= 0 &&
                            <img src='/img/no_photo.jpg' alt='Фото' />
                        }
                    </div>
                    // || <img src='/img/no_photo.jpg' alt='Фото' />
                    : <Spinner animation='border' />
                }

            </Modal.Body>
        </Modal>
    )
}



export default PhotoModal;