import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { NotFoundPage } from "../components/NotFoundPage";
import LoginPage from "../pages/Login";
import { routes } from "./routes";
import Message from "@/pages/Message";
import WishesScreen from "@/pages/Wishes";

const RenderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/message" element={<Message />} />
      <Route path="/wishes" element={<WishesScreen />} />

      {routes.map(({ path, element: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <MainLayout>
              <Component />
            </MainLayout>
          }
        />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default RenderRoutes;
