import clsx from 'clsx';
import { useMemo } from 'react';

export type LoadingState = 'loading' | 'empty';
export interface LoadingIndicatorProps {
  state: LoadingState;
}
const LoadingIndicator = ({ state }: LoadingIndicatorProps) => {
  const StateComponent = useMemo(() => {
    switch (state) {
      case 'loading':
        return <>로딩중</>;
      case 'empty':
        return <>결과가 없습니다</>;
    }
  }, [state]);

  const divStyle = clsx(
    'flex',
    'flex-row',
    'items-center',
    'justify-center',
    'min-h-[54px]'
  );

  return (
    <div className={divStyle}>
      {StateComponent}
    </div>
  );
};

export default LoadingIndicator;
