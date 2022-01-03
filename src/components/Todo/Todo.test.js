import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "./Todo";
const mockedSetTodo = jest.fn();

describe("Add input", () => {
  it("before typing, text should show placeholder", () => {
    render(<Todo todos={[]} setTodo={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    expect(inputElement).toBeInTheDocument();
  });
  it("Upon typing input, task should be in input box", () => {
    render(<Todo todos={[]} setTodo={mockedSetTodo} />);
    const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
    fireEvent.change(inputElement, {
      preventDefault() {},
      target: { value: "Go Grocery Shopping" },
    });
    expect(inputElement.value).toBe("Go Grocery Shopping");
  });
});
