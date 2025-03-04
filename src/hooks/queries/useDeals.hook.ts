import {
    useInfiniteQuery,
    UseInfiniteQueryResult,
    useQuery,
    UseQueryResult,
} from '@tanstack/react-query';
import dealService from "@/service/dealService.ts";
import { BrandDealModel, DealModel, TimeType } from "@/service/model.ts";

export type useBrandDealListType = {
    brandDeals: UseInfiniteQueryResult<BrandDealModel[], Error>;
};

export type useTimeDealListType = {
    timeDeals: UseInfiniteQueryResult<DealModel[], Error>;
};

export type useLureDealType = {
    lureDeals: UseQueryResult<DealModel[], Error | null>;
};

export const useLureDeals = (): useLureDealType => {
    const lureDeals = useQuery({
        queryKey: ['lureDeals'],
        queryFn: async () => await dealService.lureDeals(),
        staleTime: 1000 * 60 * 10,
    });
    return {
        lureDeals,
    };
};
export const useBrandDealList = (): useBrandDealListType => {
    const brandDeals = useInfiniteQuery({
        queryKey: ['brandDeals'],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) =>
          await dealService.brandDealList({ page: pageParam }),
        getNextPageParam: (lastPage, _allPosts, lastPageParam) => {
            const isLastPage = lastPage.isLastPage;
            if (isLastPage) {
                return null;
            }
            return lastPageParam + 1;
        },
        select: (data) => {
            const products = data?.pages.flatMap((page) =>
              page.itemList.flatMap((items) => items)
            );

            return products;
        },
    });

    return { brandDeals };
};

export const useTimeDealList = ({
                                    time,
                                }: {
    time: TimeType;
}): useTimeDealListType => {
    const timeDeals = useInfiniteQuery({
        queryKey: ['brandDeals'],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            return await dealService.timeDealList({ page: pageParam, time: time });
        },
        getNextPageParam: (lastPage, _allPosts, lastPageParam) => {
            const isLastPage = lastPage.isLastPage;
            if (isLastPage) {
                return null;
            }
            return lastPageParam + 1;
        },
        select: (data) => {
            const products = data?.pages.flatMap((page) =>
              page.itemList.flatMap((items) => items)
            );

            return products;
        },
    });

    return { timeDeals };
};
