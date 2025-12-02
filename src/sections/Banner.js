import dynamic from "next/dynamic";
import React from "react";
const ParallaxBanner = dynamic(
  () => import("@/components/Banner/ParallaxBanner"),
  {
    ssr: false,
  }
);
const MediumBanner = dynamic(() => import("@/components/Banner/MediumBanner"), {
  ssr: false,
});
const SmallBanner = dynamic(() => import("@/components/Banner/SmallBanner"), {
  ssr: false,
});
const LargeBanner = dynamic(() => import("@/components/Banner/LargeBanner"), {
  ssr: false,
});
const Banner = ({ data, spaceAfter, spaceBefore, layoutType, elementType }) => {
  switch (data.layout) {
    case "0": {
      return <SmallBanner key={data.layout} content={data} />;
    }
    case "1": {
      return (
        <ParallaxBanner
          key={data.layout}
          content={data}
          spaceBefore={spaceBefore}
          spaceAfter={spaceAfter}
        />
      );
    }
    case "2": {
      return <LargeBanner key={data.layout} content={data} />;
    }
    case "3": {
      return (
        <MediumBanner
          key={data.id}
          content={data}
          spaceBefore={spaceBefore}
          spaceAfter={spaceAfter}
        />
      );
    }
    case "4": {
      return <LargeBanner key={data.layout} content={data} />;
    }
  }
};

export default Banner;
