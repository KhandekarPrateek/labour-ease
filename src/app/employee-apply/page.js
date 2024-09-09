import { Suspense } from "react";
import JobData from "./_components/JobData";

const AllJobsPage = () => {
  return (
    <Suspense>
    <JobData />
    </Suspense>
   );
};

export default AllJobsPage;
