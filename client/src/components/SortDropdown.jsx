import { useState, useRef, useEffect } from 'react';

const SortDropdown = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-transparent border-none font-sans text-sm text-primary focus:outline-none cursor-pointer font-semibold"
      >
        {value}
        <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-surface border border-tertiary/20 rounded-md shadow-lg z-50 overflow-hidden animate-fadeIn">
          <ul className="flex flex-col py-1">
            {options.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onChange({ target: { value: option } });
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 font-sans text-sm hover:bg-surface-container-low transition-colors ${
                    value === option ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface-variant'
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
