import React, { useState } from "react";
import kidswear from "../Data/Kidsdata";
import { Link } from "react-router-dom";

const Kidssection = () => {
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

  const toggleFilter = (filter) => {
    setOpenFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
  };

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  if (!kidswear || !Array.isArray(kidswear.kids_wear)) {
    return <p>Loading data...</p>;
  }

  // Filtering logic
  const filteredItems = kidswear.kids_wear.filter((item) => {
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
      !selectedFilters.colors.some((color) => item.color.includes(color))
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="kids-section">

      {/* Filters Section */}
      <div className="filters">
        {/* Category Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("category")}>
            Category {openFilters.category ? "−" : "+"}
          </button>
          {openFilters.category && (
            <div className="filter-content">
              {["T-Shirts", "Shirts", "Jeans", "Hoodies", "Shoes", "Dresses"].map((cat) => (
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
              {["Babyhug", "Little Kangaroos", "Peppermint", "Carter's", "Nike Kids", "Reebok Kids"].map((brand) => (
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
              {["Red", "Blue", "Black", "White", "Pink", "Grey"].map((color) => (
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

        {/* Size & Fit Filter */}
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
          filteredItems.map((kidsitem) => (
            <div key={kidsitem.id} className="kidsclothing">
              <Link to={`/kidsp/${kidsitem.id}`}>
                <img src={kidsitem.image || "/images/default.png"} alt={kidsitem.name || "Kids Wear"} />
              </Link>
              <p>{kidsitem.name}</p>
              <p>Price: {kidsitem.currency} {kidsitem.price}</p>
            </div>
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default Kidssection;
