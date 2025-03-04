import clsx from "clsx";

export interface ColumnProps {
  justifyContent?: string;
  alignItems?: string;
  className?: string;
  spaceBetween?: string;
  children: React.ReactNode;
}
const Row = (props: ColumnProps) => {
  const { children, justifyContent, alignItems, spaceBetween, className } =
    props;

  const rowStyle = clsx(
    'flex',
    'flex-row',
    justifyContent,
    alignItems,
    spaceBetween,
    className
  );
  return <div className={rowStyle}>{children}</div>;
};

export default Row;
