import React from "react";

interface SemiCircleProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
}

const SemiCircleProgress = ({
  percentage,
  size = 200,
  strokeWidth = 15,
  color = "#00A884",
  backgroundColor = "#e6e6e6",
  showPercentage = true,
}: SemiCircleProgressProps) => {
  const radius = (size - strokeWidth) /2;
  const circumference = radius * Math.PI;
  const progress = ((100 - percentage) / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size / 2 }}>
      <svg
        width={size}
        height={size / 2}
        style={{ transform: "rotate(0deg)", overflow: "visible" }}
      >
        {/* Background Path */}
        <path
          d={`M${strokeWidth / 2},${size / 2} a${radius},${radius} 0 0,1 ${size - strokeWidth},0`}
          fill="none"
          strokeLinecap="round"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Path */}
        <path
          d={`M${strokeWidth / 2},${size / 2} a${radius},${radius} 0 0,1 ${size - strokeWidth},0`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>
      
      {showPercentage && (
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{ marginTop: size / 4 }}
        >
          <span className="text-2xl mt-1 font-bold text-primary-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default SemiCircleProgress;