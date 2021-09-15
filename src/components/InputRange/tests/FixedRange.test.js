import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import { getPositionFromEvent, getValueFromPosition } from '../js/utils';
import FixedRange from '../js/FixedRange';

jest.mock('../js/utils', () => ({
  ...jest.requireActual('../js/utils'),
  getPositionFromEvent: jest.fn(),
  getValueFromPosition: jest.fn(),
}))

getPositionFromEvent.mockImplementation(() => '');
getValueFromPosition.mockImplementation(() => 0);

jest.mock('../js/Bullet', () => {
  return {
    __esModule: true,
    default: ({ value, onBulletDrag }) =>
        <div data-testid="mock-div" onClick={onBulletDrag}>{value}</div>,
  };
});

describe('FixedRange', () => {
  let container, inputMin, inputMax;

  const props = {
    range: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
  }
  
  beforeEach(() => {
    container = render(<FixedRange {...props} />);
    inputMin = container.container.querySelector('#min');
    inputMax = container.container.querySelector('#max');
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb())
  });

  afterAll(() => {
    window.requestAnimationFrame.mockRestore();
  })

  test('should update left bullet value if smaller than right one', () => {
    const value = 4;
    getValueFromPosition.mockReturnValueOnce(value)
    const leftBullet = container.getAllByTestId('mock-div')[0]
    const { getByText } = within(leftBullet);

    fireEvent.click(leftBullet)
    expect(getByText(props.range[value])).toBeInTheDocument();
  });

  test('should not update left bullet value if greater than right one', () => {
    const value = 5;
    getValueFromPosition.mockReturnValueOnce(value)
    const leftBullet = container.getAllByTestId('mock-div')[0]
    const { queryByText } = within(leftBullet);

    fireEvent.click(leftBullet)
    expect(queryByText(props.range[value])).toBeNull();
  });

  test('should update right bullet value if greater than right one', () => {
    const value = 4;
    getValueFromPosition.mockReturnValueOnce(value)
    const rightBullet = container.getAllByTestId('mock-div')[1]
    const { getByText } = within(rightBullet);

    fireEvent.click(rightBullet)
    expect(getByText(props.range[value])).toBeInTheDocument();
  });

  test('should not update right bullet value if smaller than right one', () => {
    const value = 0;
    getValueFromPosition.mockReturnValueOnce(value)
    const rightBullet = container.getAllByTestId('mock-div')[1]
    const { queryByText } = within(rightBullet);

    fireEvent.click(rightBullet)
    expect(queryByText(props.range[value])).toBeNull();
  });
})