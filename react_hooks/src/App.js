import React, { useState } from "react";

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  const onChange = e => {
    const {
      target: { value }
    } = e;
    let willUpdate = true;

    if (typeof validator === "function") {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  };

  return { value, onChange };
};

const App = () => {
  const [item, setItem] = useState(0);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  const maxLen = value => value.length <= 10;
  const name = useInput("", maxLen);
  return (
    <div>
      <h1>useState 사용 : {item}</h1>
      <button onClick={incrementItem}> increment</button>
      <button onClick={decrementItem}> decrement</button>
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
    </div>
  );
};

export default App;
