import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userAuthContext } from '../../common/usecontexts/userAuthContext';
import CommonLeftPanel from '../commonLeftPanel/CommonLeftPanel';
import PropTypes from 'prop-types';

import './Dashboard.styles.scss';

const DashboardScreen = (props) => {
  const { authencationDetails } = useContext(userAuthContext);
  console.log('authencationDetails', authencationDetails);

  return (
    <div className="dashboard-wrapper">
      <CommonLeftPanel/>
      <div className="right-panel-wrapper">
        <Container>
          <Row>
            <Col>
              {authencationDetails && authencationDetails.isloggedIn &&
              (<p>{authencationDetails.category + ' screen' }</p>)
              }
            </Col>
          </Row>
          <hr />
          <Row>
              <Col className="mb-5">
                <div className="dashboard-content">
                {
                  (authencationDetails && authencationDetails.category === 'Administrator')
                    ? (
                        <div className="db-card card-gm">
                          <Link to="/dashboard/groups">
                            <span>Manage Groups</span>
                          </Link>
                        </div>
                      )
                    : null
                }
                  <div className="db-card card-gm">
                    <Link to="/dashboard/users">
                      <span>Manage Users</span>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
        </Container>
      </div>
    </div>
  );
};

DashboardScreen.propTypes = {
  mainTheme: PropTypes.string
};

export default DashboardScreen;
