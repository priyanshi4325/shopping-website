import { useReducer, useEffect } from "react";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import ProductCard from "../components/ProductCard";

export default function Home() {

    const initialState = {
        loading: true,
        error: null,
        products: [],
        searchTerm: "",
        sortOption: "",
        category: "all",
        minRating: 0
    };

    function reducer(state, action) {
        switch (action.type) {

            case "FETCH_SUCCESS":
                return {
                    ...state,
                    products: action.payload,
                    loading: false
                }

            case "FETCH_ERROR":
                return {
                    ...state,
                    error: action.payload,
                    loading: false
                }

            case "SET_SEARCH":
                return {
                    ...state, searchTerm: action.payload
                }

            case "SET_CATEGORY":
                return {
                    ...state, category: action.payload
                }

            case "SET_SORT":
                return {
                    ...state, sortOption: action.payload
                }

            case "SET_RATING":
                return {
                    ...state, minRating: action.payload
                }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { loading, error, products, searchTerm, sortOption, category, minRating } = state;


    const apiLink = "https://dummyjson.com/products"

    const fetchAPI = async () => {
        try {
            const res = await fetch(apiLink)
            const data = await res.json()

            setTimeout(() => {

                dispatch({ type: "FETCH_SUCCESS", payload: data.products })

            }, 3000)

        }

        catch (error) {
            dispatch({ type: "FETCH_ERROR", payload: error.message })
        }
    };

    useEffect(() => {
        fetchAPI()
    }, [])

    if (loading) return <Loader />
    if (error) return <ErrorState />

    let filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (category != "all") {
        filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    filteredProducts = filteredProducts.filter((product) => product.rating >= minRating)

    if (sortOption === "priceLow") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
    }

    if (sortOption === "priceHigh") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
    }

    return (
        <>
            <div className="page-container">

                <div className="filter-bar">
                    <input type="text"
                        className="search-input"
                        placeholder="Search products here..."
                        value={searchTerm}
                        onChange={(e) => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            dispatch({ type: "SET_CATEGORY", payload: e.target.value })
                        }
                    >
                        <option value="all">All Categories</option>
                        <option value="beauty">Beauty</option>
                        <option value="fragrances">Fragrances</option>
                        <option value="skincare">Skincare</option>
                    </select>

                    <select
                        value={sortOption}
                        onChange={(e) =>
                            dispatch({ type: "SET_SORT", payload: e.target.value })
                        }
                    >
                        <option value="">Sort By</option>
                        <option value="priceLow">Price: Low → High</option>
                        <option value="priceHigh">Price: High → Low</option>
                    </select>

                    <select
                        value={minRating}
                        onChange={(e) =>
                            dispatch({ type: "SET_RATING", payload: Number(e.target.value) })
                        }
                    >
                        <option value={0}>All Ratings</option>
                        <option value={3}>3 ⭐ & up</option>
                        <option value={4}>4 ⭐ & up</option>
                    </select>
                </div>

                <div className="product-grid">
                    {filteredProducts.map((item) => (
                        <ProductCard key={item.id} product={item} />
                    )
                    )}
                </div>
                {filteredProducts.length === 0 && (
                    <p style={{ textAlign: "center", marginTop: "2rem" }}>
                        No products found 😕
                    </p>
                )}
            </div>
        </>
    )
}

