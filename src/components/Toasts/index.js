"use client";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import { Button, Container, Toast, ToastContainer } from "react-bootstrap";
import * as FontAwesome from "react-icons/fa6";

const ToastsComponent = ({ data }) => {
  const [toasts, setToasts] = useState([]);

  // Extract toasts from multiple possible locations
  let toastsData = data?.toasts;
  if (!toastsData && data?.pi_flexform_content?.toasts) {
    toastsData = data.pi_flexform_content.toasts;
  }
  
  // Normalize toasts - handle container wrappers
  const normalizedToasts = toastsData ? Object.values(toastsData).map(item => {
    if (!item || typeof item !== "object") return null;
    
    // If item has container, extract container data
    if (item.container && typeof item.container === "object") {
      const { container, ...itemWithoutContainer } = item;
      return {
        ...itemWithoutContainer,
        ...container,
      };
    }
    
    return item;
  }).filter(Boolean) : [];
  
  // Extract Position from multiple locations
  const position = data?.Position || data?.pi_flexform_content?.Position || "top-0 start-0";
  
  // Validate we have toasts data
  if (!normalizedToasts || normalizedToasts.length === 0) {
    return null;
  }

  const showToast = (index) => {
    const newToast = {
      index,
      show: true,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.index === index ? { ...toast, show: false } : toast
        )
      );
    }, 3000);
  };

  function IconComponent({ iconName, background }) {
    const Icon = FontAwesome[iconName];
    return Icon ? (
      <Icon
        className={`toast-icon ${
          background === "light" ? "text-dark" : `text-${background}`
        }`}
      />
    ) : null;
  }
  return (
    <Container>
      <div className="toast-section">
        <div className="toast__link">
          {normalizedToasts
            .filter(ele => ele && (ele.ButtonText || ele.buttonText))
            .map((ele, index) => {
            const buttonText = ele.ButtonText || ele.buttonText || "";
            const background = ele.Background || ele.background || "primary";
            
            return (
              <Button
                key={index}
                variant={background}
                onClick={(e) => {
                  e.preventDefault();
                  showToast(index);
                }}
              >
                {buttonText}
              </Button>
            );
          })}
        </div>

        <ToastContainer position={position}>
          {toasts?.map((toast, index) => {
            const toastData = normalizedToasts[toast.index];
            if (!toastData) return null;
            
            const background = toastData.Background || toastData.background || "primary";
            const heading = toastData.Heading || toastData.heading || "";
            const textarea = toastData.textarea || toastData.content || toastData.text || "";
            const icon = toastData.icon || toastData.Icon || "";
            
            return (
              <Toast
                key={index}
                show={toast.show}
                bg={background}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  {icon ? (
                    <IconComponent
                      iconName={icon}
                      background={background}
                    />
                  ) : null}
                  {heading && (
                    <h5 className="me-auto">
                      {heading}
                    </h5>
                  )}
                </Toast.Header>
                {textarea && (
                  <Toast.Body
                    className={
                      background === "dark" && "text-white"
                    }
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(textarea),
                    }}
                  ></Toast.Body>
                )}
              </Toast>
            );
          })}
        </ToastContainer>
      </div>
    </Container>
  );
};

export default ToastsComponent;
