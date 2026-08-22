import { useNavigate } from "react-router-dom";

function PanelOption() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Welcome Back, Admin
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto">
            Choose your destination. Would you like to manage the store or view
            it as a customer?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {/* Customer View Card */}
          <button
            onClick={() => navigate("/")}
            className="group relative flex flex-col items-center justify-center p-10 md:p-14 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-24 h-24 mb-8 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]">
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
                className="text-blue-400 group-hover:text-blue-300 transition-colors"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>

            <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight">
              Storefront
            </h2>
            <p className="text-neutral-400 text-base text-center leading-relaxed">
              Browse the website, view products, and experience the storefront
              exactly as your customers do.
            </p>
          </button>

          {/* Admin Panel Card */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="group relative flex flex-col items-center justify-center p-10 md:p-14 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="w-24 h-24 mb-8 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
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
                className="text-emerald-400 group-hover:text-emerald-300 transition-colors"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>

            <h2 className="text-3xl font-semibold text-white mb-4 tracking-tight">
              Admin Panel
            </h2>
            <p className="text-neutral-400 text-base text-center leading-relaxed">
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
