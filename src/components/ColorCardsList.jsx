import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

const ColorCardsList = ({ code, color_name, color_year, color_id, code_color, style }) => {

  const [lgShow, setLgShow] = useState(false);

  return (
    <>
      <div className="grid_container_card" style={style} onClick={() => setLgShow(true)}>
        <p className='color-card color-card-text color-card-text--id'>id {color_id}</p>
        <p className='color-card color-card-text'>{color_name}</p>
        <p className='color-card color-card-text color-card-text--year'>{color_year}</p>
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header closeButton style={style} className='border-0'>
          <Modal.Title id="example-modal-sizes-title-lg">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={style} className='color-modal'>
          <p className='color-modal-text'>{color_name}</p>
          <p className='color-modal-text color-modal-text--subtitles'> Id: {color_id}</p>
          <p className='color-modal-text color-modal-text--subtitles'>The most popular color in {color_year}</p>
          <p className='color-modal-text color-modal-text--subtitles'>Pantone code: {code}</p>
          <p className='color-modal-text color-modal-text--subtitles'>{code_color}</p>
        </Modal.Body >
      </Modal>
    </>
  )
}

export default ColorCardsList;