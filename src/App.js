import React, { useEffect } from 'react';
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Examples from './examples-from-bootstrap';
import {fetchWeather} from './redux/reducer';
import { connect } from 'react-redux';

function App({fetchWeather}) {

useEffect(() => {
  fetchWeather();
}, [])


// new


  return (
    <div className="App">
      {/* <Examples /> */}


      <InputGroup className="mb-3">
        <FormControl
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={() => fetchWeather()}>Find</Button>
        </InputGroup.Append>
      </InputGroup>



    </div>
  );
}


const getStateToProps = (state) => (
  {
    weather: state.weather.weather
  }
)





export default App = connect(getStateToProps, {
  fetchWeather
})(App);
