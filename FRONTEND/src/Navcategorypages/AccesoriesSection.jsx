import React, { useState } from 'react';
import Accessoriesdata from '../Data/Accessories';
import { Link } from 'react-router';

const AccesoriesSection = () => {
  const [openFilters, setOpenFilters] = useState({
    category: false,
    price: false,
    brands: false,
    colors: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: [],
    brands: [],
    colors: [],
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

  if (!Accessoriesdata || !Array.isArray(Accessoriesdata.accessories)) {
    return <p>Loading ...</p>;
  }

  const filteredItems = Accessoriesdata.accessories.filter((item) => {
    if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(item.brand)) {
      return false;
    }
    if (selectedFilters.colors.length > 0 && !selectedFilters.colors.some((color) => item.color.includes(color))) {
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
    if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(item.category)) {
      return false;
    }
    return true;
  });

  return (
    <div className='Accesories-section'>
      <div className='filters'>
        <div className='filter-item'>
          <button onClick={() => toggleFilter("category")}>Category {openFilters.category ? "−" : "+"}</button>
          {openFilters.category && (
            <div className='filter-content'>
              {["Wallets", "Eyewear", "Watches", "Bags", "Belts", "Ties", "Cufflinks", "Gloves"].map((cat) => (
                <label key={cat}>
                  <input
                    type='checkbox'
                    onChange={() => handleCheckboxChange("category", cat)}
                    checked={selectedFilters.category.includes(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className='filter-item'>
          <button onClick={() => toggleFilter("price")}>Price {openFilters.price ? "−" : "+"}</button>
          {openFilters.price && (
            <div className='filter-content'>
              {["under1000", "1000-2000", "above2000"].map((range) => (
                <label key={range}>
                  <input
                    type='checkbox'
                    onChange={() => handleCheckboxChange("price", range)}
                    checked={selectedFilters.price.includes(range)}
                  />
                  {range === "under1000" ? "Under ₹1000" : range === "1000-2000" ? "₹1000 - ₹2000" : "Above ₹2000"}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className='filter-item'>
          <button onClick={() => toggleFilter("brands")}>Brands {openFilters.brands ? "−" : "+"}</button>
          {openFilters.brands && (
            <div className='filter-content'>
              {["Tommy Hilfiger", "Ray-Ban", "Fossil", "Wildcraft", "Allen Solly", "Apple", "Park Avenue", "Mont Blanc", "Harley-Davidson", "Samsonite"].map((brand) => (
                <label key={brand}>
                  <input
                    type='checkbox'
                    onChange={() => handleCheckboxChange("brands", brand)}
                    checked={selectedFilters.brands.includes(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          )}
        </div>

        <div className='filter-item'>
          <button onClick={() => toggleFilter("colors")}>Colors {openFilters.colors ? "−" : "+"}</button>
          {openFilters.colors && (
            <div className='filter-content'>
              {["Black", "Brown", "Blue", "Silver", "Gold", "Red", "White", "Grey"].map((color) => (
                <label key={color}>
                  <input
                    type='checkbox'
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

      <div className='Herosection'>
        {filteredItems.map((Accessoriesitem) => (
          <div key={Accessoriesitem.id} className='Accessories'>
            <Link to={`/acesoriesdetailsp/${Accessoriesitem.id}`}>
              <img src={Accessoriesitem.image || "/images/default.png"} alt={Accessoriesitem.name || "Accessories"} />
            </Link>
            <p>{Accessoriesitem.name}</p>
            <p>Price: {Accessoriesitem.currency} {Accessoriesitem.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccesoriesSection;
