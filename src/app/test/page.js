import { Suspense } from "react";
import JobApplicantsList from "./_components/jobApplicantsList";

const Test = () => {
  return (
    <Suspense>
    <JobApplicantsList />
    </Suspense>
   );
};

export default Test;