'use client';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import useTimeDealTemplateHook from "@/hooks/useTimeDealTemplate.hook.tsx";
import Column from "@/components/Column/Column.tsx";
import Row from "@/components/Row/Row.tsx";
import Typography from "@/components/Typography/Typography.tsx";
import { BrandDealModel, DealModel, TimeType } from "@/service/model.ts";
import { formatNumber } from "@/util/util.tsx";
import { useNavigate } from "react-router-dom";
import { useTimeDealListType } from "@/hooks/queries/useDeals.hook.ts";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingIndicator from "@/components/LoadingIndicator/LoadingIndicator.tsx";

const TimeDealTemplate = () => {
  const {
    isTimeDealError,
    isLoading,
    lureDeals,
    currentTimeDeals,
    nextTimeDeals,
    brandDeals,
  } = useTimeDealTemplateHook();

  if (isLoading) {
    return <>loading...</>;
  }

  if (isTimeDealError) {
    return (
      <Column
        className={clsx('w-100vw', 'bg-White', 'items-center')}
      >
        <Column
          className={clsx('w-full', 'h-[100px]', 'bg-White')}
          justifyContent={'justify-center'}
        >
          <Typography
            size={'text-size-16'}
            weight={'bold'}
            className={clsx('text-center')}
          >
            오류가 발생했습니다. 다시 한 번 시도해주세요.
          </Typography>
          <div className={clsx('h-[10px]')} />
          <div
            onClick={() => {
              window.location.reload();
            }}
          >
            <Typography
              size={'text-size-16'}
              weight={'bold'}
              color={'text-Blue-500'}
              className={clsx('text-center')}
            >
              새로고침
            </Typography>
          </div>
        </Column>
      </Column>
    );
  }

  return (
    <Column alignItems={'items-center'} className={clsx('w-100vw', 'bg-White')}>
      <LureDealSection deals={lureDeals} />
      <BrandDealSection deals={brandDeals} />
      <TimeDealSection
        currentDeals={currentTimeDeals}
        nextDeals={nextTimeDeals}
      />
    </Column>
  );
};

const LureDealSection = ({ deals }: { deals: DealModel[] | undefined }) => {
  if (!deals) return <></>;

  return (
    <Column
      className={clsx('w-full', 'bg-O-500')}
      justifyContent={'justify-start'}
    >
      <Typography
        color={'text-White'}
        size={'text-size-20'}
        weight={'bold'}
        className={clsx('pt-4', 'pb-5', 'pl-4')}
      >
        오늘만 이 가격, 순삭특가!
      </Typography>
      <Row
        spaceBetween={'space-x-3'}
        className={clsx('px-4', 'pb-8', 'overflow-x-auto', 'scrollbar-hide')}
      >
        {deals.map((deal) => (
          <Column
            key={deal.id.toString() + deal.title}
            alignItems={'items-start'}
            justifyContent={'justify-start'}
            className={clsx(
              'w-[146px]',
              'h-[227px]',
              'rounded-3xl',
              'bg-White',
              'flex-shrink-0'
            )}
          >
            <img
              src={deal.image}
              alt={deal.title}
              className={clsx('h-[142px]', 'w-full', 'rounded-t-3xl')}
            />
            <Typography
              size={'text-size-16'}
              weight={'medium'}
              nowrap={false}
              className={clsx('pt-[9px]', 'px-2.5', 'line-clamp-2')}
            >
              {deal.title}
            </Typography>
            <Row className={clsx('pt-1', 'px-2.5', 'pb-1.5')}>
              <Typography
                size={'text-size-16'}
                weight={'bold'}
                color={'text-R-500'}
                className={clsx('pr-1')}
              >
                {deal.discountRate}%
              </Typography>
              <Typography size={'text-size-16'} weight={'bold'}>
                {formatNumber(deal.discountedPrice)}원
              </Typography>
            </Row>
          </Column>
        ))}
      </Row>
    </Column>
  );
};

