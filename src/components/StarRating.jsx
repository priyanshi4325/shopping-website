import ProductCard from "./ProductCard";

export default function StarRating({rating}){
    const totalStars = 5;
    const filledStars = Math.round(rating);

    return(
        <>
        <div className="star-rating">
            {[...Array(totalStars)].map((_,index) => (
                <span key={index}>
                    {index<filledStars ? "⭐" : "☆"}

                </span>
            )) }
            <span className="rating-number">({rating})</span>
        </div>
        </>
    )
}