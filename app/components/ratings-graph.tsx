import { useEffect, useState } from "react";
import GoodIcon from "~/assets/icons/good.svg?react";
import BadIcon from "~/assets/icons/bad.svg?react";
import NeutralIcon from "~/assets/icons/neutral.svg?react";

type RatingType = "GOOD" | "BAD" | "NEUTRAL";
interface IRating {
  percentage: number;
  label: string;
  id: string;
}

interface IProps {
  ratings: IRating[];
}

const RATING_TYPES = {
  GOOD: {
    position: "top",
    icon: GoodIcon,
    color: "#22c55e",
    className: "text-green-500",
    rowIndex: 0,
  },
  NEUTRAL: {
    position: "middle",
    icon: NeutralIcon,
    color: "#f59e0b",
    className: "text-amber-500",
    rowIndex: 1,
  },
  BAD: {
    position: "bottom",
    icon: BadIcon,
    color: "#ef4444",
    rowIndex: 2,
    className: "text-red-500",
  },
};

const getRatingType = (percentage: number) => {
  if (percentage >= 70) return RATING_TYPES.GOOD;
  if (percentage >= 40) return RATING_TYPES.NEUTRAL;
  return RATING_TYPES.BAD;
};

// Component for a single indicator icon with animation
const IndicatorIcon = ({ 
  rating, 
  delay = 0 
}: { 
  rating: typeof RATING_TYPES.GOOD;
  delay?: number;
}) => {
  const Icon = rating.icon;

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${rating.className} opacity-0 indicator-icon`}
      style={{
        animation: `fadeInScale 0.5s ease-out ${delay}s forwards`,
        transition: "all 0.3s ease",
      }}
    >
      <Icon className="w-12 h-12" />
    </div>
  );
};

// Component for percentage display with animation
const PercentageDisplay = ({ 
  percentage, 
  className, 
  delay = 0 
}: { 
  percentage: number;
  className: string;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (delay <= 0) return;
    
    const timeoutId = setTimeout(() => {
      const duration = 1500; // Animation duration in ms
      const steps = 30; // Number of steps
      const increment = percentage / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= percentage) {
          setCount(percentage);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, delay * 1000);
    
    return () => clearTimeout(timeoutId);
  }, [percentage, delay]);
  
  return (
    <div
      className={`text-4xl font-bold ${className} opacity-0 percentage-display`}
      style={{
        animation: `fadeIn 0.5s ease-out ${delay}s forwards`,
        transition: "all 0.3s ease",
      }}
    >
      {count}%
    </div>
  );
};

const RatingsGraph = (props: IProps) => {
  // State for animation control
  const [showLine, setShowLine] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  
  // Process indicators to get their ratings and positions
  const ratedIndicators = props.ratings.map((indicator) => ({
    ...indicator,
    rating: getRatingType(indicator.percentage),
  }));

  const reversedIndicators = [...ratedIndicators].reverse();
  
  const grid = Array(3)
    .fill(null)
    .map(() => Array(props.ratings.length).fill(null));

  ratedIndicators.forEach((indicator, colIndex) => {
    const rowIndex = indicator.rating.rowIndex;
    grid[rowIndex][colIndex] = indicator;
  });
  
  useEffect(() => {
    setShowLine(false);
    setAnimationKey(prev => prev + 1);
    
    const lineTimer = setTimeout(() => {
      setShowLine(true);
    }, 500);
    
    return () => {
      clearTimeout(lineTimer);
    };
  }, [props.ratings]); 

  return (
    <div className="border-[#9C9C9C] w-full cursor-pointer border-2 rounded-lg p-5 pt-16 relative overflow-hidden">
      <style>{`
        @keyframes fadeInScale {
          0% { opacity: 0; transform: scale(0); }
          70% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes drawLine {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        .indicator-container {
          transition: all 0.3s ease;
        }
        
        .indicator-container:hover .indicator-icon {
          animation: pulse 0.6s ease-in-out;
          transform: scale(1.15);
          filter: brightness(1.2);
        }
        
        .indicator-container:hover .percentage-display {
          transform: translateY(-5px);
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
        }
        
        .indicator-container:hover .indicator-label {
          font-weight: 700;
          transform: translateY(3px);
        }
      `}</style>
      
      <div className="relative mx-auto">
        <svg
          className="absolute w-[85%] h-full z-0 top-4 left-1/2 -translate-x-1/2"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polyline
            points={reversedIndicators
              .map((indicator, i) => {
                const xPercent = (i / (props.ratings.length - 1)) * 100;
                const yPixel = indicator.rating.rowIndex * 25 -4;
                return `${xPercent},${yPixel}`;
              })
              .join(" ")}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="0.5"

            className={showLine ? "" : "opacity-0"}
            style={{
              animation: showLine ? 'drawLine 1.5s ease-in-out forwards' : 'none',
              strokeDashoffset: 1000,
            }}
          />
        </svg>

        <div
          className="grid grid-rows-3 gap-y-6 relative z-30 mb-6"
          style={{
            gridTemplateColumns: `repeat(${props.ratings.length}, 1fr)`,
          }}
        >
          {grid.flat().map((cell, index) => {
            const rowIndex = Math.floor(index / props.ratings.length);
            const colIndex = index % props.ratings.length;
            
            // Calculate delay based on column for sequential animation
            const iconDelay = 0.3 + (colIndex * 0.15);
            const percentDelay = iconDelay + 0.3;
            const labelDelay = percentDelay + 0.2;

            return (
              <div
                key={`cell-${rowIndex}-${colIndex}-${animationKey}`}
                className="flex flex-col justify-center items-center pt-8 h-8 indicator-container"
                style={{ gridRow: rowIndex + 1, gridColumn: colIndex + 1 }}
              >
                {cell && <IndicatorIcon key={`icon-${animationKey}`} rating={cell.rating} delay={iconDelay} />}
                {cell?.percentage && (
                  <PercentageDisplay 
                    key={`percent-${animationKey}`}
                    percentage={cell.percentage} 
                    className={cell.rating.className}
                    delay={percentDelay}
                  />
                )}
                {cell?.label && (
                  <div 
                    key={`label-${animationKey}`}
                    className="font-medium text-center mb-8 text-base w-32 opacity-0 indicator-label"
                    style={{
                      animation: `fadeIn 0.5s ease-out ${labelDelay}s forwards`,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {cell.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingsGraph;