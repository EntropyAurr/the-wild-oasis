import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef(); // use to store data that is not rendered, remembered by the component over time (usually only appear in event handler or effects)

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      // ref.current: refers to the DOM element that've attached a ref to using useRef() (StyledModal element)
      // e.target: DOM element that actually be clicked
      // ref.current.contains(e.target) will be false if the clicked element is not the StyledModal (when we click outside the StyledModal)

      document.addEventListener("click", handleClick, listenCapturing);

      return () => document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
