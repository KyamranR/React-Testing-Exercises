import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", () => {
  render(<Card />);
});

it("should match snapshot", () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
