import React from "react";

type TextSizeType = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';

interface SemiCircleProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showPercentage?: boolean;
  useGradient?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
  gradientId?: string;
  textSize?: TextSizeType;
}

const SemiCircleProgress = ({
  percentage,
  size = 200,
  strokeWidth = 15,
  color = "#00A884",
  backgroundColor = "#373A41",
  showPercentage = true,
  useGradient = false,
  gradientStart = "",
  gradientEnd = "",
  gradientId = "semiCircleGradient",
  textSize = "2xl",
}: SemiCircleProgressProps) => {
  const radius = (size - strokeWidth) /2;
  const circumference = radius * Math.PI;
  const progress = ((100 - percentage) / 100) * circumference;
  
  const actualGradientStart = gradientStart || color;
  const actualGradientEnd = gradientEnd || color;
  
  const strokeColor = useGradient ? `url(#${gradientId})` : color;

  // Map textSize to Tailwind class
  const textSizeClass = `text-${textSize}`;

  return (
    <div className="relative" style={{ width: size, height: size / 2 }}>
      <svg
        width={size}
        height={size / 2}
        style={{ transform: "rotate(0deg)", overflow: "visible" }}
      >
        {useGradient && (
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={actualGradientStart} />
              <stop offset="100%" stopColor={actualGradientEnd} />
            </linearGradient>
          </defs>
        )}
        
        <path
          d={`M${strokeWidth / 2},${size / 2} a${radius},${radius} 0 0,1 ${size - strokeWidth},0`}
          fill="none"
          strokeLinecap="round"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
        />
        
        <path
          d={`M${strokeWidth / 2},${size / 2} a${radius},${radius} 0 0,1 ${size - strokeWidth},0`}
          fill="none"
          stroke={strokeColor}
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
          <span className={`${textSizeClass} mt-1 font-bold text-primary-foreground`}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default SemiCircleProgress;