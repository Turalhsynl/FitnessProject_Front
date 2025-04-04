import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FilterSort = ({ setSelectedCategory, setSortBy, categories, colors, onColorSelect }) => {
  const [openSections, setOpenSections] = useState({
    sortBy: false,
    productType: false,
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedColorId, setSelectedColorId] = useState(null);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    setSelectedCategory(selectedCategoryId);
  }, [selectedCategoryId, setSelectedCategory]);

  const handleSortChange = (value) => {
    setSelectedSort(value);
    setSortBy(value === "price-asc" ? 0 : value === "price-desc" ? 1 : value);
  };

  const handleColorClick = (colorId) => {
    const newColorId = selectedColorId === colorId ? null : colorId;
    setSelectedColorId(newColorId);
    onColorSelect(newColorId);
  };

  return (
    <div className="w-64 p-4 bg-white text-sm mt-20">
      {/* Sort By */}
      <div>
        <button
          onClick={() => toggleSection("sortBy")}
          className="w-full flex justify-between items-center font-bold py-2"
        >
          SORT BY
          <ChevronDown
            className={`w-4 h-4 transition-transform ${openSections.sortBy ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.sortBy && (
          <div className="space-y-2 mt-2">
            {[{ value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" }].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="hidden"
                />
                <span className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center">
                  {selectedSort === option.value && <span className="w-2 h-2 bg-black rounded-full"></span>}
                </span>
                {option.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Product Type */}
      <div className="mt-4">
        <button
          onClick={() => toggleSection("productType")}
          className="w-full flex justify-between items-center font-bold py-2"
        >
          PRODUCT TYPE
          <ChevronDown
            className={`w-4 h-4 transition-transform ${openSections.productType ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.productType && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategoryId === 0}
                onChange={() => setSelectedCategoryId(0)}
                className="hidden"
              />
              <span className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center">
                {selectedCategoryId === 0 && <span className="w-2 h-2 bg-black rounded-full"></span>}
              </span>
              All Categories
            </label>

            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategoryId === category.id}
                  onChange={() => setSelectedCategoryId(category.id)}
                  className="hidden"
                />
                <span className="w-4 h-4 border-2 border-black rounded-full flex items-center justify-center">
                  {selectedCategoryId === category.id && <span className="w-2 h-2 bg-black rounded-full"></span>}
                </span>
                {category.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mt-4">
        <button
          onClick={() => toggleSection("colors")}
          className="w-full flex justify-between items-center font-bold py-2"
        >
          COLORS
          <ChevronDown
            className={`w-4 h-4 transition-transform ${openSections.colors ? "rotate-180" : ""}`}
          />
        </button>

        {openSections.colors && (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {colors.map((color) => (
              <div key={color.id} className="flex flex-col items-center">
                <button
                  onClick={() => handleColorClick(color.id)}
                  className={`w-14 h-14 rounded-full border-2 transition-transform ${selectedColorId === color.id ? "border-black scale-110" : "border-gray-300"
                    }`}
                  style={{ backgroundColor: color.code }}
                />
                <p
                  onClick={() => handleColorClick(color.id)}
                  className="cursor-pointer mt-2 text-sm"
                >
                  {color.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default FilterSort;
