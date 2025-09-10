import { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RenderRoutes from "./routes/routes.map";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-6">⏳ Đang tải...</div>}>
       <RenderRoutes/>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
