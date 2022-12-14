import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import faqList from "../../data/faqList";

const classes = "flex justify-content-between align-items-center";

function Faqs() {
  const questionInputRef = useRef("");
  const answerInputRef = useRef("");

  const [faqArray, setFaqArray] = useState([...faqList]);
  const [state, setState] = useState(["closed", "closed", "closed"]);

  const questionHandler = (e) => {
    questionInputRef.current = e.target.value;
  };
  const answerHandler = (e) => {
    answerInputRef.current = e.target.value;
  };

  useEffect(() => {
    console.log(faqArray);
    console.log(state);
  }, [faqArray, state]);

  // Delete an faq
  const deleteHandler = (e) => {
    const parent =
      e.target.parentElement.parentElement.parentElement.parentElement.id;
    faqArray.splice(parent, 1);
    state.splice(parent, 1);
    setFaqArray([...faqArray]);
    setState([...state]);
  };

  // Collapse or expand
  const collapseHandler = (e) => {
    const parent = e.target.parentElement.parentElement.id;
    const newState = state.map((i) => (state[i] = "closed"));
    const reset = newState[parent] === "closed" ? "open" : "closed";
    newState.splice(parent, 1, reset);
    setState([...newState]);
  };

  // Add an faq if all fields are filled
  const addHandler = (e) => {
    e.preventDefault();
    let question;
    let answer;

    !questionInputRef.current || !answerInputRef.current
      ? alert("Please add both question and answer")
      : (question = questionInputRef.current) &&
        (answer = answerInputRef.current);

    if (question && answer) {
      setFaqArray([
        ...faqArray,
        {
          question,
          answer,
        },
      ]);
      const newState = state.map((i) =>
        state[i] === "open" ? "closed" : "closed"
      );
      // console.log("newwwwwww", newState);
      setState([...newState, "closed"]);
    }
  };

  return (
    <>
      <div className="flex justify-content-center mt-75 w-100 h-50">
        <div className="w-50" data-testid="faq-list">
          <>
            {faqArray.map((faq) => (
              <div key={faqArray.indexOf(faq)} id={faqArray.indexOf(faq)}>
                <QuestionTemplate
                  question={faq.question}
                  answer={faq.answer}
                  deleteHandler={deleteHandler}
                  collapseHandler={collapseHandler}
                  state={state[faqArray.indexOf(faq)]}
                />
              </div>
            ))}
          </>
          <div className={classes}>
            <div>
              <textarea
                className="ma-8 w-100"
                placeholder="Enter the question"
                data-testid="add-question"
                onChange={questionHandler}
                ref={questionInputRef}
              />
              <textarea
                className="ma-8 w-100"
                placeholder="Enter the answer"
                data-testid="add-answer"
                onChange={answerHandler}
                ref={answerInputRef}
              />
            </div>
            <button
              data-testid="add-faq-button"
              onClick={addHandler}
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const QuestionTemplate = (props) => {
  return (
    <>
      <div className="item my-10" onClick={props.collapseHandler}>
        <div className={`ques ${classes} pa-15 mb-3`}>
          <h4 className="flex align-items-center my-2">{props.question}</h4>
          <span>{props.state === "open" ? "-" : "+"}</span>
        </div>
        <div className={props.state + " " + classes}>
          <p className="my-0">{props.answer}</p>
          <div className={classes}>
            <button className="danger small" onClick={props.deleteHandler}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;
