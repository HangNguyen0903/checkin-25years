import { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./common/ErrorBoundary";
import LoadingScreen from "./common/LoadingScreen";
import RenderRoutes from "./routes/AppRoutes";

function App() {
  return (
     <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
          <RenderRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
