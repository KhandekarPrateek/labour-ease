import { Suspense } from "react";
import JobPosting from "./_components/jobPosting";

const JobPostingPage = () => {
  return (
    <Suspense>
    <JobPosting />
    </Suspense>
   );
};

export default JobPostingPage;
