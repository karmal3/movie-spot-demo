import { useState } from "react";

export default function Truncate({ text, length, reff, showLess, handleShowLess }) {
   
    return (
        <div ref={reff}>
            {
                (text?.length < length) ?
                    <p className="max-w-md font-thin font-custom">{text}</p>
                    :
                    <p className="max-w-md font-thin font-custom">
                        {showLess ? `${text?.slice(0, length)}...` : text + " "}
                        {/* <button onClick={() => setShowLess(!showLess)}>[{showLess ? "more" : "less"}]</button> */}
                        <button className="font-thin" onClick={() => handleShowLess()}>{showLess ? "[more]" : null}</button>
                    </p>
            }
        </div>

    )
}
