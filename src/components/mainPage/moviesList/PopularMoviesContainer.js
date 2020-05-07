import React, { useEffect } from 'react';
import './../../../styles/popular_movies.css';
import { Spinner } from 'react-bootstrap';
import PaginationButtons from '../../pagination/PaginationButtons';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres } from '../../../redux/genres_reducer';
import { getDiscoverMovies, setRequestData, setRequestDataGenreIds, discoverMoviesIsFetching } from '../../../redux/discover_reducer';
import { setCurrentPage } from '../../../redux/pagination_reducer';
import FilterPanel from './FilterPanel';
import MoviesList from './MoviesList';



const PopularMovies = ({ discover_movies,
    getDiscoverMovies,
    discover_movies_is_fetching,
    popular_movies, popular_movies_isFetching,
    getGenres,
    genres,
    setRequestData,
    request,
    setRequestDataGenreIds,
    discoverMoviesIsFetching,
    ...props }) => {


    useEffect(() => {
       
        getDiscoverMovies(request, props.current_page);
      }, [props.current_page, request.release_date_gte]);

    useEffect(() => {
        getGenres();

        setRequestData(
            {
                sort_by: 'popularity.desc',
                release_date_gte: '',
                release_date_lte: '',
                btn_is_visible: false
            }
        );
        setRequestDataGenreIds(null, false);
    }, []);


    return (
        <>
            <div className='tittle'>
                <h5>Популярные фильмы на <a href='https://www.themoviedb.org' target='_blank'> TMDb</a>:</h5>
            </div>
            <div className='sides_wrapper'>

                <FilterPanel
                    request={request}
                    setRequestData={setRequestData}
                    genres={genres}
                    setRequestDataGenreIds={setRequestDataGenreIds}
                    getDiscoverMovies={getDiscoverMovies}
                />


                <MoviesList
                    discover_movies_is_fetching={discover_movies_is_fetching}
                    list={discover_movies}
                    {...props}
                />
            </div>
        </>
    )
}



const mapStateToProps = state => ({
    genres: state.genres.genres,
    request: state.discover.request,
    discover_movies_is_fetching: state.discover.discover_movies_is_fetching,
    discover_movies: state.discover.discover_movies,
    current_page: state. pagination.current_page,
    total_pages: state.pagination.total_pages,
    total_results: state.pagination.total_results
})





export default connect(mapStateToProps,
    {
        getGenres,
        setCurrentPage,
        setRequestData,
        setRequestDataGenreIds,
        getDiscoverMovies,
        discoverMoviesIsFetching,
    })(PopularMovies);