const BrandDealSection = ({
                            deals,
                          }: {
  deals: BrandDealModel[] | undefined;
}) => {
  const navigate = useNavigate();

  const navigateToBrandDeal = () => {
    navigate('/deals/brand-deal');
  };

  if (!deals) return <></>;

  return (
    <Column className={'w-full'}>
      <Row
        justifyContent={'justify-between'}
        alignItems={'items-center'}
        className={clsx('pt-[18px]', 'px-4', 'pb-[14px]')}
      >
        <Typography size={'text-size-16'} weight={'bold'}>
          오늘의 브랜드딜
        </Typography>
        <div onClick={navigateToBrandDeal}>
          <Typography
            size={'text-size-14'}
            weight={'bold'}
            color={'text-GR-400'}
          >
            전체보기
          </Typography>
        </div>
      </Row>
      <Row
        spaceBetween={'space-x-3'}
        className={clsx('py-3', 'px-4', 'overflow-x-auto', 'scrollbar-hide')}
      >
        {deals.map((deal) => (
          <Column
            key={deal.id.toString() + deal.title}
            alignItems={'items-start'}
            justifyContent={'justify-start'}
            className={clsx('w-[120px]', 'flex-shrink-0')}
          >
            <img
              src={deal.image}
              alt={deal.title}
              className={clsx(
                'h-[120px]',
                'w-[120px]',
                'rounded-[8px]',
                'border border-GR-100'
              )}
            />
            <div className={clsx('pt-[6px]', 'pb-[2px]')}>
              <DiscountEndTimer discountEndDate={deal.discountEndDate} />
            </div>
            <Typography
              size={'text-size-14'}
              weight={'medium'}
              className={clsx('pb-0.5', 'line-clamp-2')}
            >
              {deal.title}
            </Typography>
            <Row alignItems={'items-center'}>
              <Typography
                size={'text-size-14'}
                weight={'bold'}
                color={'text-R-500'}
                className={clsx('pr-1')}
              >
                {deal.discountRate}%
              </Typography>
              <Typography size={'text-size-14'} weight={'bold'}>
                {formatNumber(deal.discountedPrice)}원
              </Typography>
            </Row>
          </Column>
        ))}
      </Row>
    </Column>
  );
};

const TimeDealSection = ({
                           currentDeals,
                           nextDeals,
                         }: {
  currentDeals: useTimeDealListType['timeDeals'];
  nextDeals: useTimeDealListType['timeDeals'];
}) => {
  const [showingTab, setShowingTab] = useState<TimeType>('current');

  const deals = useMemo(() => {
    if (showingTab === 'current') return currentDeals;
    return nextDeals;
  }, [currentDeals, nextDeals, showingTab]);

  const isNextAvailable = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    return currentHour >= 7 && currentHour < 23;
  };

  const title = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour < 7 || currentHour > 23) {
      return '7시에 시작되는 오늘의 타임특가!';
    } else if (currentHour === 22)
      return '11시에 끝나는 오늘의 마지막 타임특가!';
  };

  const currentTabTitle = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    if (currentHour < 12) return `오전 ${currentHour}시`;
    return `오후 ${currentHour - 12}시`;
  };

  const nextTabTitle = () => {
    const currentDate = new Date();
    const nextHour = currentDate.getHours() + 1;
    if (nextHour < 12) return `오전 ${nextHour}시`;
    return `오후 ${nextHour - 12}시`;
  };

  const changeTab = (tab: TimeType) => {
    setShowingTab(tab);
  };

  if (!currentDeals) return <></>;

  return (
    <Column className={clsx('w-full')}>
      {isNextAvailable() ? (
        <Row className={clsx('border-b border-GR-100', 'w-full')}>
          <div
            onClick={() => changeTab('current')}
            className={clsx(
              'h-10',
              'px-1',
              'border-b-2',
              showingTab === 'current' ? 'border-Black' : 'border-White',
              'content-center',
              'm-auto'
            )}
          >
            <Typography size={'text-size-16'} weight={showingTab === 'current' ? 'bold' : 'medium'}>
              {currentTabTitle()}
            </Typography>
          </div>
          <div
            onClick={() => changeTab('next')}
            className={clsx(
              'h-10',
              'px-1',
              'border-b-2',
              showingTab === 'next' ? 'border-Black' : 'border-White',
              'content-center',
              'm-auto'
            )}
          >
            <Typography size={'text-size-16'} weight={showingTab === 'next' ? 'bold' : 'medium'}>
              {nextTabTitle()}
            </Typography>
          </div>
        </Row>
      ) : (
        <Typography
          size={'text-size-18'}
          weight={'bold'}
          className={clsx('pt-[18px]', 'px-4', 'pb-[14px]')}
        >
          {title()}
        </Typography>
      )}
      <TimeDealList deals={deals} isAvailable={isNextAvailable()} />
    </Column>
  );
};

