function Icon({ iconImage, iconText }) {
  const IconComponent = iconImage;
  return (
    <div
      className="flex flex-col items-center space-y-2 p-4 md:h-40 
  bg-white/10 backdrop-blur-md border border-white/20 
  rounded-xl shadow-lg transition duration-300 
  hover:bg-white/20 hover:shadow-xl"
    >
      <IconComponent className="text-4xl" />
      <p className="text-gray-50">{iconText}</p>
    </div>
  );
}

export default Icon;
