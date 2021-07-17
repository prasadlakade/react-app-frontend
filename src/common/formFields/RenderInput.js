import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RenderInput = (props) => {
  const { onChange } = props;
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={props.name}>{props.label}</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={props.label}
          name={props.name}
          autoComplete="off"
          onChange={onChange}
          value={props.values[props.name]} />
      </Form.Group>
    </>
  );
};

RenderInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.string)
};

export default RenderInput;
