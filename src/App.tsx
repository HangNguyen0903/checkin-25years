import { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./common/ErrorBoundary";
import LoadingScreen from "./common/LoadingScreen";
import RenderRoutes from "./routes/AppRoutes";
import { SignalRContext } from "./context/signalr-context";

function App() {
  const isWishPage = location.pathname === "/wishes";
  return (
    <SignalRContext.Provider
      url={`${import.meta.env.VITE_API}wishHub`}
      connectEnabled={isWishPage}
    >
      <BrowserRouter>
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <RenderRoutes />
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </SignalRContext.Provider>
  );
}

export default App;
