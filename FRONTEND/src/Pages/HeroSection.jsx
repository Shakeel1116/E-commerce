import React from 'react';
import Mendata from '../Data/Mendata';
import womensWear from '../Data/Women';
import kidswearData from '../Data/Kidsdata';
import footweardata from '../Data/footwear';
import Accessoriesdata from '../Data/Accessories';
import { Link } from 'react-router';

const HeroSection = () => {
  return (
    <div>
      {/* Men's Section */}
      <h3 className='Menswearheading'>MensWear</h3>
      <div className='Herosection'>
        {Mendata?.mens_clothing?.map((item) => (
          <div key={item.id} className='Menclothing'>
            <Link to={`/mens/${item.id}`}>
              <img src={item.image} alt={item.name} />
            </Link>
            <p>{item.name}</p>
            <p>Price: {item.currency} {item.price}</p>
          </div>
        ))}
      </div>

      {/* Women's Section */}
      <h3 className='Womenswearheading'>WomensWear</h3>
      <div className='Herosection'>
        {womensWear?.map((item) => (
          <div key={item.id} className='Womenclothing'>
            <Link to={`/women/${item.id}`}>
              <img src={item.image} alt={item.name} />
            </Link>
            <p>{item.name}</p>
            <p>Price: {item.currency} {item.price}</p>
          </div>
        ))}
      </div>

      {/* Kids' Section */}
      <h3 className='kidswearheading'>KidsWear</h3>
      <div className='Herosection'>
        {kidswearData?.kids_wear?.map((kidsitem) => (
          <div key={kidsitem.id} className='kidsclothing'>
            <Link to={`/kids/${kidsitem.id}`}>
              <img src={kidsitem.image || "/images/default.png"} alt={kidsitem.name || "Kids Wear"} />
            </Link>
            <p>{kidsitem.name}</p>
            <p>Price: {kidsitem.currency} {kidsitem.price}</p>
          </div>
        ))}
      </div>

      {/* Footwear Section */}
      <h3 className='footwearheading'>Footwear</h3>
      <div className='Herosection'>
        {footweardata?.footwear?.map((footwearitem) => (
          <div key={footwearitem.id} className='footwear'>
            <Link to={`/foots/${footwearitem.id}`}>
              <img src={footwearitem.image || "/images/default.png"} alt={footwearitem.name || "Foot Wear"} />
            </Link>
            <p>{footwearitem.name}</p>
            <p>Price: {footwearitem.currency} {footwearitem.price}</p>
          </div>
        ))}
      </div>

      {/* Accessories Section */}
      <h3 className='Accesoriesheading'>Accessories</h3>
      <div className='Herosection'>
        {Accessoriesdata?.accessories?.map((Accessoriesitem) => (
          <div key={Accessoriesitem.id} className='Accessories'>
            <Link to={`/acesoriesdetails/${Accessoriesitem.id}`}>
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

export default HeroSection;
