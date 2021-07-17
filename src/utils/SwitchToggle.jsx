import React from 'react';
import PropTypes from 'prop-types';

const SwitchToggle = (props) => {
  const { setAppTheme } = props;
  return (
    <>
      <label className="switch" >
        <input type="checkbox" defaultChecked="checked" onClick={setAppTheme} name="switchtoggle" id="switchtoggle"/>
        <span className="slider round"></span>
      </label>
    </>
  );
};

SwitchToggle.propTypes = {
  setAppTheme: PropTypes.func.isRequired
};

export default SwitchToggle;
