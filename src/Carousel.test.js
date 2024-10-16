import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("should work without crashing", () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it("should match snapshot", () => {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("moves to the previous image when the left arrow is clicked", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  // Move to the second image by clicking the right arrow
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Now we expect the second image to be shown
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

  // Click the left arrow to go back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to show again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("hides the left arrow on the first image", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();
});

it("hides the right arrow on the last image", () => {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow); // first click (2nd image)
  fireEvent.click(rightArrow); // second click (3ed image, last one)

  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();
});
