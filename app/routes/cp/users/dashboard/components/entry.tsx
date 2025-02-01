import { useEffect, useRef } from "react";

const Entry = ({
    entry,
    isEditing,
    onEdit,
    onBlur,
  }: {
    entry: { name: string; value: any };
    isEditing: boolean;
    onEdit: (value: any) => void;
    onBlur: () => void;
  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
  
    useEffect(() => {
      if (isEditing) {
        inputRef.current?.focus();
      }
    }, [isEditing]);
  
    return (
      <div className="border w-1/5 flex flex-col">
        <p className="border-b p-2 text-accent font-semibold">{entry.name}</p>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="bg-white text-primary-foreground p-2"
            onBlur={onBlur}
            onChange={(e) => onEdit(e.target.value)}
            value={entry.value}
          />
        ) : (
          <button className="flex p-2 w-full" onClick={() => onEdit(entry.value)}>
            <p>{entry.value}</p>
          </button>
        )}
      </div>
    );
  };
  export default Entry