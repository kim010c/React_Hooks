import { useEffect, useRef } from "react";

const useClick = onClick => {
  const element = useRef();
  const elcurrent = element.current;
  useEffect(() => {
    if (elcurrent) {
      elcurrent.addEventListener("click", onClick);
    }
    return () => {
      if (elcurrent) {
        elcurrent.removeEventListener("click", onClick);
      }
    };
  });
  return element;
};

export default useClick;
