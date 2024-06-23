import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>Home Page</Layout>} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};
//1:05
