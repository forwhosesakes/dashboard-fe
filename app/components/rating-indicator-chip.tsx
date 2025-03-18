
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

const RatingIndicatorChip = ({ value }:{value:number}) => {
  const safeValue = Math.min(100, Math.max(0, value));
  
  const ratings = [
    {
      threshold: 20,
      label: "ضعيف جداً",
      textColor: "text-red-400",
      borderColor: "border-red-600",
      bgColor: "bg-red-50",
      icon: <TrendingDown className="text-red-700 h-4 w-4" />
    },
    {
      threshold: 40,
      label: "ضعيف",
      textColor: "text-red-300",
      borderColor: "border-red-500",
      bgColor: "bg-red-50",
      icon: <TrendingDown className="text-red-600 h-4 w-4" />
    },
    {
      threshold: 60,
      label: "متوسط",
      textColor: "text-yellow-500",
      borderColor: "border-yellow-500",
      bgColor: "bg-yellow-50/10",
      icon: <Minus className="text-yellow-600 h-4 w-4" />
    },
    {
      threshold: 80,
      label: "جيد",
      textColor: "text-green-400",
      borderColor: "border-green-500",
      bgColor: "bg-green-50",
      icon: <TrendingUp className="text-green-600 h-4 w-4" />
    },
    {
      threshold: 101, 
      label: "ممتاز",
      textColor: "text-green-500",
      borderColor: "border-green-600",
      bgColor: "bg-green-50",
      icon: <TrendingUp className="text-green-700 h-4 w-4" />
    }
  ];
  
  const rating = ratings.find(r => safeValue < r.threshold) as any;
  
  return (
    <div className={`pl-2 pr-2 py-0.5 h-fit border-2 rounded-xl gap-1 flex justify-center items-center ${rating.borderColor} ${rating.bgColor}`}>
      <p className={`${rating.textColor} text-xs`}>{rating.label}</p>
      {rating.icon}
    </div>
  );
};



export default RatingIndicatorChip;