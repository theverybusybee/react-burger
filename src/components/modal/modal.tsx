import { memo, useEffect } from "react";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { modalsRoot } from "../../utils/constants";

interface IModal {
  children: any;
  isOpened?: boolean;
  onClose: () => void;
}

function Modal({ children, isOpened, onClose }: IModal) {
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpened]);

  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={modalStyles.main}>
        <button className={modalStyles.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modalsRoot!
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default memo(Modal);
