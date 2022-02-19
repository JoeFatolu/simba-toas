import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div data-reach-dialog-overlay>{children}</div>, elRef.current);
};

const DialogStled = styled.div``;

const Dialog = ({ isOpen, children }) => {
  return isOpen ? (
    <Modal>
      <DialogStled data-reach-dialog-content>{children}</DialogStled>
    </Modal>
  ) : null;
};

export default Dialog;
