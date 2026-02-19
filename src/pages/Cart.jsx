import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
    const { state, dispatch } = useContext(CartContext)

    const { cartItems } = state

    if (cartItems.length === 0) {
        return (
            <div className="page-conatainer">
                <h2>Your Cart</h2>
                <p>Your cart is empty 🛒</p>
            </div>
        )
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return (
        <div className="page-conatiner">
            <h2>Your Cart</h2>
            <div className="cart-list">
                {cartItems.map((item, index) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.thumbnail} alt={item.title} />

                        <div className="cart-info">
                            <h4>{item.title}</h4>
                            <p>₹ {item.price}</p>
                            <div className="qty-controls">
                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "DECREASE_QTY",
                                            payload: item.id
                                        })
                                    }
                                >
                                    –
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                    onClick={() =>
                                        dispatch({
                                            type: "INCREASE_QTY",
                                            payload: item.id
                                        })
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                            className="remove-btn">Remove</button>
                        
                    </div>
                ))}
                <div className="cart-summary">
                            <h3>Subtotal: ₹ {totalPrice.toFixed(2)}</h3>
                            <p>Total Items: {cartItems.length}</p>
                        </div>
            </div>
        </div>
    )
}