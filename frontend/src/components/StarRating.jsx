const StarRating = ({ rating }) => {

  const percentage =  rating ? (((rating) / 5) * 100) : 0;

  return (
    <div className="relative inline-block leading-none">
      {/* Background: all empty stars */}
      <div className="flex text-gray-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className="ri-star-fill"/> 
        ))}
      </div>

      {/* Foreground: all filled stars, clipped by width % */}
      <div
        className="flex text-(--truffle) absolute top-0 left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <i key={i} className="ri-star-fill" />
        ))}
      </div>
    </div>
  );
};

export default StarRating;