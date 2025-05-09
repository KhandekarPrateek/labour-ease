import { Suspense } from "react";
import ShopkeeperProfilePage from "./_components/shopkeeperProfile";


const ShopkkeeperDashboardPage = () => {
  return (
    <Suspense>
    <ShopkeeperProfilePage />
    </Suspense>
   );
};

export default ShopkkeeperDashboardPage;
