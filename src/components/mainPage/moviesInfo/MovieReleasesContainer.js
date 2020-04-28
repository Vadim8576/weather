import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getReleases, getDetails } from '../../../redux/movie_reducer';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Spinner, Table } from 'react-bootstrap';
import mySetDate from '../../../common/mySetDate';
import './../../../styles/page_with_full_list.css';




let MovieReleasesContainer = ({ releases, releases_isFetching, getReleases, getDetails, movie_info, ...props }) => {

    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getReleases(movie_id);
        getDetails(movie_id);
    }, [])

    return (
        <>
            <div className='realeases_header border'>
                <div className='realeases_poster'>
                    <NavLink to={`/movie_info/${props.match.params.movie_id}`} className='link'>
                        <img src={movie_info.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${movie_info.poster_path}` : '/img/no_poster.jpg'} alt='постер' />
                        Вернуться
                    </NavLink>
                </div>
                <div className='realeases_text'>
                    <h4>{movie_info.title}</h4>
                </div>
                <br />

            </div>


            <h5>Даты релизов:</h5>
            <br />
            {releases
                ? <MyTable releases={releases} />
                : <Spinner animation='border' />}
        </>
    )
}




const MyTable = ({ releases }) => {
    return <>
        {releases.map(i =>
            <div key={i.iso_3166_1}>
                <div className="list-group-item active">
                    {i.iso_3166_1}
                </div>

                <Table bordered>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Рейтинг</th>
                            <th>Тип</th>
                            <th>Примечание</th>
                        </tr>
                    </thead>
                    <tbody>

                        {i.release_dates.map((i, index) =>
                            <tr key={index}>
                                <td>{mySetDate(i.release_date)}</td>
                                <td>{i.certification}</td>
                                <td>{i.type}</td>
                                <td>{i.note}</td>
                            </tr>

                        )
                        }



                    </tbody>
                </Table>
                <br />
            </div>)
        }

    </>
}


const mapStateToProps = (state) => ({
    releases: state.movies.releases,
    releases_isFetching: state.movies.releases_isFetching,
    movie_info: state.movies.movie_info
})


export default MovieReleasesContainer = compose(connect(mapStateToProps, {
    getReleases,
    getDetails
}), withRouter)(MovieReleasesContainer);