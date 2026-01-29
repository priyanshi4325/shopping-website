import StarRating from "./StarRating"

export default function ProductCard({ product }) {
    return (
        <>
            <div className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>

                <p className="price">₹ {product.price}</p>

                <StarRating rating={product.rating}/>

                <button disabled={product.stock === 0}>
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
            </div>
        </>
    )
}