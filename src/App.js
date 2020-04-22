import React, { useEffect } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import Examples from './examples-from-bootstrap';
import { connect } from 'react-redux';
import HeaderContainer from './components/header/HeaderContainer';
import MainPageContainer from './components/mainPage/MainPageContainer';
import Login from './components/login/Login';
import { getAuth } from './redux/reducer';
import { Container, Row, Col } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './components/mainPage/prifilePage/ProfilePageContainer';

function App({ fetchWeather, ...props }) {



  return (
    <>
      <HeaderContainer />
      <Container>
        <Row className="justify-content-md-center">
          <Col>
            <div className="App">

              <Switch>
                <Route exact path='/' render={() => <Redirect to={'/main'} />} />
                <Route exact path='/login' render={() =>
                  <Login
                    getAuth={props.getAuth}
                    request_token={props.request_token}
                  />}
                />
                <Route exact path='/main' render={() =>
                  <MainPageContainer />}
                />
                <Route exact path='/profile' render={() =>
                  <Profile />}
                />
                <Route path='/*' render={() => <Redirect to={'/main'} />} />
              </Switch>


              {/* <Examples /> */}
            </div>
          </Col>

        </Row>

      </Container>
    </>
  );
}


const getStateToProps = (state) => (
  {
    request_token: state.auth.request_token
  }
)





// export default App;

export default App = connect(getStateToProps, {
  getAuth
})(App);
