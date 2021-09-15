import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Bullet from '../js/Bullet';

describe('Bullet', () => {
  let container, bullet;
  
  beforeEach(() => {
    container = render(<Bullet />);
    bullet = container.getByTestId('bullet');
  })

  test('should trigger active class on mouseDown/mouseUp', () => {
    expect(bullet.classList).not.toContain('active');
    fireEvent.mouseDown(bullet);
    expect(bullet.classList).toContain('active');
    fireEvent.mouseUp(bullet);
    expect(bullet.classList).not.toContain('active');
  });
})

