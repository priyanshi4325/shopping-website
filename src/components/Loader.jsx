import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader.json"

export default function Loader(){
    return(
        <>
        <div className="loader-container">
            <div className="lottie-wrapper">
            <Lottie animationData={loaderAnimation} loop={true}/>
            </div><br />
            <h1>Loading Products...</h1><br />
            <h2>Please wait🥺</h2>
        </div>
        </>
    )
}


