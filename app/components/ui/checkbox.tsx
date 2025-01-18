import { Check } from "lucide-react";
import { useState } from "react";

interface CheckboxProps {
  label?: string;
  id: string;
  name: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function Checkbox({ 
  label, 
  id, 
  name, 
  checked: controlledChecked, 
  onChange,
  className = "" 
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  
  // Use controlled or uncontrolled checked state
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleClick = () => {
    const newValue = !isChecked;
    setInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleClick();
          }
        }}
        className={`w-4 h-4 border border-gray-300 rounded bg-white flex items-center justify-center cursor-pointer
          transition-all duration-200 ease-in-out hover:border-gray-400
          ${className}`}
      >
        <Check 
          className={`w-3 h-3 transition-all duration-200
            ${isChecked 
              ? 'text-black scale-100 opacity-100' 
              : 'scale-0 opacity-0'
            }`}
        />
      </div>
      {label && (
        <span 
          onClick={handleClick}
          className="text-text-xs lg:text-lg md:text-sm text-secondary-900 cursor-pointer select-none"
        >
          {label}
        </span>
      )}
    </div>
  );
}