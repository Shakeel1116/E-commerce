import React from 'react';
import './App.css';
import Navbar from './Pages/Navbar';
import { Routes, Route, Router } from 'react-router-dom'; 
import HeroSection from  './Pages/HeroSection';
import FooterSection from './Pages/FooterSection';
import WomensSection from './Navcategorypages/WomensSection';
import Kidssection from './Navcategorypages/Kidssection';
import FootSection from './Navcategorypages/FootSection';
import AccesoriesSection from './Navcategorypages/AccesoriesSection';
import Mendetails from './Details/Mendetails';
import Cart from './Pages/Cart';
import Kidsdetails from './Details/Kidsdetails';
import Accesoriesdetails from './Details/Accesoriesdetails';
import Womendetails from './Details/Womendetails';
import FootwearDetails from './Details/Footweardetails';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import ForgotPassword from './Pages/Forgotpass';
import Shipping from './Pages/Shipping';
import OurOrders from './Pages/Ourorder';
import Mensection from './Navcategorypages/Mensection';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Home Route: Show Hero and Footer only on home page */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FooterSection />
            </>
          }
        />
        <Route path='menswear' element={<Mensection/>}/>
        <Route path="/Womenswear" element={<WomensSection/>} />
        <Route path="/Kidsswear" element={<Kidssection />} />
        <Route path="/Footswear" element={<FootSection />} />
        <Route path='/Accesories' element={<AccesoriesSection/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='Forgotpass' element={<ForgotPassword/>}/>
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path="/our-orders" element={<OurOrders />} />
        {/*products details routes  */}
        <Route path='/mens/:id' element={<Mendetails/>}/>
        <Route path='/women/:id' element={<Womendetails/>}/>
        <Route path='/kids/:id' element={<Kidsdetails/>}/>
        <Route path='/foots/:id' element={<FootwearDetails/>}/>
        <Route path='/acesoriesdetails/:id' element={<Accesoriesdetails/>}/>
        {/*Products details Routes for nav bar catergoies*/}
        <Route path='/mensp/:id' element={<Mendetails/>}/>
        <Route path='/womenp/:id' element={<Womendetails/>}/>
        <Route path='/kidsp/:id' element={<Kidsdetails/>}/>
        <Route path='/footsp/:id' element={<FootwearDetails/>}/>
        <Route path='/acesoriesdetailsp/:id' element={<Accesoriesdetails/>}/>
      </Routes>
    </div>
  );
};

export default App;
