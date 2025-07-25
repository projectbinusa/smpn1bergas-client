import React, { useState } from 'react';
import "../../../css/galery/gallery.css";
import { Box, Modal } from '@mui/material';

const ImageCardLaporan = ({ image, title, content }) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    borderRadius:"10px",
    backgroundColor:"#f5f5f5"
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="image-card-laporan" onClick={openModal}>
        <img src={image} alt={title} />
      </div>

      {/* {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={image} alt={title} className="modal-image" />
            <h4 style={{textTransform: "uppercase"}}>{title}</h4>
            <p style={{color: "#002147", fontSize: "14px"}}>{content}</p>
              <button onClick={closeModal} className="close-button">TUTUP</button>
          </div>
        </div>
      )} */}

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={image} alt={title} className="modal-image" />
          <h4 style={{ textTransform: "uppercase" }}>{title}</h4>
          <p style={{ color: "#002147", fontSize: "14px", textAlign: "left" }}>{content}</p>
          <button onClick={closeModal} className="close-button">TUTUP</button>
        </Box>
      </Modal>
    </>
  );
};

export default ImageCardLaporan;