const TimeDealList = ({
                        deals,
                        isAvailable,
                      }: {
  deals: useTimeDealListType['timeDeals'];
  isAvailable: boolean;
}) => {
  const { data, hasNextPage, fetchNextPage, isFetching, isLoading } = deals;

  const loadMore = async () => {
    await fetchNextPage();
  };

  const loading = isLoading || isFetching;
  const isEmpty = data?.length === 0 && !loading;

  const gridStyle = clsx(
    'px-4',
    'py-2.5',
    'grid',
    'grid-cols-2',
    'gap-x-2',
    'gap-y-3'
  );

  return (
    <InfiniteScroll
      dataLength={data?.length ?? 0}
      next={loadMore}
      hasMore={!isFetching && hasNextPage}
      loader={undefined}
    >
      <div className={gridStyle}>
        {data?.map((deal) => (
          <Column
            key={deal.id.toString() + deal.title}
            alignItems={'items-start'}
            justifyContent={'justify-start'}
          >
            <div className={'relative'}>
              <img
                src={deal.image}
                alt={deal.title}
                className={clsx(
                  'aspect-177/175',
                  'rounded-[10px]',
                  'border border-GR-100'
                )}
              />
              {!isAvailable && (
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  }}
                  className="absolute inset-0 flex items-center justify-center rounded-[10px]"
                >
                  <Typography
                    size={'text-size-18'}
                    weight={'bold'}
                    color={'text-White'}
                  >
                    오픈 예정
                  </Typography>
                </div>
              )}
            </div>
            <div className={'h-[10px]'} />
            <Typography
              size={'text-size-16'}
              weight={'medium'}
              className={clsx('line-clamp-2')}
            >
              {deal.title}
            </Typography>
            <Typography
              size={'text-size-16'}
              weight={'medium'}
              color={'text-GR-300'}
              decoration={'line-through'}
              className={clsx('line-clamp-2', 'pb-1')}
            >
              {formatNumber(deal.originalPrice)}원
            </Typography>
            <Row>
              <Typography
                size={'text-size-16'}
                weight={'bold'}
                color={'text-R-500'}
                className={clsx('pr-1')}
              >
                {deal.discountRate}%
              </Typography>
              <Typography size={'text-size-16'} weight={'bold'}>
                {formatNumber(deal.discountedPrice)}원
              </Typography>
            </Row>
          </Column>
        ))}
        {isEmpty && <LoadingIndicator state={'empty'} />}
        {loading && <LoadingIndicator state={'loading'} />}
      </div>
    </InfiniteScroll>
  );
};

const DiscountEndTimer = ({ discountEndDate }: { discountEndDate: string }) => {
  const [remaining, setRemaining] = useState('');

  const dateFormatted = () => {
    const now = new Date();
    const end = new Date(discountEndDate);
    let diff = Math.abs(end.getTime() - now.getTime());

    if (diff <= 0) return '할인 종료';

    const ms = diff % 1000;
    diff = (diff - ms) / 1000;
    const ss = diff % 60;
    diff = (diff - ss) / 60;
    const mm = diff % 60;
    diff = (diff - mm) / 60;
    const hh = diff % 24;

    const hhString = hh > 0 ? `${hh}시간 ` : '';
    const mmString = `${mm.toString().padStart(2, '0')}분 `;
    const ssString = `${ss.toString().padStart(2, '0')}초 `;

    return `${hhString}${mmString}${ssString}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(dateFormatted());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={clsx('bg-R-50', 'px-1', 'pt-0.5', 'rounded-[4px]')}>
      <Typography
        size={'text-size-12'}
        weight={'medium'}
        color={'text-R-500'}
      >
        {remaining}
      </Typography>
    </div>
  );
};

export default TimeDealTemplate;
