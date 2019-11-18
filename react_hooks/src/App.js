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
const content = [
  {
    tab: "Section1",
    content: "Section1의 내용"
  },
  {
    tab: "Section2",
    content: "Section2의 내용"
  }
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCuurntIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCuurntIndex
  };
};

const App = () => {
  const [item, setItem] = useState(0);
  const reset = () => setItem(0);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  const maxLen = value => value.length <= 10;

  const name = useInput("", maxLen);
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div>
      <h1>useState 사용 : {item}</h1>
      <button onClick={reset}>Reset</button>
      <button onClick={incrementItem}>+</button>
      <button onClick={decrementItem}>-</button>
      <h1>Hello</h1>
      <input placeholder="Name" {...name} />
      <div>
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)}>{section.tab}</button>
        ))}
        <div>{currentItem.content}</div>
      </div>
    </div>
  );
};

export default App;
