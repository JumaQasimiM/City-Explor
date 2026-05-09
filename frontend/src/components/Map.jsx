export const Map = ({ lat, lng }) => {
  if (!lat || !lng) return null;
  return (
    <iframe
      width="100%"
      height="350"
      className="rounded border-0"
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
    />
  );
};
