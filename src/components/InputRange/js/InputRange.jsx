import React, { useRef, useState } from "react";
import "../styles/InputRange.scss";
import Bullet from "./Bullet";
import { getPercFromValue, getPositionFromEvent, getValueFromPosition } from "./utils";

const InputRange = ({min, max}) => {
  const tracker = useRef();

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [value, setValue] = useState({left: minValue, right: maxValue});


  const updatePosition = (event, bulletPos) => {
    requestAnimationFrame(() => {
      const rect = tracker.current.getBoundingClientRect();
      const position = getPositionFromEvent(event, rect);
      const newValue = getValueFromPosition(position, minValue, maxValue, rect);
      const { right, left } = { ...value, [bulletPos]: newValue };

      if (left >= right || right <= left) {
        return;
      }
      setValue({...value, [bulletPos]: newValue});
    })
  }

  const handleChangeMin = (event) => {
    const newValue = event.target.value || 0;
    const isNumber = /^[0-9\b]+$/.test(newValue);
    if (!isNumber) {
      return;
    }
    const numValue = parseInt(newValue, 10);
    const isGreaterThanMax = numValue >= maxValue;
    const isGreaterThanRight = numValue >= value.right;
    if (isGreaterThanMax || isGreaterThanRight) {
      return;
    }
    

    const isGreaterThanLeft = numValue >= value.left;
    if (isGreaterThanLeft) {
      setValue({...value, left: numValue});
    }

    setMinValue(numValue);
  }

  const handleChangeMax = (event) => {
    const newValue = event.target.value || 0;
    const isNumber = /^[0-9\b]+$/.test(newValue);
    if (!isNumber) {
      return;
    }
    const numValue = parseInt(newValue, 10);
    const isSmallerThanMin = numValue <= minValue;
    const isSmallerThanLeft = numValue <= value.left;
    if (isSmallerThanMin || isSmallerThanLeft) {
      return;
    }
    
    const isSmallerThanRight = numValue <= value.right;
    if (isSmallerThanRight) {
      setValue({...value, right: numValue});
    }

    setMaxValue(numValue);
  }

  return(
    <div className="input-container">
      <input className="input" type="text" value={minValue} onChange={handleChangeMin} />
      <div className="input-range">
        <div className="tracker" ref={tracker}>
          <Bullet value={value.left} perc={getPercFromValue(value.left, minValue, maxValue)} onBulletDrag={(e) => updatePosition(e, 'left')} />
          <Bullet value={value.right} perc={getPercFromValue(value.right, minValue, maxValue)} onBulletDrag={(e) => updatePosition(e, 'right')} />
        </div>
      </div>
      <input className="input" type="text" value={maxValue} onChange={handleChangeMax} />
    </div>
  )
}

export default InputRange;