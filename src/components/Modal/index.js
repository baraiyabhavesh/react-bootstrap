"use client";

import DOMPurify from "dompurify";
import SafeLink from "@/components/Core/SafeLink";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { sanitizeLink } from "@/utils/sanitizeLink";
import { useRouter } from "next/navigation";
import { safeIncludes, safeReplace } from "@/utils/safeString";

const ModalComponent = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const position = data.Position; // top bottom
  const background = data.Background; // secondary, success, danger, warning, info, dark
  const router = useRouter();

  return (
    <div className="modal-components">
      <Button onClick={() => setOpenModal(true)}>{data.ButtonText}</Button>
      <Modal.Dialog>
        <Modal
          size={data.Size}
          show={openModal}
          onHide={() => setOpenModal(false)}
          centered={data.Center === "0" ? false : true}
          fullscreen={
            position === "bottom" || position === "top" ? true : false
          }
          className={`${position === "top" ? "top-modal" : "bottom-modal"}`}
        >
          {data.Heading !== "" && (
            <Modal.Header
              closeButton
              className={`bg-${background} ${
                background === "light" ||
                background === "warning" ||
                background === "info" ||
                background === "default"
                  ? "text-dark"
                  : "text-light"
              }`}
              closeVariant={`${
                background === "light" ||
                background === "warning" ||
                background === "info" ||
                background === "default"
                  ? "black"
                  : "white"
              }`}
            >
              <Modal.Title>{data.Heading}</Modal.Title>
            </Modal.Header>
          )}
          {data.rte !== "" && (
            <Modal.Body>
              <div
                onClick={(e) => {
                  setOpenModal(false),
                    e.preventDefault(),
                    sanitizeLink(e, router);
                }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data.rte),
                }}
              />
            </Modal.Body>
          )}
          {data.ModalButtonLink && (
            <Modal.Footer>
              {data.ModalButtonLink && (
                <SafeLink
                  href={safeReplace(data.ModalButtonLink, " _blank", "/") || data.ModalButtonLink}
                  target={safeIncludes(data.ModalButtonLink, "_blank") ? "blank" : undefined}
                  className={`btn ${
                    background === "default"
                      ? "btn-primary"
                      : `btn-${background}`
                  } `}
                  onClick={() => setOpenModal(false)}
                >
                  {data.ModalButtonText}
                </SafeLink>
              )}
            </Modal.Footer>
          )}
        </Modal>
      </Modal.Dialog>
    </div>
  );
};

export default ModalComponent;
