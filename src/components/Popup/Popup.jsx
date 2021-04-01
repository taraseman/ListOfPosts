import React from 'react';
import PropTypes from 'prop-types';
import './Popup.scss';

export const Popup = ({ trigger, children, setPopupVisibility }) => {
  const closePopup = () => {
    setPopupVisibility(false);
  };

  return (trigger) ? (
    <div className="popup">
      <div className="popup__inner">
        <button
          className="popup__button"
          type="button"
          onClick={closePopup}
        >
          X
        </button>
        { children }
      </div>
    </div>
  ) : '';
};

Popup.propTypes = {
  trigger: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setPopupVisibility: PropTypes.func.isRequired,
};
