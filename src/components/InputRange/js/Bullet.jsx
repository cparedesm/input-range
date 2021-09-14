import React, { useRef, useState } from "react";

const Bullet = ({value, perc, onBulletDrag}) => {
  const node = useRef();

  const [isActive, setIsActive] = useState(false);

  const addMouseListeners = () => {
    const { ownerDocument } = node.current;
    ownerDocument.addEventListener("mousemove", onBulletDrag);
    ownerDocument.addEventListener("mouseup", removeMouseListeners);
    setIsActive(true);
  }

  const removeMouseListeners = () => {
    const { ownerDocument } = node.current;
    ownerDocument.removeEventListener("mousemove", onBulletDrag);
    ownerDocument.removeEventListener("mouseup", removeMouseListeners);
    setIsActive(false);
  }

  return(
    <span className="handler" draggable="false" ref={node} style={{left: `${perc}%`}}>
      <div data-testid="bullet" className={`bullet ${isActive ? 'active' : ''}`} onMouseDown={addMouseListeners} />
      <span className="label">{ value }</span>
    </span>
  )
}

export default Bullet;