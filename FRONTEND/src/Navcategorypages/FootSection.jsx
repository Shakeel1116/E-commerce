import React, { useState } from "react";
import footweardata from "../Data/footwear";
import { Link } from "react-router-dom";

const FootSection = () => {
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

  if (!footweardata || !Array.isArray(footweardata.footwear)) {
    return <p>Loading data...</p>;
  }

  // Filter logic
  const filteredItems = footweardata.footwear.filter((item) => {
    if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(item.category)) {
      return false;
    }
    if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(item.brand)) {
      return false;
    }
    if (selectedFilters.colors.length > 0 && !selectedFilters.colors.some((color) => item.color.includes(color))) {
      return false;
    }
    if (selectedFilters.sizeFit.length > 0 && !selectedFilters.sizeFit.some((size) => item.size.includes(size))) {
      return false;
    }
    if (
      selectedFilters.price.length > 0 &&
      !selectedFilters.price.some((range) => {
        if (range === "under1000") return item.price < 1000;
        if (range === "1000-2000") return item.price >= 1000 && item.price <= 2000;
        if (range === "above2000") return item.price > 2000;
        return false;
      })
    ) {
      return false;
    }
    return true;
  });
  
  return (
    <div className="footwear-section">
      <div className="filters">
        {/** Category Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("category")}>Category {openFilters.category ? "−" : "+"}</button>
          {openFilters.category && (
            <div className="filter-content">
              {["Sneakers", "Loafers", "Boots", "Sandals"].map((cat) => (
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

        {/** Price Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("price")}>Price {openFilters.price ? "−" : "+"}</button>
          {openFilters.price && (
            <div className="filter-content">
              {["under1000", "1000-2000", "above2000"].map((priceRange) => (
                <label key={priceRange}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxChange("price", priceRange)}
                    checked={selectedFilters.price.includes(priceRange)}
                  />
                  {priceRange === "under1000" ? "Under ₹1000" : priceRange === "1000-2000" ? "₹1000 - ₹2000" : "Above ₹2000"}
                </label>
              ))}
            </div>
          )}
        </div>

        {/** Brands Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("brands")}>Brands {openFilters.brands ? "−" : "+"}</button>
          {openFilters.brands && (
            <div className="filter-content">
              {["Nike", "Adidas", "Puma", "Reebok"].map((brand) => (
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

        {/** Colors Filter */}
        <div className="filter-item">
          <button onClick={() => toggleFilter("colors")}>Colors {openFilters.colors ? "−" : "+"}</button>
          {openFilters.colors && (
            <div className="filter-content">
              {["Black", "White", "Blue", "Brown"].map((color) => (
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
      </div>

      {/** Display Products */}
      <div className="Herosection">
        {filteredItems.length > 0 ? (
          filteredItems.map((footwearitem) => (
            <div key={footwearitem.id} className="footwear">
              <Link to={`/footsp/${footwearitem.id}`}>
                <img src={footwearitem.image || "/images/default.png"} alt={footwearitem.name || "Foot Wear"} />
              </Link>
              <p>{footwearitem.name}</p>
              <p>Price: {footwearitem.currency} {footwearitem.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default FootSection;
