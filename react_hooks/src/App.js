import React, { useState } from "react";
import useInput from "./useInput/useInput";
import useTabs from "./useTabs/useTabs";
import useTitle from "./useTitle/useTitle";
import useClick from "./useClick/useClick";
import useConfirm from "./useConfirm/useConfirm";
import usePreventLeave from "./usePreventLeave/usePreventLeave";
import useBeforeLeave from "./useBeforeLeave/useBeforeLeave";
import useFadeIn from "./useFadeIn/useFadeIn";
import useNetwork from "./useNetWork/useNetWork";
import useScroll from "./useScroll/useScroll";
import useFullscreen from "./useFullscreen/useFullscreen";
import useNotification from "./useNotification/useNotification";
import useAxios from "./useAxios/useAxios";

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
  const { loading, error, data, refetch } = useAxios({
    url: "https://yts.am/api/v2/list_movies.json"
  });
  console.log(
    `loading: ${loading}\n error:${error}\ndata:${JSON.stringify(data)}`
  );
  const triggerNotif = useNotification("알림알림", {
    body: "알림의 내용입니다."
  });
  const onFull = isFull => {
    console.log(isFull ? "풀스크린" : "작은스크린");
  };
  const { element, triggerFull, exitFull } = useFullscreen(onFull);

  const { y } = useScroll();
  const handleNetworkChange = () => {
    console.log("online ? 온라인이다 : 오프라인이다");
  };
  const onLine = useNetwork(handleNetworkChange);

  const fadeInH1 = useFadeIn(1, 1);
  const fadeInp = useFadeIn(5, 10);
  const begForLife = () => console.log("leave");
  useBeforeLeave(begForLife);

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
    <div style={{ height: "1000vh" }}>
      <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>
        useState 사용 : {item} {onLine ? "onLine" : "offLine"}
      </h1>
      <button onClick={reset}>Reset</button>
      <button onClick={incrementItem}>+</button>
      <button onClick={decrementItem}>-</button>
      <h1 {...fadeInH1}>Hello</h1>
      <p {...fadeInp}>FadeIn Test</p>
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
        <button onClick={triggerNotif}>알림</button>
        <button onClick={confirmcheck}>confirm</button>
      </div>
      <div>
        <button onClick={enablePrevent}>Protect</button>
        <button onClick={disablePrevent}>UnProtect</button>
        <div>
          <h1>{data && data.status}</h1>
          <h2>{loading && "Loading"} </h2>
          <button onClick={refetch}>Refetch</button>
        </div>
      </div>
      <div ref={element}>
        <img
          alt="키아누리브스"
          onClick={exitFull}
          src="http://www.topstarnews.net/news/photo/201901/570538_244744_1049.jpg"
        ></img>
      </div>
      <button onClick={triggerFull}>꽉채우기</button>
    </div>
  );
};

export default App;
