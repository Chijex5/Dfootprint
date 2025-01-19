import React from "react";

const ButtonLoader = () => {
  return (
    <div className="flex items-center space-x-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white dark:bg-white animate-circle-fall"
          style={{ animationDelay: `${index * 0.2}s` }}
        ></div>
      ))}
    </div>
  );
};

export default ButtonLoader;
