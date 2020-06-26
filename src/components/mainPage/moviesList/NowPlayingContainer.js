import React, { useEffect } from 'react';
import './../../../styles/popular_movies.css';
import { connect } from 'react-redux';
import { getGenres } from '../../../redux/genres_reducer';
import { getDiscoverMovies, setRequestData, setRequestDataGenreIds, discoverMoviesIsFetching } from '../../../redux/discover_reducer';
import { setCurrentPage } from '../../../redux/pagination_reducer';
import { rateMovie, getAccountStates, rateMovieDelete } from '../../../redux/movie_reducer';
import FilterPanel from './FilterPanel';
import MoviesList from './MoviesList';
import mySetDate from '../../../common/mySetDate';
import mySelectDate from '../../../common/mySelectDate';
import PaginationButtons from './../../pagination/PaginationButtons';






const NowPlayingContainer = (
    {
        discover_movies,
        getDiscoverMovies,
        discover_movies_is_fetching,
        popular_movies,
        popular_movies_isFetching,
        getGenres,
        genres,
        setRequestData,
        request,
        setRequestDataGenreIds,
        discoverMoviesIsFetching,
        isAuth,
        rateMovie,
        session_id,
        getAccountStates,
        your_rate,
        rateMovieDelete,
        getDetails,
        authentication,
        ...props
    }) => {




    useEffect(() => {
        getDiscoverMovies(request, props.current_page);
    }, [props.current_page, request.release_date_gte]);



    useEffect(() => {
        getGenres();
        setRequestData(
            {
                sort_by: 'popularity.desc',
                release_date_gte: mySetDate(mySelectDate(-1, 'month'), 'fr-CA'),
                release_date_lte: mySetDate(mySelectDate(6, 'day'), 'fr-CA'),
                btn_is_visible: false
            }
        );
        setRequestDataGenreIds(null, false);
    }, []);




    const setRateMovie = ({ id, session_id, rate }) => {
        if (isAuth) rateMovie({ id, session_id, rate });
    }

    const accountStates = ({ id, session_id }) => {
        if (isAuth) getAccountStates({ id, session_id });
    }


    return (
        <>
            <div className='tittle'>
                <h5>Фильмы, которые смотрят сейчас на <a href='https://www.themoviedb.org' target='_blank'> TMDb</a>:</h5>
            </div>
            <div className='sides_wrapper'>
                <div className='left_side'>
                    <FilterPanel
                        request={request}
                        setRequestData={setRequestData}
                        genres={genres}
                        setRequestDataGenreIds={setRequestDataGenreIds}
                        getDiscoverMovies={getDiscoverMovies}
                        {...props}
                    />
                </div>
                <div className='right_side border'>
                    <PaginationButtons {...props} />
                    <hr />
                    <MoviesList
                        discover_movies_is_fetching={discover_movies_is_fetching}
                        data={discover_movies}
                        isAuth={isAuth}
                        setRateMovie={setRateMovie}
                        session_id={session_id}
                        accountStates={accountStates}
                        your_rate={your_rate}
                        rateMovieDelete={rateMovieDelete}
                        {...props}
                    />
                    <hr />
                    <PaginationButtons {...props} />
                </div>
            </div>
        </>
    )
}



const mapStateToProps = state => ({
    genres: state.genres.genres,
    request: state.discover.request,
    discover_movies_is_fetching: state.discover.discover_movies_is_fetching,
    discover_movies: state.discover.discover_movies,
    current_page: state.pagination.current_page,
    total_pages: state.pagination.total_pages,
    total_results: state.pagination.total_results,
    isAuth: state.auth.isAuth,
    session_id: state.auth.session_id,
    your_rate: state.movies.your_rate
})





export default connect(mapStateToProps,
    {
        getGenres,
        setCurrentPage,
        setRequestData,
        setRequestDataGenreIds,
        getDiscoverMovies,
        discoverMoviesIsFetching,
        rateMovie,
        getAccountStates,
        rateMovieDelete 
    })(NowPlayingContainer);