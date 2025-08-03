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
    console.log("Mounted App", window.Telegram);

    const tg = window?.Telegram?.WebApp;
    if (!tg) {
      console.warn("Telegram WebApp is not available.");
      return;
    }

    try {
      tg.ready();
      tg.requestFullscreen?.();
      tg.disableVerticalSwipes?.();
      console.log("Telegram WebApp initialized");
    } catch (e) {
      console.error("Telegram WebApp error:", e);
    }

    return () => {
      tg.close?.();
    };
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
