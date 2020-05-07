import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { searchMulti } from './../../redux/search_reducer'
import { withRouter } from "react-router-dom";
import List from "./List";
import { Spinner } from "react-bootstrap";
import PaginationButtons from './../pagination/PaginationButtons';
import { setCurrentPage } from './../../redux/pagination_reducer';


const Search = ({ searchMulti, found_movies, found_person, found_tv, isFetching, ...props }) => {

    console.log('found_person=', found_person);


    useEffect(() => {
        const s_query = props.match.params.s_query;
        console.log(s_query);
        searchMulti(s_query, props.current_page);
    }, [props.match.params.s_query, props.current_page]);




    return (
        <>
            <PaginationButtons {...props} />
            <p>Результаты поиска:</p>
            {!isFetching
                ? <Spinner animation='border' />
                : <>
                    <List id={null} data={found_movies} type={{ context: 'people cast', view: 'horizontal' }} />
                    <List id={null} data={found_person} type={{ context: 'movie cast', view: 'horizontal' }} />
                    <List id={null} data={found_tv} type={{ context: 'people cast', view: 'horizontal' }} />
                </>
            }
            <PaginationButtons {...props} />
        </>
    )
}



const mapStateToProps = (state) => ({
    found_movies: state.found_movies.found_movies,
    found_person: state.found_movies.found_person,
    found_tv: state.found_movies.found_tv,
    isFetching: state.found_movies.isFetching,
    current_page: state.pagination.current_page,
    total_pages: state.pagination.total_pages,
    total_results: state.pagination.total_results
});




const SearchContainer = compose(connect(mapStateToProps,
    { searchMulti, setCurrentPage }), withRouter)(Search);


export default SearchContainer;