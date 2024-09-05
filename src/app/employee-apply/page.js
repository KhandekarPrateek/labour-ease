import { Suspense } from "react";
import AllJobs from "./_components/AllJobs"

const AllJobsPage = () => {
  return (
    <Suspense>
    <AllJobs />
    </Suspense>
   );
};

export default AllJobsPage;
