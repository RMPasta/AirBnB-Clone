import React from "react";
import { useModal } from "../../context/Modal";
import "./OpenModalButton.css";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  className, // class
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };
  if (buttonText === "Delete")
    return (
      <button className="delete-button" onClick={onClick}>
        {buttonText}
      </button>
    );
  if (buttonText === "Delete Review")
    return (
      <button className="delete-review-button" onClick={onClick}>
        {buttonText}
      </button>
    );
  if (buttonText === "Reserve")
    return (
      <button className="reserve-button" onClick={onClick}>
        {buttonText}
      </button>
    );
  return (
    <button className="modal-buttons" onClick={onClick}>
      {buttonText}
    </button>
  );
}

export default OpenModalButton;
