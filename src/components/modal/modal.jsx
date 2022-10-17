import { useEffect } from "react";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { modalsRoot } from "../../utils/constants";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { REMOVE_VISIBILITY } from "../../services/actions/modal";

export default function Modal({ children, isOpened }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const onClose = () => {
    history.goBack();
    dispatch({ type: REMOVE_VISIBILITY });
  };

  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
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
    modalsRoot
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isOpened: PropTypes.bool.isRequired,
};
