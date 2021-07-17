import React, { useState } from 'react';

import { Button, Form } from 'react-bootstrap';
import { userCategory } from '../../common/common';
import RenderInput from '../../common/formFields/RenderInput';
import RenderSelect from '../../common/formFields/RenderSelect';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import dummyLoginData from '../../dummyData/logindata.json';

import './LoginScreenStyles.scss';
import { setLocalStorageData } from '../../common/LocalStorageActions';

const LoginScreen = (props) => {
  const [loginFormValues, setLoginFormValues] = useState({
    username: '',
    email: '',
    password: '',
    category: ''
  });

  const onChange = (e) => {
    setLoginFormValues({
      ...loginFormValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('loginFormValues', loginFormValues);
    const isValidate = ValidateLogin(loginFormValues);
    if (isValidate) {
      console.log('isValidate', isValidate);
      const userData = {
        isloggedIn: true,
        username: loginFormValues.username,
        email: loginFormValues.email,
        category: loginFormValues.category
      };
      setLocalStorageData('isLoggedIn', userData);
      props.setLoggedInDetails(userData);
      setLoginFormValues({
        username: '',
        email: '',
        password: '',
        category: ''
      });
      props.history.push('/dashboard');
    }
  };

  const ValidateLogin = (data) => {
    for (const key in dummyLoginData.users) {
      if (Object.hasOwnProperty.call(dummyLoginData.users, key)) {
        const currObj = dummyLoginData.users[key];
        console.log(currObj);
        if (currObj.username === data.username &&
          currObj.email === data.email &&
          currObj.password === data.password &&
           currObj.category === data.category) {
          return true;
        }
      }
    }
    alert('login Failed');
    return false;
  };

  return (
        <div className="login-wrapper">
           <div className="card-gm login-block">
              <p className="card-title">Login here!</p>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <Form onSubmit={handleSubmit}>
                      <RenderInput
                        type="text"
                        name="username"
                        label="Username"
                        values={loginFormValues}
                        onChange={onChange}
                      />
                      <RenderInput
                        type="email"
                        name="email"
                        label="Email"
                        values={loginFormValues}
                        onChange={onChange}
                      />
                      <RenderInput
                        type="password"
                        name="password"
                        label="Password"
                        values={loginFormValues}
                        onChange={onChange}
                      />
                      <RenderSelect
                        type="select"
                        name="category"
                        label="Login As"
                        options={userCategory}
                        values={loginFormValues}
                        onChange={onChange}
                      />
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
          </div>
        </div>
  );
};

LoginScreen.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  setLoggedInDetails: PropTypes.func
};

export default withRouter(LoginScreen);
