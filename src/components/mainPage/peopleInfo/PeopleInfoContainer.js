import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPeople, getImages } from '../../../redux/people_reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Spinner } from 'react-bootstrap';
import PeopleHeader from './PeopleInfoHeader';
import List from './../List';






const People = ({ getPeople, people_isFetching, people, filmography, filmography_isFetching, getImages, images_isFetching, people_image, ...props }) => {


     console.log('people_image', people_image);


    useEffect(() => {
        const people_id = props.match.params.people_id;
        getPeople(people_id);
    }, [])

    



    return (
        <>
            {!people_isFetching && <Spinner animation='border' />}      

            
                {people_isFetching &&
                   <PeopleHeader
                   people={people}
                   getImages={getImages}
                   people_image={people_image}
                   images_isFetching={images_isFetching}
                   />
                }
                


                <List id={props.match.params.people_id} data={filmography.cast} type={{context: 'people cast', view: 'horizontal'}} />
                <List id={props.match.params.people_id} data={filmography.crew} type={{context: 'people crew', view: 'horizontal'}} />
            

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