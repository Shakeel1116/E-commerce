import React, { useState } from "react";
import WomensWear from "../Data/Women";
import { Link } from "react-router-dom";

const WomensSection = () => {
  const [openFilters, setOpenFilters] = useState({
    category: false,
    price: false,
    brands: false,
    colors: false,
    sizeFit: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: [],
    brands: [],
    colors: [],
    sizeFit: [],
  });

  // Toggle filter visibility
  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  // Handle checkbox selection
  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  if (!WomensWear || !Array.isArray(WomensWear)) {
    return <p>Loading data...</p>; // Fallback UI
  }

  // Filtering logic
  const filteredItems = WomensWear.filter((item) => {
    if (
      selectedFilters.category.length > 0 &&
      !selectedFilters.category.includes(item.category)
    ) {
      return false;
    }

    if (
      selectedFilters.brands.length > 0 &&
      !selectedFilters.brands.includes(item.brand)
    ) {
      return false;
    }

    if (
      selectedFilters.colors.length > 0 &&
      !selectedFilters.colors.some((color) => item.colors.includes(color))
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="womens-section">
  

      {/* Filters Section */}
      <div className="filters">
        {/* Category Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("category")}>
            Category {openFilters.category ? "−" : "+"}
          </button>
          {openFilters.category && (
            <div className="filter-content">
              {["Dresses", "Tops", "Jeans", "Skirts", "Jackets", "Footwear"].map((cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("category", cat)}
                    checked={selectedFilters.category.includes(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("price")}>
            Price {openFilters.price ? "−" : "+"}
          </button>
          {openFilters.price && (
            <div className="filter-content">
              {["under1000", "1000-2000", "above2000"].map((range) => (
                <label key={range}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("price", range)}
                    checked={selectedFilters.price.includes(range)}
                  />
                  {range === "under1000"
                    ? "Under ₹1000"
                    : range === "1000-2000"
                    ? "₹1000 - ₹2000"
                    : "Above ₹2000"}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Brands Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("brands")}>
            Brands {openFilters.brands ? "−" : "+"}
          </button>
          {openFilters.brands && (
            <div className="filter-content">
              {["Zara", "H&M", "Levi's", "Forever 21", "Biba"].map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("brands", brand)}
                    checked={selectedFilters.brands.includes(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Colors Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("colors")}>
            Colors {openFilters.colors ? "−" : "+"}
          </button>
          {openFilters.colors && (
            <div className="filter-content">
              {["Red", "Blue", "Black", "White", "Pink"].map((color) => (
                <label key={color}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("colors", color)}
                    checked={selectedFilters.colors.includes(color)}
                  />
                  {color}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Size Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("sizeFit")}>
            Size & Fit {openFilters.sizeFit ? "−" : "+"}
          </button>
          {openFilters.sizeFit && (
            <div className="filter-content">
              {["S", "M", "L", "XL"].map((size) => (
                <label key={size}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("sizeFit", size)}
                    checked={selectedFilters.sizeFit.includes(size)}
                  />
                  {size}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Display Products */}
      <div className="Herosection">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="Womenclothing">
              <Link to={`/womenp/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <p>{item.name}</p>
              <p>Price: {item.currency} {item.price}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default WomensSection;
