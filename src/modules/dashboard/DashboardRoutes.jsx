import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./containers";
import {
  AuthProtectedRoute,
  DashboardLayout,
  PageNotFound,
} from "../../shared";
// import { ManageUserDetails } from "../profitune";
// import { useUtilFunctions } from "../../utils";
// import { ManageCoachDetails } from "../coach";

export const DashboardRoutes = () => {
  // const { getLoggedInUser } = useUtilFunctions();
  // const user = getLoggedInUser();
  // const profileElement =
  //   user.role === "CDS"
  //     ? {
  //         path: "profile/details/:userId",
  //         element: <ManageUserDetails />,
  //       }
  //     : user.role === "NHG"
  //       ? {
  //           path: "profile/details/:coachId",
  //           element: <ManageCoachDetails />,
  //         }
  //       : null;

  return (
    <Routes>
      <Route
        element={
          <AuthProtectedRoute>
            <DashboardLayout />
          </AuthProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        {/* {profileElement && <Route {...profileElement} />} */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
