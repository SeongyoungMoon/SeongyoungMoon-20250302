
import { useMemo } from 'react';
import { useBrandDealList, useLureDeals, useTimeDealList, useTimeDealListType } from "@/hooks/queries/useDeals.hook.ts";
import { BrandDealModel, DealModel } from "@/service/model.ts";

type useTimeDealTemplateType = {
    isTimeDealError: boolean;
    isLoading: boolean;
    lureDeals: DealModel[] | undefined;
    brandDeals: BrandDealModel[] | undefined;
    currentTimeDeals: useTimeDealListType['timeDeals'];
    nextTimeDeals: useTimeDealListType['timeDeals'];
};

const useTimeDealTemplateHook = (): useTimeDealTemplateType => {
    const { lureDeals } = useLureDeals();
    const { brandDeals } = useBrandDealList();
    const { timeDeals: currentTimeDeals } = useTimeDealList({ time: 'current' });
    const { timeDeals: nextTimeDeals } = useTimeDealList({ time: 'next' });

    const isTimeDealError = useMemo(() => {
        if (!currentTimeDeals || !nextTimeDeals) return false;
        return currentTimeDeals.isError || nextTimeDeals.isError;
    }, [currentTimeDeals, nextTimeDeals]);

    const isLoading = useMemo(() => {
        return (
          lureDeals.isLoading ||
          brandDeals.isLoading ||
          currentTimeDeals.isLoading ||
          nextTimeDeals.isLoading
        );
    }, [
        lureDeals.isLoading,
        brandDeals.isLoading,
        currentTimeDeals.isLoading,
        nextTimeDeals.isLoading,
    ]);

    return {
        isTimeDealError,
        isLoading,
        lureDeals: lureDeals.data,
        brandDeals: brandDeals.data,
        currentTimeDeals,
        nextTimeDeals,
    };
};

export default useTimeDealTemplateHook;
