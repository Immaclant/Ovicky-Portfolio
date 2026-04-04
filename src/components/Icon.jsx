function Icon({ iconImage, iconText }) {
  const IconComponent = iconImage;
  return (
    <div className="achievement-item">
      <IconComponent className="achievement-icon" />
      <p className="achievement-description">{iconText}</p>
    </div>
  );
}

export default Icon;
