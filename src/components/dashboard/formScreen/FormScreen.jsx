import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import RenderInput from '../../../common/formFields/RenderInput';
import PropTypes from 'prop-types';
import { GROUP_FORM, USER_FORM } from '../../../common/constants';
import { v4 as uuidv4 } from 'uuid';

import './FormScreen.styles.scss';

const FormScreen = (props) => {
  const { formType, editDataRow, formAction } = props;
  console.log('editDataRow', editDataRow);
  const [formValues, setFormValues] = useState({
    groupName: formType === GROUP_FORM ? '' : '',
    groupCategory: formType === GROUP_FORM ? '' : null,
    groupSubCategory: formType === GROUP_FORM ? '' : null,
    userName: formType === USER_FORM ? '' : null,
    userId: formType === USER_FORM ? '' : null,
    userEmail: formType === USER_FORM ? '' : null,
    status: formType === USER_FORM ? '' : null
  });
  let FormKeys, fieldName;

  if (formType.toUpperCase() === GROUP_FORM) {
    FormKeys = ['groupName', 'groupCategory', 'groupSubCategory'];
    fieldName = ['Group Name', 'Group Category', 'Group Sub-Category'];
  } else if (formType.toUpperCase() === USER_FORM) {
    FormKeys = ['userName', 'userId', 'userEmail', 'groupName'];
    fieldName = ['User Name', 'User ID', 'User Email', 'Group Name'];
  }

  useEffect(() => {
    if (formAction === 'EDIT_FORM' && (editDataRow && editDataRow.length > 0)) {
      editDataRow.map((list) => (
        setFormValues(list)
      ));
    }
  }, []);

  const onInputChange = (e) => {
    console.log('e', e.target.name + ' : ' + e.target.value);
    if (formType.toUpperCase() === GROUP_FORM || formType.toUpperCase() === USER_FORM) {
      if (formAction === 'EDIT_FORM') {
        setFormValues(
          {
            ...formValues,
            [e.target.name]: e.target.value
          }
        );
      } else {
        setFormValues(
          {
            ...formValues,
            _id: uuidv4(),
            [e.target.name]: e.target.value
          }
        );
      }
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.log('formValues', formValues);
    props.handleSubmitForm(formValues, formAction, formType);
  };
  return (
    <div className="innerForm-wrapper">
      <Form onSubmit={handleSubmitForm}>
        <RenderInput
          name={FormKeys[0]}
          label={fieldName[0]}
          type="text"
          placeholder={fieldName[0]}
          values={formValues}
          onChange={onInputChange}
        />
        <RenderInput
          name={FormKeys[1]}
          label={fieldName[1]}
          type="text"
          placeholder={fieldName[1]}
          values={formValues}
          onChange={onInputChange}
        />
        <RenderInput
          name={FormKeys[2]}
          label={fieldName[2]}
          type="text"
          placeholder={fieldName[2]}
          values={formValues}
          onChange={onInputChange}
        />
        {formType.toUpperCase() === USER_FORM &&
          <RenderInput
          name={FormKeys[3]}
          label={fieldName[3]}
          type="text"
          placeholder={fieldName[3]}
          values={formValues}
          onChange={onInputChange}
        />
        }
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};

FormScreen.propTypes = {
  formType: PropTypes.string,
  formAction: PropTypes.string,
  handleSubmitForm: PropTypes.func,
  editDataRow: PropTypes.any
};

export default FormScreen;
