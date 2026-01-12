export const PlaceMap = ({ lat, lng, name }) => {
  // Default to Jaghori, Afghanistan
  const defaultLat = 33.4579;
  const defaultLng = 68.6255;

  const mapLat = lat || defaultLat;
  const mapLng = lng || defaultLng;

  return (
    <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={[mapLat, mapLng]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[mapLat, mapLng]}>
          <Popup>{name || "Location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
