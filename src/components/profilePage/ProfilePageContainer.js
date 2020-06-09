import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, Spinner, Badge } from 'react-bootstrap';


// временно
import { authentication } from './../../redux/auth_reducer';
// import List from '../mainPage/List';


import './../../styles/profile_page.css';
import { NavLink } from 'react-router-dom';
import { getDetails, getRatedMovies } from './../../redux/account_reducer';
import { rateMovie, rateMovieDelete, getAccountStates } from './../../redux/movie_reducer';
import RateStars from '../mainPage/moviesList/rateStars';



const ProfilePageContainer = ({
    authentication,
    rated_movies,
    getDetails,
    getRatedMovies,
    account_id,
    user_name,
    session_id,
    rateMovie,
    rateMovieDelete,
    isAuth,
    your_rate,
    getAccountStates
}) => {


    const [key, setKey] = useState('profile');
    // const [key, setKey] = useState('my_rating');

    const [rateVisibleId, setRateVisibleId] = useState(null);

    useEffect(() => {
        authentication();
    }, []);

    useEffect(() => {
        if (session_id) getDetails(session_id);
        if (!rateVisibleId) setRateVisibleId(null);
    }, [session_id]);


    useEffect(() => {
        if (session_id && account_id) {
            let timer_id = setTimeout(getRating, 500);
        }
    }, [session_id, account_id, your_rate]);



    const getRating = () => {
        getRatedMovies({ session_id, account_id });
    }

    const setRateMovie = ({ id, rate }) => {
        if (isAuth) rateMovie({ id, session_id, rate });
    }


    const rateMovieRemove = ({ id }) => {
        rateMovieDelete({ id, session_id });
    }

    const accountStates = ({ id, session_id }) => {
        if (isAuth) getAccountStates({ id, session_id });
    }


    return (
        <div>
            <Tabs
                id='controlled-tab-example'
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey='profile' title='Профиль'>

                    Привет, {user_name}. Твой id={account_id}
                </Tab>
                <Tab eventKey='my_rating' title={`Мои рейтинг (${rated_movies.length})`}>
                    {rated_movies
                        ? rated_movies.map(rated_movie => {
                            return (
                                <div className='profile_rate_card border' key={rated_movie.id}>

                                    <NavLink to={'/movie-info/' + rated_movie.id} className='link'>
                                        <div className='profile_rate_poster'>
                                            <img src={
                                                rated_movie.poster_path
                                                    ? `https://image.tmdb.org/t/p/w500${rated_movie.poster_path}`
                                                    : '/img/no_poster.jpg'
                                            } alt={rated_movie.title} />
                                            {/* <div className='name'>{person.name}</div> */}
                                        </div>
                                    </NavLink>

                                    <div className='profile_rate_context'>
                                        <p>{rated_movie.title}</p>
                                        <p onClick={() => {
                                            if (!rateVisibleId) {
                                                const id = rated_movie.id;
                                                accountStates({ id, session_id });
                                                setRateVisibleId(rated_movie.id);
                                            } else {
                                                setRateVisibleId(null);
                                            }
                                        }} className='you_rating_p'>
                                            Ваш рейтинг: {rated_movie.rating}
                                        </p>
                                        <p><Badge variant="info">{rated_movie.vote_average ? rated_movie.vote_average : '0'}</Badge></p>
                                    </div>

                                    <div className={`rate_drop_down border ${rateVisibleId === rated_movie.id ? 'visible' : ''}`}>
                                        {isAuth
                                            ? <>
                                                <RateStars
                                                    id={rated_movie.id}
                                                    rateMovie={setRateMovie}
                                                    your_rate={your_rate}
                                                    setRateVisibleId={setRateVisibleId}
                                                    rateMovieRemove={rateMovieRemove}
                                                />
                                            </>
                                            : <>
                                                <p>Хотите оценить?</p>
                                                <NavLink to='login' className='navbar-brand'>Войти</NavLink>
                                            </>
                                        }
                                    </div>
                                </div>
                            )
                        })
                        : <Spinner animation='border' />
                    }
                </Tab>
                <Tab eventKey='favorite' title='Избранное'>

                    <h3>Здесь будут избранные фильмы</h3>
                </Tab>
            </Tabs>

        </div>
    )
}


const mapStateToProps = state => ({
    account_id: state.account.account_id,
    user_name: state.account.user_name,
    rated_movies: state.account.rated_movies,
    session_id: state.auth.session_id,
    isAuth: state.auth.isAuth,
    your_rate: state.movies.your_rate,
    session_id: state.auth.session_id
})


export default connect(mapStateToProps, {
    getDetails,
    getRatedMovies,
    authentication,
    rateMovieDelete,
    rateMovie,
    getAccountStates
})(ProfilePageContainer);
