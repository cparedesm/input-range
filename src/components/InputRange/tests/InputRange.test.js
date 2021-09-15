import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';
import InputRange from '../js/InputRange';
import { getPositionFromEvent, getValueFromPosition } from '../js/utils';

jest.mock('../js/utils', () => ({
  ...jest.requireActual('../js/utils'),
  getPositionFromEvent: jest.fn(),
  getValueFromPosition: jest.fn(),
}))

getPositionFromEvent.mockImplementation(() => '');
getValueFromPosition.mockImplementation(() => 10);

jest.mock('../js/Bullet', () => {
  return {
    __esModule: true,
    default: ({ value, onBulletDrag }) =>
        <div data-testid="mock-div" onClick={onBulletDrag}>{value}</div>,
  };
});

describe('InputRange', () => {
  let container, inputMin, inputMax;

  const props = {
    min: 10,
    max: 50
  }
  
  beforeEach(() => {
    container = render(<InputRange {...props} />);
    inputMin = container.container.querySelector('#min');
    inputMax = container.container.querySelector('#max');
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb())
  });

  afterAll(() => {
    window.requestAnimationFrame.mockRestore();
  })

  test('should not change value if not number', () => {
    fireEvent.change(inputMin, {target: { value: 'a' }})
    fireEvent.change(inputMax, {target: { value: 'a' }})
    expect(inputMin.value).toEqual(`${props.min}`);
    expect(inputMax.value).toEqual(`${props.max}`);
  })

  test('should not change min if equal or greater than max', () => {
    fireEvent.change(inputMin, {target: { value: '100' }});
    expect(inputMin.value).toEqual(`${props.min}`);

    fireEvent.change(inputMin, {target: { value: '50' }});
    expect(inputMin.value).toEqual(`${props.min}`);
  })

  test('should not change max if equal or smaller than min', () => {
    fireEvent.change(inputMax, {target: { value: '10' }});
    expect(inputMax.value).toEqual(`${props.max}`);
    fireEvent.change(inputMax, {target: { value: '1' }});
    expect(inputMax.value).toEqual(`${props.max}`);
  })

  test('should change min if smaller than max', () => {
    const value = '30'
    fireEvent.change(inputMin, {target: { value }});
    expect(inputMin.value).toEqual(value);
  })


  test('should change max if greater than min', () => {
    const value = '30'
    fireEvent.change(inputMax, {target: { value }});
    expect(inputMax.value).toEqual(value);
  })

  test('should update left bullet value if smaller than right one', () => {
    const value = 15;
    getValueFromPosition.mockReturnValueOnce(value)
    const leftBullet = container.getAllByTestId('mock-div')[0]
    const { getByText } = within(leftBullet);

    fireEvent.click(leftBullet)
    expect(getByText(`${value}`)).toBeInTheDocument();
  });

  test('should not update left bullet value if greater than right one', () => {
    const value = 60;
    getValueFromPosition.mockReturnValueOnce(value)
    const leftBullet = container.getAllByTestId('mock-div')[0]
    const { queryByText } = within(leftBullet);

    fireEvent.click(leftBullet)
    expect(queryByText(`${value}`)).toBeNull();
  });

  test('should update right bullet value if greater than right one', () => {
    const value = 15;
    getValueFromPosition.mockReturnValueOnce(value)
    const rightBullet = container.getAllByTestId('mock-div')[1]
    const { getByText } = within(rightBullet);

    fireEvent.click(rightBullet)
    expect(getByText(`${value}`)).toBeInTheDocument();
  });

  test('should not update right bullet value if smaller than right one', () => {
    const value = 9;
    getValueFromPosition.mockReturnValueOnce(value)
    const rightBullet = container.getAllByTestId('mock-div')[1]
    const { queryByText } = within(rightBullet);

    fireEvent.click(rightBullet)
    expect(queryByText(`${value}`)).toBeNull();
  });
})