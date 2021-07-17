import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Col, Container, FormControl, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import { USER_FORM } from '../../../common/constants';
import CommonLeftPanel from '../../commonLeftPanel/CommonLeftPanel';
import FormScreen from '../formScreen/FormScreen';

import PropTypes from 'prop-types';

import './ManageUsers.styles.scss';
import { setLocalStorageData } from '../../../common/LocalStorageActions';

const ManageUsers = (props) => {
  const [searchField, setSearchField] = useState({
    searchText: '',
    searchBy: 'userName'
  });
  const [groupData, setGroupData] = useState({});
  const [editDataRow, setEditDataRow] = useState({});
  const [show, setShow] = useState(false);
  const [formAction, setFormAction] = useState('');

  const internalTheme = props.mainTheme === 'theme-dark' ? 'dark' : 'light';
  let getUserLocalData = JSON.parse(localStorage.getItem('USER_FORM_LSDATA'));
  let filteredTableData;
  //
  const handleShow = () => {
    setShow(true);
  };
  const modalClose = (e) => {
    setShow(false);
  };

  const AddNewForm = (event, type) => {
    setFormAction('NEW_FORM');
    handleShow();
  };

  //
  const handleChange = (e, id) => {
    setSearchField({
      ...searchField,
      [e.target.name]: e.target.value,
      [id]: document.querySelector(`#${id}`).value
    });
  };
  const { searchText, searchBy } = searchField;
  if (searchField.searchBy && groupData) {
    filteredTableData = (groupData.users) && groupData.users.filter((el) => {
      console.log('el[searchBy]', el);
      console.log('searchBy', searchBy);
      return (el[searchBy].toLowerCase().includes(searchText.toLowerCase()));
    });
  }

  useEffect(() => {
    console.log('getUserLocalData', getUserLocalData);
    if (getUserLocalData) {
      setGroupData({
        ...groupData,
        users: getUserLocalData
      });
    }
  }, []);

  //
  const tableHeaderArr = [
    'Sr.No', 'User Name', 'User ID', 'User Email', 'Groups', 'Status', 'Action'
  ];
  const tableHeaders = (tableHeaderArr)
    ? (
        tableHeaderArr.map((el) => (
          <th key={el}>{el}</th>
        ))
      )
    : [];

  //
  const handleSubmit = (formValues, action, formType) => {
    if (!getUserLocalData) {
      getUserLocalData = [];
    }
    const finalFormData = [];
    finalFormData.push({ ...formValues, status: 'Active' });

    let editedArray = [];
    let mergedArray = [];

    if (action === 'EDIT_FORM' && formType === USER_FORM) {
      editedArray = getUserLocalData.filter((item) => {
        return (
          item._id !== editDataRow[0]._id &&
          item.userName !== editDataRow[0].userName &&
          item.userId !== editDataRow[0].userId &&
          item.userEmail !== editDataRow[0].userEmail &&
          item.status !== editDataRow[0].status &&
          item.groupName !== editDataRow[0].groupName
        );
      });
      console.log('editedArray', editedArray);
      mergedArray = [
        ...editedArray, ...finalFormData
      ];
    } else {
      mergedArray = [
        ...getUserLocalData, ...finalFormData
      ];
    }

    console.log('mergedArray', mergedArray);
    // setLocalData
    setLocalStorageData(`${USER_FORM}_LSDATA`, mergedArray);

    setGroupData({
      ...groupData,
      users: mergedArray
    });
    setEditDataRow({});
    setFormAction('');
    modalClose();
  };
  const deleteUser = (e) => {
    let filteredTableData;
    if (getUserLocalData) {
      filteredTableData = getUserLocalData.filter((list) => {
        return (list._id !== e.target.id);
      });
    }
    console.log('filteredTableData', filteredTableData);
    setLocalStorageData(`${USER_FORM}_LSDATA`, filteredTableData);
    setGroupData({
      ...groupData,
      users: filteredTableData
    });
  };
  const onEditUsers = (e) => {
    let getEditData;
    if (groupData && groupData.users) {
      getEditData = groupData.users.filter((item) => (
        e.target.id === item._id
      ));
    }
    setEditDataRow(getEditData);
    setFormAction('EDIT_FORM');
    handleShow();
  };
  const changeUserStatus = (e) => {
    let currUser;
    let editedFinalData;
    if (groupData && groupData.users) {
      currUser = groupData.users.filter((item) => (
        e.target.id === item._id
      ));
    }
    console.log(currUser, 'currUser');
    const editedStatus = currUser.map(list => {
      const changedStatus = list.status === 'Active' ? 'Inactive' : 'Active';
      return ({
        ...list,
        status: changedStatus
      });
    });
    console.log(editedStatus, 'editedStatus');

    if (groupData && groupData.users) {
      editedFinalData = groupData.users.filter((item) => (
        e.target.id !== item._id
      ));
    }

    console.log(editedFinalData, 'editedFinalData');

    const FinalMerged = [...editedFinalData, ...editedStatus];
    setLocalStorageData(`${USER_FORM}_LSDATA`, FinalMerged);
    setGroupData({
      ...groupData,
      users: FinalMerged
    });
  };

  return (
    <div className="manage-user-wrapper common-wrap-flex">
      <CommonLeftPanel />
      <Container>
        <div className="inner-common-wrapper">
        <Row>
          <Col>
              <h5>Manage Users</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="searchbar">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search User"
                  aria-label="Search User"
                  aria-describedby="Search User"
                  onChange={(e) => (handleChange(e, 'searchBy'))}
                  name="searchText"
                  id="searchText"
                  autoComplete="off"
                />
                <InputGroup.Append>
                  <FormControl
                    as="select"
                    name="searchBy"
                    id="searchBy"
                    variant={internalTheme}
                    onChange={(e) => (handleChange(e, 'searchText'))}>
                    <option value="userName" title="Search by User Name">Search by User Name</option>
                    <option value="userId" title="Search by User Id">Search by User Id</option>
                    <option value="userEmail" title="Search by User Email">Search by User Email</option>
                  </FormControl>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </Col>
          <Col>
              <div className="">
                <Button variant={`${internalTheme}`} onClick={AddNewForm}>Create New</Button>
              </div>
          </Col>
        </Row>
        <Row>
          <Col>
          {props.mainTheme &&
            <Table responsive bordered hover striped variant={internalTheme} size="sm"
            >
              <thead>
                <tr>
                { tableHeaders }
                </tr>
              </thead>
              <tbody>
                {filteredTableData && filteredTableData.length > 0
                  ? (filteredTableData.map((el, index) => (
                    <tr key={el._id}>
                      <td>{index + 1}</td>
                      <td>{el.userName}</td>
                      <td>{el.userId}</td>
                      <td>{el.userEmail}</td>
                      <td>{el.groupName}</td>
                      <td>{el.status}</td>
                      <td>
                        <ButtonGroup aria-label="actionButtonGrpup">
                          <Button id={el._id} variant="secondary" size="sm">View</Button>
                          <Button
                            id={el._id}
                            variant={'primary'}
                            onClick={onEditUsers}
                            size="sm">Edit</Button>
                          <Button
                            id={el._id}
                            variant="danger"
                            onClick={deleteUser}
                            size="sm">Delete</Button>
                          <Button
                            id={el._id}
                            variant="warning"
                            onClick={changeUserStatus}
                            style={{ width: '120px' }}
                            size="sm">{
                              el.status === 'Active' ? 'Lock User' : 'Unlock User'
                            }</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                    )))
                  : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'left' }}>No Data</td>
                  </tr>
                    )
                }
              </tbody>
            </Table>
          }
          </Col>
        </Row>
        </div>

        {/* modal */}
        <Modal
          show={show}
          fullscreen="true"
          variant={`${internalTheme}`}
          centered
          onHide={modalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormScreen
              formType={USER_FORM}
              editDataRow={editDataRow || []}
              handleSubmitForm={handleSubmit}
              formAction={formAction}
            />
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

ManageUsers.propTypes = {
  mainTheme: PropTypes.string
};

export default ManageUsers;
