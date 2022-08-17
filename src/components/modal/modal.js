import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export default function Modal({ children, onClose }) {

  return (
      <div className={modalStyles.main}>
        <button className={modalStyles.closeButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
}; 
