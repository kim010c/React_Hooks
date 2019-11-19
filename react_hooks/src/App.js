import React, { useState } from "react";
import useInput from "./UseInput";
import useTabs from "./UseTabs";
import useTitle from "./UseTitle";
import useClick from "./UseClick";
import useConfirm from "./UseConfirm";
import usePreventLeave from "./UsePreventLeave";

const content = [
  {
    key: 1,
    tab: "Section1",
    content: "Section1의 내용"
  },
  {
    key: 2,
    tab: "Section2",
    content: "Section2의 내용"
  }
];

const App = () => {
  const { enablePrevent, disablePrevent } = usePreventLeave();

  const check = () => console.log("confirm 확인");
  const cancel = () => console.log("confirm 취소");
  const confirmcheck = useConfirm("확인", check, cancel);

  const titleUpdater = useTitle("Loading");
  setTimeout(() => titleUpdater("Home"), 5000);

  const [item, setItem] = useState(0);
  const reset = () => setItem(0);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  const maxLen = value => value.length <= 10;

  const name = useInput("", maxLen);
  const { currentItem, changeItem } = useTabs(0, content);

  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);
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
          <button key={section.key} onClick={() => changeItem(index)}>
            {section.tab}
          </button>
        ))}
        <div>{currentItem.content}</div>
        <div>
          <h1 ref={title}>Hi</h1>
        </div>
        <button onClick={confirmcheck}>confirm</button>
      </div>
      <div>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>UnProtect</button>
      </div>
    </div>
  );
};

export default App;
