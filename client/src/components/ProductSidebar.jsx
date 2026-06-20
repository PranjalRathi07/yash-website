const ProductSidebar = ({
  categories,
  selectedCategories,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sizes,
  selectedSizes,
  onSizeChange,
}) => {
  return (
    <aside className="w-full lg:w-64 shrink-0 bg-surface-container-low border-[0.5px] border-tertiary/20 rounded-md p-8 lg:sticky lg:top-28 z-10">
      <div className="mb-8 pb-8 border-b-[0.5px] border-tertiary/20">
        <h3 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6">
          Categories
        </h3>

        <ul className="space-y-4">
          {categories.map((c) => (
            <li key={c}>
              <label className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(c)}
                    onChange={() => onCategoryChange(c)}
                    className="peer appearance-none w-5 h-5 border-[1.5px] border-tertiary/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer"
                  />
                  <span className="material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none">
                    check
                  </span>
                </div>
                <span className="font-sans text-sm text-on-surface-variant group-hover:text-primary transition-colors">
                  {c}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 pb-8 border-b-[0.5px] border-tertiary/20">
        <h3 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6">
          Price
        </h3>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-full bg-surface border-b border-tertiary/30 font-sans text-sm text-on-surface focus:outline-none focus:border-primary py-2 px-1 transition-colors placeholder:text-on-surface-variant/50"
            />
            <span className="text-on-surface-variant/50">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full bg-surface border-b border-tertiary/30 font-sans text-sm text-on-surface focus:outline-none focus:border-primary py-2 px-1 transition-colors placeholder:text-on-surface-variant/50"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6">
          Size (Inches)
        </h3>
        <div className="flex flex-wrap gap-3">
          {sizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSizeChange(size)}
                className={`px-4 py-2 border-[0.5px] rounded-full font-sans text-xs transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-surface"
                    : "border-tertiary/30 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default ProductSidebar;
