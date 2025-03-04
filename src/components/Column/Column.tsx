import clsx from "clsx";

export interface ColumnProps {
  justifyContent?: string;
  alignItems?: string;
  spaceBetween?: string;
  className?: string;
  children: React.ReactNode;
}
const Column = (props: ColumnProps) => {
  const { children, justifyContent, alignItems, spaceBetween, className } =
    props;

  const columnStyle = clsx(
    'flex',
    'flex-col',
    justifyContent,
    alignItems,
    spaceBetween,
    className
  );
  return <div className={columnStyle}>{children}</div>;
};

export default Column;
