import React from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const RenderSelect = (props) => {
  const { options, onChange } = props;
  return (
    <>
      <Form.Group>
        <Form.Label htmlFor={props.name}>{props.label}</Form.Label>
        <Form.Control
          as={props.type}
          name={props.name}
          value={props.values[props.name]}
          onChange={onChange}
          >
          {
            options && (
              options.map((item) => (
                <option value={item} title={item} key={item}>{item}</option>
              ))
            )
          }
        </Form.Control>
      </Form.Group>
    </>
  );
};

RenderSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.objectOf(PropTypes.string)
};

export default RenderSelect;
