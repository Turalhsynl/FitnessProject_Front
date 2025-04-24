import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const FilterSort = ({ setSelectedCategory, setSortBy, categories, colors, onColorSelect, ascOrder, setPage }) => {
  const [openSections, setOpenSections] = useState({
    sortBy: false,
    productType: false,
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedColorIds, setSelectedColorIds] = useState([]); // Array olaraq dəyişdirildi

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    setSelectedCategory(selectedCategoryId);
    setPage((prev) => {
      const updatedPage = { ...prev, currentPage: 1 };
      return updatedPage;
    });
  }, [selectedCategoryId, setSelectedCategory]);

  const handleSortChange = (value) => {
    setSelectedSort(value);
    ascOrder(value === "price-asc" ? true : false);
    setSortBy(value === "price-asc" ? 0 : value === "price-desc" ? 1 : value);
  };

  const handleColorClick = (colorId) => {
    setSelectedColorIds((prev) => {
      if (prev.includes(colorId)) {
        // Əgər rəng artıq seçilibsə, array-dən silirik
        return prev.filter((id) => id !== colorId);
      } else {
        // Əks halda, yeni rəngi əlavə edirik
        return [...prev, colorId];
      }
    });
    setPage((prev) => {
      const updatedPage = { ...prev, currentPage: 1 };
      return updatedPage;
    });
  };

  // `onColorSelect` funksiyasını rənglər array-ini ötürmək üçün çağırırıq
  useEffect(() => {
    onColorSelect(selectedColorIds);
  }, [selectedColorIds, onColorSelect]);

  return (
    <div className="w-full sm:w-64 p-4 bg-white text-sm mt-20">
      {/* Sort By */}
      <div>
        <button
          onClick={() => toggleSection("sortBy")}
          className="w-full flex justify-between items-center font-bold py-2 text-xl"
        >
          SORT BY
          <ChevronDown
            className={`w-6 h-6 transition-transform ${openSections.sortBy ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.sortBy && (
          <div className="space-y-2 mt-2">
            {[{ value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" }].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer text-[18px]">
                <input
                  type="radio"
                  name="sort"
                  value={option.value}
                  onChange={() => handleSortChange(option.value)}
                  className="hidden"
                />
                <span className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center">
                  {selectedSort === option.value && <span className="w-3 h-3 bg-black rounded-full"></span>}
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
          className="w-full flex justify-between items-center font-bold py-2 text-xl"
        >
          PRODUCT TYPE
          <ChevronDown
            className={`w-6 h-6 transition-transform ${openSections.productType ? "rotate-180" : ""}`}
          />
        </button>
        {openSections.productType && (
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-[18px]">
              <input
                type="radio"
                name="category"
                checked={selectedCategoryId === 0}
                onChange={() => setSelectedCategoryId(0)}
                className="hidden"
              />
              <span className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center">
                {selectedCategoryId === 0 && <span className="w-3 h-3 bg-black rounded-full"></span>}
              </span>
              All Categories
            </label>

            {categories.map((category) => (
              <label key={category.id} className="flex items-center gap-2 cursor-pointer text-[20px]">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategoryId === category.id}
                  onChange={() => setSelectedCategoryId(category.id)}
                  className="hidden"
                />
                <span className="w-5 h-5 border-2 border-black rounded-full flex items-center justify-center">
                  {selectedCategoryId === category.id && <span className="w-3 h-3 bg-black rounded-full"></span>}
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
          className="w-full flex justify-between items-center font-bold py-2 text-xl"
        >
          COLORS
          <ChevronDown
            className={`w-6 h-6 transition-transform ${openSections.colors ? "rotate-180" : ""}`}
          />
        </button>

        {openSections.colors && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-8">
            {colors.map((color) => (
              <div key={color.id} className="flex flex-col items-center">
                <button
                  onClick={() => handleColorClick(color.id)}
                  className={`w-12 h-12 rounded-full border-2 transition-transform ${selectedColorIds.includes(color.id) ? "border-black scale-105" : "border-gray-300"
                    } hover:scale-110 hover:border-black transform duration-300`}
                  style={{ backgroundColor: color.code }}
                />
                <p
                  onClick={() => handleColorClick(color.id)}
                  className="cursor-pointer mt-2 text-xs sm:text-sm text-center"
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
