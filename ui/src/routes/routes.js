import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "../common/components/Navbar";

// Path
const App = lazy(() => import("../App"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Signup"));
const Hotels = lazy(() => import("../pages/home/HotelList"));
const Hotel = lazy(() => import("../pages/hotel/hotel"));

/**
 * @component Path
 * @description Path is component which is the central routes of the whole application.
 *
 * @returns Fragment and Suspense
 */
export const Path = () => {
  /**
   * Element component takes same props as what Route takes in react-router-dom
   * in element: pass lazy elements for code splitting for code to load async.
   */
  const element = [
    { path: "/", element: <App />, index: true },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/hotels", element: <Hotels /> },
    { path: "/hotel/:hotelid", element: <Hotel />, exact: true },
    { path: "*", element: <h1>Not Found!</h1> },
  ];

  const routes = useRoutes(element);
  return (
    <React.Fragment>
      <Navbar />
      <Suspense fallback={<div>Loading..</div>}>{routes}</Suspense>
    </React.Fragment>
  );
};
