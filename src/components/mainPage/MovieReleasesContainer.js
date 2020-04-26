import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getReleases, getDetails } from './../../redux/movie_reducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Spinner, Table } from 'react-bootstrap';
import mySetDate from '../../common/mySetDate';




let MovieReleasesContainer = ({ releases, releases_isFetching, getReleases, getDetails, movie_details, ...props }) => {

    useEffect(() => {
        const movie_id = props.match.params.movie_id;
        getReleases(movie_id);
        getDetails(movie_id);
    }, [])

    return (
        <div className='releases'>
            <h3>{movie_details.title}</h3>
            <hr/>
            <h5>Даты выхода:</h5>
            {releases
                ? <MyTable releases={releases} />
                : <Spinner animation='border' />}
        </div>
    )
}




const MyTable = ({ releases }) => {
    return <>
        {releases.map(i =>
            <div key={i.iso_3166_1}>
                <b>{i.iso_3166_1}</b>
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
    movie_details: state.movies.movie_details
})


export default MovieReleasesContainer = compose(connect(mapStateToProps, {
    getReleases,
    getDetails
}), withRouter)(MovieReleasesContainer);