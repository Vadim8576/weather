import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getDetails } from './../../redux/account_reducer';


// временно
import { authentication } from './../../redux/auth_reducer';
import List from '../mainPage/List';



const ProfilePageContainer = ( {authentication, rated_movies, getDetails, account_id, user_name, session_id} ) => {

    console.log(rated_movies);
    // console.log(account_id, user_name);

    useEffect(() => {
        authentication();
    }, []);

    useEffect(() => {
        getDetails(session_id);
    }, [session_id]);



    return (
        <div>
            Привет, {user_name}. Твой id={account_id}
            <h4>Мои рейтинги:</h4>
            <List id={null} data={rated_movies} type={{context: 'people cast', view: 'vertical'}} />
        </div>
    )
}


const mapStateToProps = state => ({
    account_id: state.account.account_id,
    user_name: state.account.user_name,
    rated_movies: state.account.rated_movies,
    session_id: state.auth.session_id,
})


export default connect(mapStateToProps, {
    getDetails,
    authentication
})(ProfilePageContainer);
