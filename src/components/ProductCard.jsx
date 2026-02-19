import StarRating from "./StarRating"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

export default function ProductCard({ product }) {
    const {dispatch} = useContext(CartContext)

    function handleAddToCart(){
        dispatch({
            type: "ADD_TO_CART",
            payload: product
        })
    }

    return (
        <>
            <div className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>

                <p className="price">₹ {product.price}</p>

                <StarRating rating={product.rating}/>

                <button onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </>
    )
}