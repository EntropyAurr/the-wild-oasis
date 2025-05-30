import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// 1. Create context
const ModalContext = createContext();

// 2. Create parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");

  return <ModalContext.Provider value={{ openName, setOpenName, close }}>{children}</ModalContext.Provider>;
}

// 3. Consume context
function Open({ children, opens: opensWindowName }) {
  const { setOpenName } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => setOpenName(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
        {/* gives the child access to the close() function by adding the onCloseModal prop to that child (onCloseModal={close}) */}
      </StyledModal>
    </Overlay>,
    document.body // portal target: renders the Modal directly under the <body> tag in HTML.
    // It lives outside the DOM structure of the application itself (DOM of app lives inside the "root" div)
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
