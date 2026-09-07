import { useNavigate } from "react-router-dom";

function PanelOption() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Decorators */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight font-serif">
            Welcome Back, Admin
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto">
            Choose your destination. Would you like to manage the store or view
            it as a customer?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Customer View Card */}
          <button
            onClick={() => navigate("/")}
            className="group relative flex flex-col items-center justify-center p-10 md:p-14 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-[2.5rem] hover:bg-white hover:border-tertiary/50 transition-all duration-500 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-tertiary/50 shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-linear-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-24 h-24 mb-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-[0_0_30px_-10px_rgba(8,27,75,0.1)] group-hover:shadow-[0_0_30px_-10px_rgba(212,160,23,0.3)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary group-hover:text-tertiary transition-colors"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>

            <h2 className="text-3xl font-semibold text-primary mb-4 tracking-tight font-serif">
              Storefront
            </h2>
            <p className="text-on-surface-variant text-base text-center leading-relaxed">
              Browse the website, view products, and experience the storefront
              exactly as your customers do.
            </p>
          </button>

          {/* Admin Panel Card */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="group relative flex flex-col items-center justify-center p-10 md:p-14 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-[2.5rem] hover:bg-white hover:border-tertiary/50 transition-all duration-500 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-tertiary/50 shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-linear-to-br from-tertiary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-24 h-24 mb-8 rounded-full bg-primary/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500 shadow-[0_0_30px_-10px_rgba(8,27,75,0.1)] group-hover:shadow-[0_0_30px_-10px_rgba(212,160,23,0.3)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary group-hover:text-tertiary transition-colors"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>

            <h2 className="text-3xl font-semibold text-primary mb-4 tracking-tight font-serif">
              Admin Panel
            </h2>
            <p className="text-on-surface-variant text-base text-center leading-relaxed">
              Manage inventory, process orders, update banners, and control all
              aspects of your store.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PanelOption;
