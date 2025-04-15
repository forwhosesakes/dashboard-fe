import React from 'react';
import { getNumericVal } from '~/lib/utils/indicators';

const SemiCircleProgressBar = ({ 
  progress = 50, 
  size = 'md',
  animate = true,
  gradientStart = '#3B82F6',  // Default blue-500
  gradientEnd = '#2563EB',    // Default blue-600
  gradientId = 'progressGradient'
}) => {
  const sizes = {
    sm: { width: 120, height: 60, strokeWidth: 12 },
    md: { width: 200, height: 100, strokeWidth: 20 },
    lg: { width: 300, height: 150, strokeWidth: 32 }
  };
//@ts-ignore
  const { width, height, strokeWidth } = sizes[size] || sizes.md;
  const radius = width / 2 - strokeWidth;
  const circumference = radius * Math.PI;
  const progressStroke = ((100 - getNumericVal(progress)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ transform: "rotate(0deg)", overflow: "visible" }}
        >
          {/* Define the gradient */}
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="30%"
              y2="0%"
            >
              <stop offset="0%" stopColor={gradientStart} />
              <stop offset="100%" stopColor={gradientEnd} stopOpacity={0.4} />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d={`M ${strokeWidth}, ${height} a ${radius},${radius} 0 0,1 ${width - strokeWidth * 2},0`}
            fill="none"
            stroke="#373A41"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Progress arc */}
          <path
            d={`M ${strokeWidth}, ${height} a ${radius},${radius} 0 0,1 ${width - strokeWidth * 2},0`}
            fill="none"
            stroke={`url(#${gradientId})`}
            className={`${animate ? 'transition-all duration-500' : ''}`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={progressStroke}
          />
        </svg>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center mt-4">
          <span className="text-2xl mt-8 font-semibold text-white">
            {getNumericVal(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SemiCircleProgressBar;