"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const MyMap = dynamic(() => import("@/components/map"), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
});

const MapComponent: React.FC = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return <div>{mapLoaded && <MyMap />}</div>;
};

export default MapComponent;
