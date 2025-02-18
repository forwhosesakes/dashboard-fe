import React from "react";

interface PercentageCircleProps {
  value: number;
  size?: number;
  startColor?: string;
}

const PercentageCircle = ({
  value,
  size = 120,
  startColor = "#00A884",
}: PercentageCircleProps) => {
  const gradientId = React.useId();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient 
            id={gradientId} 
            x1="0%" 
            y1="0%" 
            x2="0%" 
            y2="100%"
          >
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={`url(#${gradientId})`}
        />
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-[#F7F7F7] text-3xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
          style={{ fontSize: size * 0.25 }}
        >
          {value}%
        </span>
      </div>
    </div>
  );
};

export default PercentageCircle;