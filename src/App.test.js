import React from "react";
import App from "./App";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import faqList from "./data/faqList";
import Faqs from "./components/collapsible-faq/index";
import "@testing-library/jest-dom/extend-expect";

const renderApp = () => render(<App />);

afterEach(() => {
  cleanup();
});

describe("Rendering FAQs and delete button", () => {
  it("Initially 3 faqs should be there", () => {
    render(<Faqs />);
    const faqs = screen.getByTestId("faq-list");

    for (let i = 0; i < 3; i++) {
      const faqQuestion = faqs.children[i].children[0].children[0];
      const faqAnswer = faqs.children[i].children[1].children[0];

      expect(faqQuestion).toHaveTextContent(faqList[i].question);
      expect(faqAnswer).toHaveTextContent(faqList[i].answer);
    }
  });
  it("Clicking on any FAQ should open it, collapse the other ones and toggle + and - signs", () => {
    render(<Faqs />);
    const faqs = screen.getByTestId("faq-list");
    const clickedFaqQuestion = faqs.children[1].children[0].children[0];
    const clickedFaqAnswer = faqs.children[1].children[1];
    const clickedFaqSign = faqs.children[1].children[0].children[1];

    const closedFaqAnswer = faqs.children[0].children[1];
    const closedFaqSign = faqs.children[0].children[0].children[1];

    if (clickedFaqSign.textContent === "+") {
      fireEvent.click(clickedFaqQuestion);
      expect(clickedFaqAnswer).toHaveClass("open");
      expect(clickedFaqSign).toHaveTextContent("-");
    } else {
      fireEvent.click(clickedFaqQuestion);
      expect(clickedFaqAnswer).toHaveClass("closed");
      expect(clickedFaqSign).toHaveTextContent("+");
    }

    expect(closedFaqAnswer).toHaveClass("closed");
    expect(closedFaqSign).toHaveTextContent("+");
  });

  it("Clicking on an FAQ should toggle its visiblity", () => {
    render(<Faqs />);
    const faqs = screen.getByTestId("faq-list");

    const clickedFaqQuestion = faqs.children[1].children[0].children[0];
    const clickedFaqAnswer = faqs.children[1].children[1];
    const clickedFaqSign = faqs.children[1].children[0].children[1];

    fireEvent.click(clickedFaqQuestion);
    expect(clickedFaqAnswer).toHaveClass("open");
    expect(clickedFaqSign).toHaveTextContent("-");

    fireEvent.click(clickedFaqQuestion);
    expect(clickedFaqAnswer).toHaveClass("closed");
    expect(clickedFaqSign).toHaveTextContent("+");
  });

  it("Delete buttons deletes a Faq", () => {
    render(<Faqs />);
    const faqs = screen.getByTestId("faq-list");
    const length = faqs.children.length - 1;

    const deletedFaqQuestion = faqs.children[2].children[0].children[0];
    const deletedFaqAnswer = faqs.children[2].children[1].children[0];
    const deleteButton = faqs.children[2].children[1].children[1].children[0];

    fireEvent.click(deleteButton);
    expect(deletedFaqAnswer).not.toBeInTheDocument();
    expect(deletedFaqQuestion).not.toBeInTheDocument();

    expect(screen.getByTestId("faq-list").children.length - 1).toBe(length - 1);
  });
});

describe("Functions of add button", () => {
  it("Creates a new FAQ", () => {
    render(<Faqs />);
    const question = screen.getByTestId("add-question");
    const answer = screen.getByTestId("add-answer");
    const button = screen.getByTestId("add-faq-button");

    fireEvent.change(question, {
      target: { value: "Do hackerrank offers any premium courses?" },
    });
    fireEvent.change(answer, { target: { value: "No, it doesn't." } });
    fireEvent.click(button);

    const faqs = screen.getByTestId("faq-list");
    const length = faqs.children.length - 1;
    const addedFaqQuestion = faqs.children[length - 1].children[0].children[0];
    const addedFaqAnswer = faqs.children[length - 1].children[1].children[0];

    expect(addedFaqQuestion).toHaveTextContent(
      "Do hackerrank offers any premium courses?"
    );
    expect(addedFaqAnswer).toHaveTextContent("No, it doesn't.");
  });

  it("Check text boxes for Blank Input", () => {
    render(<Faqs />);
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const question = screen.getByTestId("add-question");
    const answer = screen.getByTestId("add-answer");
    const button = screen.getByTestId("add-faq-button");
    fireEvent.change(question, { target: { value: "" } });
    fireEvent.change(answer, { target: { value: "" } });
    fireEvent.click(button);
    expect(alertMock).toHaveBeenCalledWith(
      "Please add both question and answer"
    );
  });

  it("Adding a new FAQ should collapse any opened FAQ", () => {
    render(<Faqs />);
    const question = screen.getByTestId("add-question");
    const answer = screen.getByTestId("add-answer");
    const button = screen.getByTestId("add-faq-button");

    fireEvent.change(question, {
      target: { value: "Do hackerrank offers any premium courses?" },
    });
    fireEvent.change(answer, { target: { value: "No, it doesn't." } });
    fireEvent.click(button);

    const faqs = screen.getByTestId("faq-list");
    const length = faqs.children.length - 1;
    for (let i = 0; i < length; i++) {
      const faqAnswer = faqs.children[i].children[1];
      const sign = faqs.children[i].children[0].children[1];

      expect(faqAnswer).toHaveClass("closed");
      expect(sign).toHaveTextContent("+");
    }
  });
});
