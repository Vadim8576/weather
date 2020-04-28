import React, { useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { searchMovies } from './../../redux/search_reducer'
import { withRouter } from "react-router-dom";
import List from "./List";
import { Spinner } from "react-bootstrap";


const Search = ({ searchMovies, found_movies, isFetching, ...props }) => {

    console.log('found_movies=', found_movies);

    useEffect(() => {
        const s_query = props.match.params.s_query;
        console.log(s_query);
        searchMovies(s_query);
    }, [props.match.params.s_query]);


    return (
        <>
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
    isFetching: state.found_movies.isFetching
});




const SearchContainer = compose(connect(mapStateToProps,
    { searchMovies }), withRouter)(Search);


export default SearchContainer;