import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

interface IModalOverlay {
  children: any, 
  onClose: () => void,
}

export default function ModalOverlay({ children, onClose }: IModalOverlay) {
  const handleCloseModal = (e: React.SyntheticEvent) => {
   const target = e.target as HTMLInputElement;
    if (target.id === "ModalOverlay") {
      onClose();
    }
  };

  return (
    <div
      onClick={handleCloseModal}
      className={`${modalOverlayStyles.main} ${modalOverlayStyles.mainOpened}`}
      id="ModalOverlay"
    >
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
