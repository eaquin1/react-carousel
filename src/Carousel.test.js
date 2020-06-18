import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("checks if Carousel renders", function() {
  render(<Carousel  />)
})

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { getByTestId, queryByAltText } = render(<Carousel />);

  //move forward from the very first photo
  const rightArrow = getByTestId("right-arrow")
  fireEvent.click(rightArrow)

  //move back to the first photo
  const leftArrow = getByTestId("left-arrow")
  fireEvent.click(leftArrow)

  //expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it("shows and hides arrows appropriately", function() {
  const { getByTestId } = render(<Carousel />)
  const rightArrow = getByTestId("right-arrow")
  const leftArrow = getByTestId("left-arrow")

  //right arrow should be present but left arrow should be hidden when on first image
  expect(rightArrow).toHaveClass('fas fa-chevron-circle-right');
  expect(leftArrow).toHaveClass('hidden');

  // move forward, both arrows should be present
  fireEvent.click(rightArrow)
  expect(rightArrow).toHaveClass('fas fa-chevron-circle-right');
  expect(leftArrow).toHaveClass('fas fa-chevron-circle-left');

  //move forward again, left arrow should be present but right arrow should be hidden
  fireEvent.click(rightArrow)
  expect(rightArrow).toHaveClass('hidden');
  expect(leftArrow).toHaveClass('fas fa-chevron-circle-left');

})