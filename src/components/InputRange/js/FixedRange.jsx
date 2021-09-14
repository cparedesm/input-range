import React, { useRef, useState } from "react";
import "../styles/InputRange.scss";
import Bullet from "./Bullet";
import { getPercFromValue, getPositionFromEvent, getValueFromPosition } from "./utils";

const FixedRange = ({ range = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] }) => {
  const tracker = useRef();
  const min = 0;
  const max = range.length - 1;

  const [value, setValue] = useState({left: min, right: max});

  const updatePosition = (event, bulletPos) => {
    requestAnimationFrame(() => {
      const rect = tracker.current.getBoundingClientRect();
      const position = getPositionFromEvent(event, rect);
      const newValue = getValueFromPosition(position, min, max, rect);
      const { right, left } = { ...value, [bulletPos]: newValue };

      if (left >= right || right <= left) {
        return;
      }
      setValue({...value, [bulletPos]: newValue});
    })
  }

  return(
    <div className="input-range">
      <div className="tracker" ref={tracker}>
        <Bullet value={range[value.left]}  perc={getPercFromValue(value.left, min, max)} onBulletDrag={(e) => updatePosition(e, 'left')} />
        <Bullet value={range[value.right]} perc={getPercFromValue(value.right, min, max)} onBulletDrag={(e) => updatePosition(e, 'right')} />
      </div>
    </div>
  )
}

export default FixedRange;