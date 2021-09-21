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
    <div>
      <p>
        Counter result:
        <span className="counter">{`${start ? defaultStart : counter}`}</span>
      </p>

      <button className="addition-button one" onClick={additionHandler}>
        +
      </button>
      <button className="subtraction-button two" onClick={subtractionHandler}>
        -
      </button>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="number-input"
            placeholder="change counter"
            type="number"
            value={inputValue}
            onChange={handleChangeInputValue}
          ></input>
        </label>
        <button type="submit" className="change-button three">
          Change
        </button>
        <button
          className="reset-button four"
          type="reset"
          onClick={handleReset}
        >
          Reset
        </button>
        {""}
      </form>
    </div>
  );
};
