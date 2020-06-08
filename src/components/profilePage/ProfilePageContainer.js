import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDetails } from './../../redux/account_reducer';
import { Tab, Tabs } from 'react-bootstrap';

// временно
import { authentication } from './../../redux/auth_reducer';
import List from '../mainPage/List';



const ProfilePageContainer = ({ authentication, rated_movies, getDetails, account_id, user_name, session_id }) => {

    console.log(rated_movies);
    // console.log(account_id, user_name);

    const [key, setKey] = useState('profile');

    useEffect(() => {
        authentication();
    }, []);

    useEffect(() => {
        if (session_id) getDetails(session_id);
    }, [session_id]);




    // useEffect(() => {
    //     console.log(key);
    //     if (key == 'my_rating' && session_id) getDetails(session_id);
    // }, [key]);
    


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
                <Tab eventKey='my_rating' title={`Мой рейтинг (${rated_movies.length})`}>
                    <List id={null} data={rated_movies} type={{ context: 'people cast', view: 'vertical' }} />
                </Tab>
            </Tabs>

        </div>
    )
}


const mapStateToProps = state => ({
    account_id: state.account.account_id,
    user_name: state.account.user_name,
    rated_movies: state.account.rated_movies,
    session_id: state.auth.session_id
})


export default connect(mapStateToProps, {
    getDetails,
    authentication
})(ProfilePageContainer);
