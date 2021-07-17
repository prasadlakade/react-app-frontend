import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userAuthContext } from '../../common/usecontexts/userAuthContext';
import './CommonLeftPanel.styles.scss';

const CommonLeftPanel = (props) => {
  const { authencationDetails } = useContext(userAuthContext);
  return (
    <>
      <div className="left-panel-wrapper">
        <Container>
          <Row >
            <Col>
              <div className="profileDisplay card-gm">
                <h6>Name: {authencationDetails.username.toUpperCase()}</h6>
                <span><strong>({authencationDetails.category})</strong></span>
              </div>
            </Col>
          </Row>
          <hr />
          <Row >
            <Col>
              <nav className="leftpanel-menu">
              <ul>
                  <li>
                    <Link to="/dashboard" className="card-gm">Dashboard</Link>
                    <ul>
                      {(authencationDetails.isloggedIn === 'Administrator')
                        ? (<li>
                          <Link to="/dashboard/groups" className="card-gm">Manage Groups</Link>
                          </li>)
                        : null
                      }
                      <li>
                          <Link to="/dashboard/users" className="card-gm">Manage Users</Link>
                          </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CommonLeftPanel;
