import React from "react";

const Day =(props)=>{
    return(
        <div className="weather">
            <div>Highs{props.high}</div>
            <div>Lows{props.low}</div>
            <div>Chance Of Rain{props.chance}%</div>
        </div>
    )
}
export default Day;