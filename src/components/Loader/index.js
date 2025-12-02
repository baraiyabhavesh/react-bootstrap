import GlobalContext from "@/context/GlobalContext";
import { useContext } from "react";
export const Loader = () => {
    const {
        themeSwitcher
    } = useContext(GlobalContext || {});

    const renderLoader = () => {
        if (themeSwitcher.loader === "cubes") {
            return (<div className="cssload-thecube">
                <div className="cssload-cube cssload-c1"></div>
                <div className="cssload-cube cssload-c2"></div>
                <div className="cssload-cube cssload-c4"></div>
                <div className="cssload-cube cssload-c3"></div>
            </div>)
        }
        else if (themeSwitcher.loader === "cubeProgress") {
            return (<span className="cssload-cube-progress">
                <span className="cssload-cube-progress-inner"></span>
            </span>)
        }
        else if (themeSwitcher.loader === "floatRings") {
            return (<div className="cssload-float-rings-loader">
                <div className="cssload-float-rings-inner cssload-one"></div>
                <div className="cssload-float-rings-inner cssload-two"></div>
                <div className="cssload-float-rings-inner cssload-three"></div>
            </div>)
        }
        else if (themeSwitcher.loader === "floatBars") {
            return (<div className="cssload-float-bars-container">
                <ul className="cssload-float-bars-flex-container">
                    <li><span className="cssload-float-bars-loading"></span></li>
                </ul>
            </div>)
        }
        else if (themeSwitcher.loader === "speedingWheel") {
            return (<div className="cssload-speeding-wheel-container">
                <div className="cssload-speeding-wheel"></div>
            </div>)
        }
        else if (themeSwitcher.loader === "zenith") {
            return (<div className="cssload-zenith-container">
                <div className="cssload-zenith"></div>
            </div>)
        }
        else if (themeSwitcher.loader === "spinningSquare") {
            return (<div className="bounce-loader">
                <div className="cssload-spinning-square-loading"></div>
            </div>)
        }
        else if (themeSwitcher.loader === "pulse") {
            return (<div className="wrapper-pulse">
                <div className="cssload-pulse-loader"></div>
            </div>)
        }
        else {
            return (<><div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div></>)
        }
    }

    return (
        <div className="loading-overlay">
            <div className="bounce-loader">
                {
                    renderLoader()
                }
            </div>
        </div>
    )
   
}

export default Loader;