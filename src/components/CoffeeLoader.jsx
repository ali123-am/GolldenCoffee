import { useParams } from "react-router-dom";
const CoffeeLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg className="w-40 h-40 animate-spin-slow" viewBox="0 0 50 50">
        <circle
          className="stroke-coffee-gradient"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="125.6"
          strokeDashoffset="125.6"
          style={{ animation: "dash 2s ease-in-out infinite" }}
        />
      </svg>

      {Object.keys(useParams()).length === 0 && (
        <h5 className="mt-6 text-3xl sm:text-5xl p-5 font-bold bg-gradient-to-r from-[#3e1f1f] to-[#c8a07e] bg-clip-text text-transparent font-DanaDemiBold">
          Golden Coffee
        </h5>
      )}

      <style>{`
        @keyframes dash {
          0% {
            stroke-dashoffset: 125.6;
          }
          50% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 125.6;
          }
        }

        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }

        .stroke-coffee-gradient {
          stroke: url(#coffeeGradient);
        }
      `}</style>

      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4b2e2e" />
            <stop offset="50%" stopColor="#a9745f" />
            <stop offset="100%" stopColor="#d2b48c" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CoffeeLoader;
