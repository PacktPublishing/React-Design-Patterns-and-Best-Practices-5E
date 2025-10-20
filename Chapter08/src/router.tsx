import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./components/RootLayout";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { BlogPage } from "./pages/BlogPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardOverview } from "./pages/DashboardOverview";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { ContactPage } from "./pages/ContactPage";
import { ContactSuccessPage } from "./pages/ContactSuccessPage";
import { homeLoader } from "./loaders/homeLoader";
import { productLoader, productAction } from "./loaders/productLoader";
import { blogLoader, blogAction } from "./loaders/blogLoader";
import { rootLoader } from "./loaders/rootLoader";
import { dashboardLoader } from "./loaders/dashboardLoader";
import { analyticsLoader } from "./loaders/analyticsLoader";
import { contactLoader, contactAction } from "./loaders/contactLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "products/:id",
        element: <ProductPage />,
        loader: productLoader,
        action: productAction,
      },
      {
        path: "blog",
        element: <BlogPage />,
        loader: blogLoader,
        action: blogAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <DashboardOverview />,
            loader: dashboardLoader,
          },
          {
            path: "analytics",
            element: <AnalyticsPage />,
            loader: analyticsLoader,
          },
          {
            path: "reports",
            element: <ReportsPage />,
          },
        ],
      },
      {
        path: "contact",
        element: <ContactPage />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contact/success",
        element: <ContactSuccessPage />,
      },
    ],
  },
]);
