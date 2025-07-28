import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navigation({ styled = false }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Определяем текущую страницу по пути URL
    const getCurrentPage = () => {
        const path = location.pathname;
        if (path.startsWith("/")) return "homepage";
        if (path.startsWith("/catalog")) return "catalog";
        if (path.startsWith("/cart")) return "cart";
        if (path.startsWith("/profile")) return "profile";
        return "homepage";
    };

    return (
        <div
            className={
                !styled
                    ? "w-full h-[60px] pb-9 flex justify-between items-center fixed bottom-1 bg-white z-10 pt-5"
                    : "w-[100vw] h-[60px] pb-9 flex justify-between items-center bg-white z-10"
            }
            style={{ borderTop: "1px solid #f2dddf" }}
        >
            {/* Homepage */}
            <div className="flex justify-center items-center w-[100%]">
                <img
                    className="w-[28px] cursor-pointer"
                    src={
                        getCurrentPage() === "homepage"
                            ? "/images/icons/home_active.png"
                            : "/images/icons/home.png"
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
                        getCurrentPage() === "catalog"
                            ? "/images/icons/catalog_active.png"
                            : "/images/icons/catalog.png"
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
                        getCurrentPage() === "cart"
                            ? "/images/icons/cart_active.png"
                            : "/images/icons/cart.png"
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
                        getCurrentPage() === "profile"
                            ? "/images/icons/profile_active.png"
                            : "/images/icons/profile.png"
                    }
                    onClick={() => navigate("/profile")}
                    alt="Profile Icon"
                />
            </div>
        </div>
    );
}

export default Navigation;