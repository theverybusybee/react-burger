import modalOverlayStyles from "./modal-overlay.module.css";
import ReactDOM from 'react-dom';
import { modalsRoot } from "../../utils/data";
import PropTypes from 'prop-types';

export default function ModalOverlay({onClose, children}) {

  return ReactDOM.createPortal(
    <>
      <div
        onClick={onClose}
        className={`${modalOverlayStyles.main} ${modalOverlayStyles.mainOpened}`}
      >
        {children}
      </div>
    </>,
    modalsRoot
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
}; 