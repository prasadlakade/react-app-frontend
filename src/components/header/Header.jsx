import React, { useContext } from 'react';
import SwitchToggle from '../../utils/SwitchToggle';
import PropTypes from 'prop-types';
import {
  Link
  , withRouter
} from 'react-router-dom';

import './HeaderStyles.scss';
import { userAuthContext } from '../../common/usecontexts/userAuthContext';

const Header = (props) => {
  const { authencationDetails } = useContext(userAuthContext);
  const { onLogout } = props;
  console.log('authencationDetails', authencationDetails);

  const onLogoutHeader = () => {
    onLogout();
    props.history.push('/');
  };

  return (
    <>
      <header>
            <div className="logo-wrap">
              <h1>Web Manager</h1>
            </div>
            <div className="right-block">
              <nav className="main-menu">
                <ul>
                  {(!authencationDetails.isloggedIn)
                    ? (<li>
                      <Link to="/">Home</Link>
                    </li>)
                    : null
                  }
                  {(authencationDetails.isloggedIn)
                    ? (<li>
                        <Link to="/dashboard">Dashboard</Link>
                        </li>)
                    : null
                  }
                  {(authencationDetails.isloggedIn)
                    ? (
                        <li>
                      <div>
                        <span
                        className="text-default"
                        style={{ textDecoration: 'underline' }}
                        onClick={onLogoutHeader}>Logout</span>
                      </div>
                      </li>)
                    : null
                  }
                </ul>
              </nav>
              <div className="display-switch">
                <SwitchToggle setAppTheme={props.setAppTheme} />
              </div>
            </div>
          </header>
    </>
  );
};

Header.propTypes = {
  setAppTheme: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
  authencationDetails: PropTypes.objectOf(PropTypes.any),
  history: PropTypes.objectOf(PropTypes.any)
};

export default withRouter(Header);
