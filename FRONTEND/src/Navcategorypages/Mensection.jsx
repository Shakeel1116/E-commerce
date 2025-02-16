import React, { useState } from "react";
import Mendata from "../Data/Mendata";
import { Link } from "react-router-dom";

const Mensection = () => {
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

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value];

      return { ...prevFilters, [filterType]: updatedFilter };
    });
  };

  if (!Mendata || !Array.isArray(Mendata.mens_clothing)) {
    return <p>Loading data...</p>;
  }

  // Filtering logic
  const filteredItems = Mendata.mens_clothing.filter((item) => {
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
      !selectedFilters.colors.includes(item.color)
    ) {
      return false;
    }
    if (
      selectedFilters.sizeFit.length > 0 &&
      !item.size.some((size) => selectedFilters.sizeFit.includes(size))
    ) {
      return false;
    }
    if (
      selectedFilters.price.length > 0 &&
      !selectedFilters.price.some((range) => {
        if (range === "under500") return item.price < 500;
        if (range === "500-1000") return item.price >= 500 && item.price <= 1000;
        if (range === "above1000") return item.price > 1000;
        return false;
      })
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="mens-section">
      <div className="filters">
        {/* Category Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("category")}>
            Category {openFilters.category ? "−" : "+"}
          </button>
          {openFilters.category && (
            <div className="filter-content">
              {["T-Shirts", "Shirts", "Jeans", "Hoodies", "Shoes", "Jackets"].map((cat) => (
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
              {["under500", "500-1000", "above1000"].map((priceRange) => (
                <label key={priceRange}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("price", priceRange)}
                    checked={selectedFilters.price.includes(priceRange)}
                  />
                  {priceRange === "under500" ? "Under ₹500" : priceRange === "500-1000" ? "₹500 - ₹1000" : "Above ₹1000"}
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
              {["Nike", "Arrow", "Levi's", "Adidas", "Puma", "Zara"].map((brand) => (
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
              {["Black", "White", "Blue", "Grey", "Brown"].map((color) => (
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
              {["S", "M", "L", "XL", "XXL", "30", "32", "34", "36"].map((size) => (
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
            <div key={item.id} className="Menclothing">
              <Link to={`/mensp/${item.id}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <p>{item.name}</p>
              <p>Price: {item.currency} {item.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Mensection;
