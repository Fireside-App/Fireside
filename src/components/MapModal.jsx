import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const MapModal = props => {
  if (!props.show) {
    return null;
  }
  // passing down from props
  //   const { latitude, longitude } = props;
  // const [showMapModal, setShowMapModal] = useState(false);

  // this will handle modal closing function
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <Modal show={props.show} onRequestClose={props.close}>
      <button onClick={props.close}>Close</button>
    </Modal>
  );
};

export default MapModal;
