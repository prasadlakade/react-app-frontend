import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Col, Container, Form, FormControl, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import CommonLeftPanel from '../../commonLeftPanel/CommonLeftPanel';
import PropTypes from 'prop-types';

import './ManageGroups.styles.scss';
import { GROUP_FORM } from '../../../common/constants';
import FormScreen from '../formScreen/FormScreen';
import { setLocalStorageData } from '../../../common/LocalStorageActions';

const ManageGroups = (props) => {
  let filteredTableData;
  const internalTheme = props.mainTheme === 'theme-dark' ? 'dark' : 'light';
  const [searchField, setSearchField] = useState({
    searchText: '',
    searchBy: 'groupName'
  });
  const [groupData, setGroupData] = useState({});
  const [editDataRow, setEditDataRow] = useState({});
  const [show, setShow] = useState(false);
  const [formAction, setFormAction] = useState('');

  let getGroupsLocalData = JSON.parse(localStorage.getItem('GROUP_FORM_LSDATA'));

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

  useEffect(() => {
    console.log('getGroupsLocalData', getGroupsLocalData);
    if (getGroupsLocalData) {
      setGroupData({
        ...groupData,
        groups: getGroupsLocalData
      });
    }
  }, []);

  useEffect(() => {
    console.log('groupData', groupData);
  }, [groupData]);

  const tableHeaderArr = [
    'Sr.No', 'Group Name', 'Group Category', 'Group SubCategory', 'Action'
  ];
  const tableHeaders = (tableHeaderArr)
    ? (
        tableHeaderArr.map((el) => (
          <th key={el}>{el}</th>
        ))
      )
    : [];

  const handleChange = (e, id) => {
    setSearchField({
      ...searchField,
      [e.target.name]: e.target.value,
      [id]: document.querySelector(`#${id}`).value
    });
  };

  const { searchText, searchBy } = searchField;
  if (searchField.searchBy && groupData) {
    filteredTableData = (groupData.groups) && groupData.groups.filter((el) => {
      console.log('el[searchBy]', el);
      console.log('searchBy', searchBy);
      return (el[searchBy].toLowerCase().includes(searchText.toLowerCase()));
    });
  }

  const handleSubmit = (formValues, action, formType) => {
    if (!getGroupsLocalData) {
      getGroupsLocalData = [];
    }
    const finalFormData = [];
    finalFormData.push(formValues);

    let editedArray = [];
    let mergedArray = [];

    if (action === 'EDIT_FORM' && formType === GROUP_FORM) {
      editedArray = getGroupsLocalData.filter((item) => {
        return (
          item._id !== editDataRow[0]._id &&
          item.groupName !== editDataRow[0].groupName &&
          item.groupCategory !== editDataRow[0].groupCategory &&
          item.groupSubCategory !== editDataRow[0].groupSubCategory
        );
      });
      console.log('editedArray', editedArray);
      mergedArray = [
        ...editedArray, ...finalFormData
      ];
    } else {
      mergedArray = [
        ...getGroupsLocalData, ...finalFormData
      ];
    }

    console.log('mergedArray', mergedArray);
    // setLocalData
    setLocalStorageData(`${GROUP_FORM}_LSDATA`, mergedArray);

    setGroupData({
      ...groupData,
      groups: mergedArray
    });
    setEditDataRow({});
    setFormAction('');
    modalClose();
  };

  const deleteGroup = (e) => {
    let filteredTableData;
    console.log('id', e.target.id);
    if (getGroupsLocalData) {
      filteredTableData = getGroupsLocalData.filter((list) => {
        return (list._id !== e.target.id);
      });
    }
    console.log('filteredTableData', filteredTableData);
    setLocalStorageData(`${GROUP_FORM}_LSDATA`, filteredTableData);
    setGroupData({
      ...groupData,
      groups: filteredTableData
    });
  };

  const onEditGroup = (e) => {
    console.log('e.target.id', e.target.id);
    let getEditData;
    if (groupData && groupData.groups) {
      getEditData = groupData.groups.filter((item) => (
        e.target.id === item._id
      ));
    }
    setEditDataRow(getEditData);
    setFormAction('EDIT_FORM');
    handleShow();
  };

  return (
    <div className="manage-group-wrapper common-wrap-flex">
      <CommonLeftPanel />
      <Container>
        <div className="inner-common-wrapper">
        <Row>
          <Col>
              <h5>Manage Groups</h5>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="searchbar">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search Group"
                  aria-label="Search Group"
                  aria-describedby="Search Group"
                  onChange={(e) => (handleChange(e, 'searchBy'))}
                  name="searchText"
                  id="searchText"
                  autoComplete="off"
                />
                <InputGroup.Append>
                  <Form.Control
                    as="select"
                    name="searchBy"
                    id="searchBy"
                    variant={internalTheme}
                    onChange={(e) => (handleChange(e, 'searchText'))}>
                    <option value="groupName" title="Search by Group Name">Search by Group Name</option>
                    <option value="groupCategory" title="Search by Group Category">Search by Group Category</option>
                    <option value="groupSubCategory" title="Search by Group Sub Category">Search by Group Sub Category</option>
                  </Form.Control>
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
            <Table responsive bordered hover striped variant={internalTheme} size="sm">
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
                      <td>{el.groupName}</td>
                      <td>{el.groupCategory}</td>
                      <td>{el.groupSubCategory}</td>
                      <td>
                        <ButtonGroup aria-label="actionButtonGrpup">
                          <Button id={el._id} variant={internalTheme} size="sm">View</Button>
                          <Button
                            id={el._id}
                            variant={internalTheme}
                            onClick={onEditGroup}
                            size="sm">Edit</Button>
                          <Button
                            id={el._id}
                            variant="danger"
                            onClick={deleteGroup}
                            size="sm">Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                    )))
                  : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'left' }}>No Data</td>
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
              formType={GROUP_FORM}
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

ManageGroups.propTypes = {
  mainTheme: PropTypes.string
};

export default ManageGroups;
