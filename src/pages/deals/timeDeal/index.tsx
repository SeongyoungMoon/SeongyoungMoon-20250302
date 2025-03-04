import { Header } from "@/components";

import TimeDealTemplate from "@/components/TimeDealTemplate/TimeDealTemplate.tsx";

const TimeDeal = () => {

  return (
    <div>
      <Header title="타임특가" isBackButtonVisible={false} />
      <TimeDealTemplate />
    </div>
  );
};

export default TimeDeal;
