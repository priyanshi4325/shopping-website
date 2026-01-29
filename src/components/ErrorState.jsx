import Lottie from "lottie-react";
import errorAnimation from "../assets/error.json"

export default function ErrorState(){
    return(
        <>
        <div className="error-container">
            <div className="lottie-wrapper">
                <Lottie animationData={errorAnimation} loop={true}/>
            </div>
        

        <h2>Oops! Something went wrong 😭 </h2>
        <p>We couldn't load the products. Please try again. 🙇</p>

        <button className="retry-btn" onClick={() => {window.location.reload()}}>Retry</button>
        </div>
        </>
    )
}

