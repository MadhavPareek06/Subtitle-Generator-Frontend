import { useState, useEffect } from 'react';

function LoadingBar({ isLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (!isLoading && progress === 0) return null;

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-indigo-600">
          Generating subtitles...
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">
        Processing your video file...
      </div>
    </div>
  );
}

export default LoadingBar;