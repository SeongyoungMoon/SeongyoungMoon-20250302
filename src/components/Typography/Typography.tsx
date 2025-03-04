import { ReactNode } from "react";
import clsx from "clsx";

type weight = 'regular' | 'medium' | 'bold'; // 400 | 500 | 700
type decoration = 'none' | 'line-through' | 'underline' | 'overline';

export interface TypographyProps {
  nowrap?: boolean;
  color?: string;
  size?: string;
  weight?: weight;
  decoration?: decoration;
  children: ReactNode;
  className?: string;
}

const Typography = (props: TypographyProps) => {
  const {
    as: Component = 'p',
    children,
    color,
    size,
    weight,
    decoration = 'none',
    nowrap = false,
    className,
  } = props;

  const weightClasses = {
    regular: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  };

  const cn = clsx(
    'whitespace-pre-line',
    decoration,
    size,
    weight && weightClasses[weight],
    color || '',
    nowrap && 'whitespace-nowrap',
    className
  );

  return <p className={cn}>{children}</p>;
};
export default Typography;
