import React from 'react'
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
   
  return (
    <div style={{marginTop:'150px'}}>
      <div className="sweet-loading text-center">
      

      <HashLoader
        color='#000'
        loading={loading}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  )
}

export default Loader