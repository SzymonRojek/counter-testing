import { useEffect, useState } from "react";

import "./styles.css";

export const Counter = ({ start }) => {
  const [defaultStart, setDefaultStart] = useState(start);
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setDefaultStart(start);
  }, [start]);

  const additionHandler = () =>
    start
      ? setDefaultStart((prev) => prev + 1)
      : setCounter((prev) => prev + 1);

  const subtractionHandler = () =>
    start
      ? setDefaultStart((prev) => prev - 1)
      : setCounter((prev) => prev - 1);

  const handleChangeInputValue = ({ target }) => setInputValue(target.value);

  const handleReset = () => {
    setDefaultStart(start);
    setCounter(0);
    setInputValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (/\d/.test(inputValue)) {
      setCounter(+inputValue);
      setDefaultStart(+inputValue);
    }

    setInputValue("");
  };

  return (
    <div id="container">
      <p data-test="text">
        Counter result:{" "}
        <span data-test="counter" className="counter">{`${
          start ? defaultStart : counter
        }`}</span>
      </p>

      <button
        data-test="add-btn"
        className="addition-button one"
        onClick={additionHandler}
      >
        +
      </button>
      <button
        data-test="sub-btn"
        className="subtraction-button two"
        onClick={subtractionHandler}
      >
        -
      </button>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            data-test="input-num"
            className="input-number"
            placeholder="change counter"
            type="number"
            value={inputValue}
            onChange={handleChangeInputValue}
          ></input>
        </label>
        <button
          type="submit"
          data-test="change-btn"
          className="change-button three"
        >
          Change
        </button>
        <button
          data-test="reset-btn"
          className="reset-button four"
          type="reset"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
};
