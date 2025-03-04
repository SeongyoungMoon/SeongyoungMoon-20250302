import { Header } from "@/components";
import BrandDealTemplate from "@/components/BrandDealTemplate/BrandDealTemplate.tsx";

const BrandDeal = () => {
  return (
    <div>
      <Header title="오늘의 브랜드딜" isBackButtonVisible={true} />
      <BrandDealTemplate />
    </div>
  );
};

export default BrandDeal;
