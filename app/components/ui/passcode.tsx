import { useEffect, useRef, useState } from "react";
import { Input } from "./input-field";

interface IProps {
  noDigits: number;
  title: string;
  onFinishTyping: (num: string) => void;
}

const Passcode = (props: IProps) => {
  const itemsRef = useRef<HTMLInputElement[]>(
    new Array(props.noDigits).fill(null)
  );
  const [passcode, setPasscode] = useState<string[]>(
    new Array(props.noDigits).fill("")
  );

  useEffect(() => {
    const fullPasscode = passcode.join("");
    if (fullPasscode.length === props.noDigits) {
      props.onFinishTyping(fullPasscode);
    }
  }, [passcode, props.noDigits, props.onFinishTyping]);

  const handleKeyDownChange = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    event.stopPropagation();

    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      if (index > 0) {
        itemsRef.current[index - 1]?.focus();
      }
      return;
    }

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      return;
    }

    //cuz the order and stuff
    setPasscode((prev) => {
      const newPasscode = [...prev];
      newPasscode[index] = event.key;
      return newPasscode;
    });
    if (index < props.noDigits - 1) {
      itemsRef.current[index + 1]?.focus();
    }
  };

  return (
    <div dir="ltr" className="flex flex-wrap justify-between ">
      {props.title && (
        <p className=" basis-full text-right text-primary-800">{props.title}</p>
      )}
      {Array.from({ length: props.noDigits }, (_, i) => (
        <Input
          className="w-16 h-16 px-4 my-1 !text-4xl text-secondary font-bold text-center"
          value={passcode[i]}
          onKeyDown={(e) => handleKeyDownChange(e, i)}
          onChange={(e) => e.preventDefault()}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          ref={(element: HTMLInputElement) => {
            itemsRef.current[i] = element;
          }}
        />
      ))}
    </div>
  );
};

export default Passcode;
