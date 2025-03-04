import {
  BrandDealListModel,
  DealModel,
  GetBrandDealRequest,
  GetTimeDealRequest,
  TimeDealListModel
} from "@/service/model.ts";

const baseURL = String(import.meta.env.VITE_BASE_URL);

const DealService = {
  async lureDeals(): Promise<DealModel[]> {
    const response = await fetch(baseURL.concat(`/deals/lure-deal`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return (await response.json()) as DealModel[];
  },
  async brandDealList(param: GetBrandDealRequest): Promise<BrandDealListModel> {
    const response = await fetch(
      baseURL.concat(`/deals/brand-deal?page=${param.page}`),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return (await response.json()) as BrandDealListModel;
  },
  async timeDealList(param: GetTimeDealRequest): Promise<TimeDealListModel> {
    const response = await fetch(
      baseURL.concat(`/deals/time-deal?time=${param.time}&page=${param.page}`),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return (await response.json()) as TimeDealListModel;
  },
};

export default DealService;
