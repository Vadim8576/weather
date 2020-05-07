import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { searchMovies } from './../../redux/search_reducer'
import { withRouter } from "react-router-dom";
import List from "./List";
import { Spinner } from "react-bootstrap";
import PaginationButtons from './../pagination/PaginationButtons';
import { setCurrentPage } from './../../redux/pagination_reducer';


const Search = ({ searchMovies, found_movies, isFetching, ...props }) => {

    console.log('found_movies=', found_movies);

    useEffect(() => {
        const s_query = props.match.params.s_query;
        console.log(s_query);
        searchMovies(s_query, props.current_page);
    }, [props.match.params.s_query, props.current_page]);

    


    return (
        <>
            <PaginationButtons {...props} />
            <p>Результаты поиска:</p>
            {!isFetching
                ? <Spinner animation='border' />
                : <List id={null} data={found_movies} type={{ context: 'people cast', view: 'vertical' }} />
            }

        </>
    )
}



const mapStateToProps = (state) => ({
    found_movies: state.found_movies.found_movies,
    isFetching: state.found_movies.isFetching,
    current_page: state. pagination.current_page,
    total_pages: state.pagination.total_pages,
    total_results: state.pagination.total_results
});




const SearchContainer = compose(connect(mapStateToProps,
    { searchMovies, setCurrentPage }), withRouter)(Search);


export default SearchContainer;