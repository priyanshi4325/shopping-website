import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {

  const {state} = useContext(CartContext)

  return (
    <nav className="navbar navbar-dark bg-dark px-4 d-flex justify-content-between">
      <Link to="shopping-website" className="navbar-brand text-white text-decoration-none">
        🛍️ ShopEasy
      </Link>
      <Link to="shopping-website/cart" className="text-white text-decoration-none">
        🛒 Cart ({state.cartItems.length})
      </Link>
    </nav>
  );
}

export default Navbar;