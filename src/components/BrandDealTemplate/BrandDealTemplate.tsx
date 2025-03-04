'use client';

import Column from "@/components/Column/Column.tsx";
import clsx from "clsx";
import Row from "@/components/Row/Row.tsx";
import { useBrandDealList } from "@/hooks/queries/useDeals.hook.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import Typography from "@/components/Typography/Typography.tsx";
import { formatNumber } from "@/util/util.tsx";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator.tsx";
import { useEffect, useRef, useState } from "react";

const BrandDealTemplate = () => {
  const { brandDeals } = useBrandDealList();
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } =
    brandDeals;

  const loadMore = async () => {
    await fetchNextPage();
  };

  const loading = isLoading || isFetching;
  const isEmpty = data?.length === 0 && !loading;

  return (
    <Column alignItems={'items-center'} className={clsx('w-100vw', 'bg-White')}>
      <div className={'h-[10px]'} />
      <InfiniteScroll
        dataLength={data?.length ?? 0}
        next={loadMore}
        hasMore={!isFetching && hasNextPage}
        loader={undefined}
      >
        <Column className={'w-full'}>
          {data?.map((deal) => (
            <Row key={deal.id} className={clsx('space-x-2.5', 'px-4', 'py-2.5')}>
              <img
                src={deal.image}
                alt={deal.title}
                className={clsx('h-[141px]', 'w-[141px]', 'rounded-[8px]')}
              />
              <Column className={'w-full'}>
                <Typography
                  size={'text-size-16'}
                  weight={'medium'}
                  className={clsx('line-clamp-2')}
                >
                  {deal.title}
                </Typography>
                <div className={'h-2'} />
                <ProgressBar percent={deal.stockPercentage} />
                <div className={'h-3'} />
                <Typography
                  size={'text-size-16'}
                  weight={'bold'}
                  color={'text-R-500'}
                  className={clsx('line-clamp-2')}
                >
                  할인가 {formatNumber(deal.discountedPrice)}원
                </Typography>
                <Typography
                  size={'text-size-12'}
                  weight={'medium'}
                  color={'text-GR-300'}
                  className={clsx('line-clamp-2')}
                >
                  곧 정상가 {formatNumber(deal.originalPrice)}원 으로 돌아갑니다.
                </Typography>
              </Column>
            </Row>
          ))}
          {isEmpty && <LoadingIndicator state={'empty'} />}
          {loading && <LoadingIndicator state={'loading'} />}
        </Column>
      </InfiniteScroll>
    </Column>
  );
};

const ProgressBar = ({ percent }: { percent: number }) => {
  const [width, setWidth] = useState(0);
  const progressRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(percent);
          if (progressRef.current) observer.unobserve(progressRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current!);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current!);
      }
    };
  }, [percent]);

  return (
    <div className={clsx('h-4', 'rounded-[20px]', 'bg-O-300', 'relative')}>
      <div
        ref={progressRef}
        className={clsx(
          'h-full',
          'rounded-[20px]',
          'bg-O-500',
          'transition-all',
          'duration-1000'
        )}
        style={{ width: `${width}%` }}
      ></div>
      <Typography
        size={'text-size-12'}
        weight={'bold'}
        color={'text-White'}
        className={
          'text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        }
      >
        {percent}%
      </Typography>
    </div>
  );
};

export default BrandDealTemplate;
