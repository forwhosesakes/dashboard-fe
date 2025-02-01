import { Children, cloneElement, type ReactElement } from 'react';
import type { ButtonProps } from './button';
import { cn } from '~/lib/tw-merge';



interface ButtonGroupProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  children: ReactElement<ButtonProps>[];
}

export const ButtonGroup = ({
  className,
  orientation = 'horizontal',
  children,
}: ButtonGroupProps) => {
  const totalButtons = Children.count(children);
  const isHorizontal = orientation === 'horizontal';
  const isVertical = orientation === 'vertical';

  return (
    <div

      className={cn(
        'flex',
        {
          'flex-col': isVertical,
          'w-fit': isVertical,
        },
        className
      )}
    >
      {Children.map(children, (child, index) => {
        const isFirst = index === 0;
        const isLast = index === totalButtons - 1;

        return cloneElement(child, {
          className: cn(
            {
              'rounded-l-none': isHorizontal && !isLast,
              'rounded-r-none': isHorizontal && !isFirst,
              'border-l-0': isHorizontal && !isLast,

              'rounded-t-none': isVertical && !isLast,
              'rounded-b-none': isVertical && !isFirst,
              'border-t-0': isVertical && !isLast,
            },
            child.props.className
          ),
        });
      })}
    </div>
  );
};