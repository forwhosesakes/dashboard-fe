import React from 'react';

const CircularProgressBar = ({ 
  progress = 50, 
  size = 'md',
  animate = true,
  gradientStart = '#3B82F6',  // Default blue-500
  gradientEnd = '#2563EB',    // Default blue-600
  gradientId = 'progressGradient'
}) => {
  const sizes = {
    sm: { width: 120, strokeWidth: 16 },
    md: { width: 160, strokeWidth: 24 },
    lg: { width: 300, strokeWidth: 32 }
  };
//@ts-ignore
  const { width, strokeWidth } = sizes[size] || sizes.md;
  const radius = width / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progressStroke = ((100 - progress) / 100) * circumference;
  
  // Center point for the circle
  const center = width / 2;

  return (
    <div className="w-full flex flex-col items-stretch">
      <div className="flex flex-col items-center w-full">
        <div className="w-full flex justify-center">
          <svg
            width={width}
            height={width}
            viewBox={`0 0 ${width} ${width}`}
            className="w-full max-w-full -rotate-90"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Define the gradient */}
            <defs>
              <linearGradient
                id={gradientId}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor={gradientStart} />
                <stop offset="100%" stopColor={gradientEnd} />
              </linearGradient>
            </defs>

            {/* Background circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
            
            {/* Progress circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={`url(#${gradientId})`}
              className={`${animate ? 'transition-all duration-500' : ''}`}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progressStroke}
            />

            {/* Percentage text */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dy="0.3em"
              className="rotate-90 text-2xl font-semibold fill-gray-700"
            >
              {progress}%
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;