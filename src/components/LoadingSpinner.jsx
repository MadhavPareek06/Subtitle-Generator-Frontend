function LoadingSpinner({ size = 'md', text = 'Processing...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative">
        <div className={`${sizeClasses[size]} border-2 border-slate-200 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-2 border-blue-500 border-t-transparent rounded-full absolute top-0 left-0 animate-spin`}></div>
      </div>
      {text && (
        <p className="text-sm text-slate-600 font-medium">{text}</p>
      )}
    </div>
  );
}

export default LoadingSpinner; 