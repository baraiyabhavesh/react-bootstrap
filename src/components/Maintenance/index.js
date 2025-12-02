import React from "react";
import maintenance from "@/assets/images/maintenance.png";
import Image from "next/image";
import { Container } from "react-bootstrap";
const Maintenance = ({ headline, message }) => {
  return (
    <div className="maintenance">
      <Container>
        <div className="maintenance__content">
          <Image
            src={maintenance}
            height={0}
            width={0}
            alt="Maintenance-image"
            title="Maintenance-image"
            style={{ width: "auto", height: "auto", maxWidth: "100%" }}
          />
          {headline && <h1>{headline}</h1>}
          {message && <h3>{message}</h3>}
        </div>
      </Container>
    </div>
  );
};

export default Maintenance;
