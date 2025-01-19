
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-darkBackground">
      <DotLottieReact
        src="./animation.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default Loader;