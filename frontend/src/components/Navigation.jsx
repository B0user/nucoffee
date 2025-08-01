import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation({ styled = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Определяем текущую страницу по пути URL
    const getCurrentPage = () => {
        const path = location.pathname;
        if (path === "/" || path === "/home") return "homepage";
        if (path === "/catalog") return "catalog";
        if (path === "/cart") return "cart";
        if (path === "/profile") return "profile";
        return "homepage";
    };

    const currentPage = getCurrentPage();

    return (
        <div
            className={
                !styled
                    ? "w-full h-[60px] pb-9 flex justify-between items-center fixed bottom-0 bg-white z-10 pt-5"
                    : "w-[100vw] h-[60px] pb-9 flex justify-between items-center bg-white z-10"
            }
            style={{ borderTop: "1px solid #f2dddf" }}
        >
            {/* Homepage */}
            <div className="flex justify-center items-center w-[100%]">
                <img
                    className="w-[28px] cursor-pointer"
                    src={
                        currentPage === "homepage"
                            ? "/images/icons/nav-home-active.svg"
                            : "/images/icons/nav-home.svg"
                    }
                    onClick={() => navigate("/")}
                    alt="Home Icon"
                />
            </div>

            {/* Catalog */}
            <div className="flex justify-center items-center w-[100%]">
                <img
                    className="w-[28px] cursor-pointer"
                    src={
                        currentPage === "catalog"
                            ? "/images/icons/nav-catalog-active.svg"
                            : "/images/icons/nav-catalog.svg"
                    }
                    onClick={() => navigate("/catalog")}
                    alt="Catalog Icon"
                />
            </div>

            {/* Cart */}
            <div className="flex justify-center items-center w-[100%]">
                <img
                    className="w-[28px] cursor-pointer"
                    src={
                        currentPage === "cart"
                            ? "/images/icons/nav-cart-active.svg"
                            : "/images/icons/nav-cart.svg"
                    }
                    onClick={() => navigate("/cart")}
                    alt="Cart Icon"
                />
            </div>

            {/* Profile */}
            <div className="flex justify-center items-center w-[100%]">
                <img
                    className="w-[28px] cursor-pointer"
                    src={
                        currentPage === "profile"
                            ? "/images/icons/nav-profile-active.svg"
                            : "/images/icons/nav-profile.svg"
                    }
                    onClick={() => navigate("/profile")}
                    alt="Profile Icon"
                />
            </div>
        </div>
    );
}

export default Navigation;