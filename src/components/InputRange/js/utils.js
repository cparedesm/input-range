export const getPositionFromEvent = (event, rect) => {
  const { clientX } = event;
  const { width, left } = rect;
  const trackPosition = clientX - left;
  return Math.min(Math.max(trackPosition, 0), width);
}

export const getValueFromPosition = (pos, min, max, rect) => {
  const perc = pos / rect.width;
  const diff = max - min;
  const value = min + (diff * perc);

  return Math.round(value);
}

export const getPercFromValue = (value, min, max) => {
  const diff = max - min;
  return (value - min) / diff * 100;
}