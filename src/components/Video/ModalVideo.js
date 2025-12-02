"use client";
import React, { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import ReactPlayer from "react-player";

const ModalVideo = ({ videoModal, setVideoModal, videoModalURL }) => {
  const [loading, setLoading] = useState(true);

  return (
    <Modal
      show={videoModal}
      onHide={() => setVideoModal(!videoModal)}
      className="modal-video"
      centered
      size="lg"
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className={`video-screen ${loading ? "loading" : "loaded"}`}>
          {loading && (
            <div className="spinner-wrapper">
              <Spinner animation="grow" variant="light" />
            </div>
          )}
          <ReactPlayer
            url={`${videoModalURL.url}`}
            width="100%"
            height="100%"
            controls
            onReady={() => {
              setLoading(false);
            }}
            playing={videoModalURL.autoplay}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default ModalVideo;
