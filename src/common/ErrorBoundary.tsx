import type { FallbackProps } from "react-error-boundary";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-red-50">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-red-600">
          🚨 Có lỗi xảy ra
        </h2>
        <p className="text-gray-600 mt-2">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
