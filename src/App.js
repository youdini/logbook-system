import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage/MainPage";
import RecordPage from "./pages/RecordPage/RecordPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainPage />} errorElement={<ErrorPage />} />
      <Route path="records" element={<RecordPage />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
