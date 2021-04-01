import React from 'react';
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
