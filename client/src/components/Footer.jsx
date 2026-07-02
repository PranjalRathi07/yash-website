/** @format */

import { Link } from "react-router-dom";
import gsap from "gsap";

const Footer = () => {
  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, { x: 6, duration: 0.3, ease: "power2.out" });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: "power2.out" });
  };

  return (
    <footer className="bg-primary pt-28 pb-12 px-8 flex flex-col justify-between gap-12 border-t border-tertiary/20 min-h-[calc(100vh-80px)]">
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <div className="flex flex-col">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary mb-6 leading-tight">
            Krishna
            <br />
            Vasanam
          </h2>
          <p className="font-sans text-base text-surface/80 leading-relaxed">
            Handcrafting divine moments since 2024. Krishna Vasanam is dedicated
            to providing the finest attire for your beloved deity with utmost
            devotion.
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="font-sans text-tertiary mb-6 uppercase tracking-widest text-sm font-semibold">
            Quick Links
          </h4>
          <ul className="space-y-4">
            {[
              { label: "Festive Collection", to: "/festive-wear" },
              { label: "Size Guide", to: "/size-guide" },
              { label: "Shipping & Returns", to: "/shipping-returns" },
              { label: "Privacy Policy", to: "/privacy-policy" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  className="text-surface/80 hover:text-surface transition-colors duration-200 inline-block font-sans text-base"
                  to={item.to}
                  onMouseEnter={handleLinkEnter}
                  onMouseLeave={handleLinkLeave}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="font-sans text-tertiary mb-6 uppercase tracking-widest text-sm font-semibold">
            Support
          </h4>
          <ul className="space-y-4">
            {[
              { label: "Contact Support", to: "/contact" },
              { label: "Track Order", to: "/profile/my-orders" },
              { label: "Care Instructions", to: "/care-guide" },
              { label: "FAQs", to: "/faq" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  className="text-surface/80 hover:text-surface transition-colors duration-200 inline-block font-sans text-base"
                  to={item.to}
                  onMouseEnter={handleLinkEnter}
                  onMouseLeave={handleLinkLeave}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="font-sans text-tertiary mb-6 uppercase tracking-widest text-sm font-semibold">
            Newsletter
          </h4>
          <p className="font-sans text-base text-surface/80 mb-6 leading-relaxed">
            Receive updates on new collections and special spiritual occasions.
          </p>
          <form
            className="flex border-b border-tertiary/30 pb-2 transition-colors focus-within:border-tertiary mb-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="bg-transparent border-none focus:outline-none focus:ring-0 text-surface placeholder:text-surface/80 flex-1 font-sans text-base"
              placeholder="Your Email Address"
              type="email"
            />
            <button
              className="text-tertiary hover:text-primary transition-colors"
              type="submit"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </button>
          </form>
        </div>
      </div>

      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 pt-8 border-t border-tertiary/10 mt-12 flex justify-center text-center">
        <p className="font-sans text-base tracking-wider text-surface/80">
          ©️ 2026 Krishna Vasanam. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
