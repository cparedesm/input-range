import React, { useEffect } from "react"
import { useState } from "react/cjs/react.development";
import FixedRange from "../components/InputRange/js/FixedRange";

const Exercise2 = () => {
  const [range, setRange] = useState({});
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/fixed-range');
      const data = await response.json();
      setRange(data);
    } catch (err) {
      setHasError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [])
  
  return(
    <>
      { loading ?
          <div>Loading...</div> :
          hasError ?
            <div>Ha ocurrido un error recuperando los datos!</div> :
            <FixedRange range={range.values} />
      }
    </>
  )
}

export default Exercise2;