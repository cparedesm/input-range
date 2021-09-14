import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import Bullet from '../js/Bullet';

test('should setActive to true on mouseDown', () => {
  const { getByTestId } = render(<Bullet />);
  const bullet = getByTestId('bullet');

  expect(bullet.classList).not.toContain('active');
  fireEvent.mouseDown(bullet, {});
  expect(bullet.classList).toContain('active');
})

