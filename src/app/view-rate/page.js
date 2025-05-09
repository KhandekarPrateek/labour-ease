"use client";

import React, { Suspense } from "react";
import ViewRatings from "./_components/ViewRatings";

const ViewRatePage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ViewRatings />
    </Suspense>
  );
};

export default ViewRatePage;