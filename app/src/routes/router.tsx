import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants";
import { RootLayout } from "@/components/layout/RootLayout";
import { PageLoader } from "@/components/PageLoader";
import { ErrorPage } from "@/pages/ErrorPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

const PublicPage = lazy(() => import("@/pages/public"));
const DashboardPage = lazy(() => import("@/pages/dashboard"));

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.PUBLIC,
        element: (
          <Suspense fallback={<PageLoader />}>
            <PublicPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.DASHBOARD,
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
