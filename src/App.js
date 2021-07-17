import React, { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import DashboardScreen from './components/dashboard/DashboardScreen';
import LoginScreen from './components/login/LoginScreen';
import Footer from './components/footer/Footer';
import ManageGroups from './components/dashboard/manageGroups/ManageGroups';
import ManageUsers from './components/dashboard/manageUsers/ManageUsers';
import Header from './components/header/Header';

import { userAuthContext } from './common/usecontexts/userAuthContext';

import './styles/scss/main.scss';
import { deleteLocalStorageData, getLocalStorageData } from './common/LocalStorageActions';

const App = (props) => {
  const [mainTheme, setMainTheme] = useState('theme-dark');
  const [authencationDetails, setAuthencationDetails] = useState({
    isloggedIn: false,
    username: '',
    category: ''
  });

  const userLocalData = getLocalStorageData('isLoggedIn');
  console.log('userLocalData', userLocalData);

  const setAppTheme = (e) => {
    console.log(e.target.checked);
    setMainTheme(e.target.checked ? 'theme-dark' : 'theme-light');
    return true;
  };

  const setLoggedInDetails = (data) => {
    setAuthencationDetails(data);
    console.log(data, 'data');
  };
  const onLogout = () => {
    deleteLocalStorageData('isLoggedIn');
    setAuthencationDetails({
      isloggedIn: false,
      username: ''
    });
  };

  useEffect(() => {
    if (userLocalData) {
      setAuthencationDetails(userLocalData);
    }
  }, []);

  return (
    <Router>
      <div className={mainTheme}>
        <div className="wrapper">
          <userAuthContext.Provider value={{ authencationDetails, setAuthencationDetails }}>
          <Header setAppTheme={setAppTheme} authencationDetails={authencationDetails} onLogout={onLogout}/>
          <main className="app-container">
          {
            <Switch>
              <Route path="/dashboard/groups">
                <ManageGroups mainTheme={mainTheme}/>
              </Route>
              <Route path="/dashboard/users">
                <ManageUsers mainTheme={mainTheme}/>
              </Route>
              <Route exact path="/dashboard">
                <DashboardScreen mainTheme={mainTheme}/>
              </Route>
              <Route exact path="/Login">
              <LoginScreen setLoggedInDetails={setLoggedInDetails}/>
              </Route>
            </Switch>
          }
          </main>
          <Footer/>
          </userAuthContext.Provider>
        </div>
      </div>
    </Router>
  );
};

export default App;
