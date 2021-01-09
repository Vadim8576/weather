import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPersonList } from './../../redux/people_reducer';
import { Spinner } from 'react-bootstrap';
import { setCurrentPage } from '../../redux/pagination_reducer';
import PaginationButtons from '../pagination/PaginationButtons';
import './../../styles/person_list.css';
import { NavLink } from 'react-router-dom';

const PersonContainer = ({ person_list, person_isFetching, getPersonList, ...props }) => {


    // useEffect(() => {
    //     getPersonList(1);
    // }, []);

    useEffect(() => {

        getPersonList(props.current_page);
    }, [props.current_page]);
//
    return (
        <>
            <h3>Популярные люди</h3>

            <PaginationButtons {...props} />
            <hr />
            <div className='person_container'>
                {person_isFetching
                    ? person_list.map(person => {
                        return (

                            <NavLink to={'/people/' + person.id} className='link' key={person.id}>
                                <div className='person_card border'>
                                    <img src={
                                        person.profile_path
                                            ? `https://image.tmdb.org/t/p/w235_and_h235_face${person.profile_path}`
                                            : '/img/no_photo.jpg'
                                    } alt={person.name} />
                                    <div className='name'>{person.name}</div>
                                </div>
                            </NavLink>
                        )
                    })
                    : <Spinner animation='border' />
                }
            </div>
            <hr />
            <PaginationButtons {...props} />
        </>
    )
}

const mapStateToProps = (state) => ({
    person_list: state.people.person_list,
    person_isFetching: state.people.person_isFetching,
    current_page: state.pagination.current_page,
    total_pages: state.pagination.total_pages,
    total_results: state.pagination.total_results
})


export default connect(mapStateToProps,
    {
        getPersonList,
        setCurrentPage
    })(PersonContainer);