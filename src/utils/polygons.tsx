type LatLng = [number, number];

export const getPolygonCenter = (positions: LatLng[]): LatLng => {
  let latSum = 0;
  let lngSum = 0;
  positions.forEach(([lat, lng]) => {
    latSum += lat;
    lngSum += lng;
  });
  return [latSum / positions.length, lngSum / positions.length];
};
