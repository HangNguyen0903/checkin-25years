import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import MainLayout from "../components/layout/MainLayout";
import { NotFoundPage } from "../components/NotFoundPage";
import LoginPage from "../pages/Login";

const RenderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<MainLayout>{route.element}</MainLayout>}
        />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default RenderRoutes;
