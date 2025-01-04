import { Suspense } from "react";
import RateLabours from "./_components/RateLabours";

const RateLaboursPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RateLabours />
    </Suspense>
  );
};

export default RateLaboursPage;
