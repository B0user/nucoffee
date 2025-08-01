import React from 'react';
import { Routes, Route } from "react-router-dom";
import { FiltersProvider } from "./context/FiltersContext";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";
import {useEffect} from "react";

import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";


function App() {
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.requestFullscreen?.();
      tg.disableVerticalSwipes?.();

      const initData = tg.initData;
      tg.ready();

      return () => {
        tg.close?.(); // Optional clean-up if Telegram supports it
      };
    } else {
      console.warn("Telegram WebApp not available. Are you running outside Telegram?");
    }
  }, []);

  return (
    <CartProvider>
      <FiltersProvider>
        <div className="App flex justify-center items-center">
          <Routes>

            {/* Страницы с навигацией */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage/>} />
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/catalog" element={<CatalogPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
            </Route>
          </Routes>
        </div>
      </FiltersProvider>
    </CartProvider>
  );
}

export default App;
