export interface DealModel {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
}

export interface TimeDealListModel {
  itemList: DealModel[];
  isLastPage: boolean;
}

export interface BrandDealModel {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
  stockPercentage: number;
  discountEndDate: string;
}

export interface BrandDealListModel {
  itemList: BrandDealModel[];
  isLastPage: boolean;
}

export interface GetBrandDealRequest {
  page: number;
}

export type TimeType = 'current' | 'next';

export interface GetTimeDealRequest {
  time: TimeType;
  page: number;
}

export interface DealModel {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
}

export interface BrandDealModel {
  id: number;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discountRate: number;
  image: string;
  stockPercentage: number;
  discountEndDate: string;
}

