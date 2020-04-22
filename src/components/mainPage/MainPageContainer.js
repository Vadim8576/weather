import React, { useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import {getToken} from '../../redux/reducer';



const MainPage = () => {

    useEffect(() => {
        // getToken();
      }, [])

    return (
        <div className='mainPage'>
            Main page
            {/* <InputGroup className="mb-3">
                <FormControl
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={() => getToken()}>Find</Button>
                </InputGroup.Append>
            </InputGroup> */}

        </div>
    )
}

const getStateToProps = (state) => (
    {
        request_token: state.auth.request_token
    }
  )
  

const MainPageContainer = connect(getStateToProps, null)(MainPage);

  export default MainPageContainer;