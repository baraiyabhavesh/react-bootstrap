import React from "react";

const GoogleMap = ({ data, spaceAfter, layoutType }) => {
  return (
    <div
      className={`content-section frame frame-${layoutType} ${
        spaceAfter && `frame-space-after-${spaceAfter}`
      }`}
    >
      <section className="map-section">
        <div className="embed-responsive embed-responsive-21by9">
          <iframe
            src={data.embedSource}
            className="embed-responsive-item"
            width={"100%"}
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default GoogleMap;
