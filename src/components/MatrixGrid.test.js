import React from "react"
import { render } from "@testing-library/react"
import 'canvas';
import MatrixGrid from './MatrixGrid';

test("Displays the correct title", () => {
  const { getByRole } = render(<MatrixGrid />)
  expect(getByRole('grid')).toBeInTheDocument();
});
