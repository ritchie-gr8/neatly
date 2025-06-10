import React, { useState } from "react";

const ReuseModal = ({
  triggerButton,
  triggerButtonClass = "",
  onConfirm,
  isOpen: externalIsOpen,
  onCancel: externalOnCancel,
  confirmButtonStyle = "orange",
  title = "Change Date",
  message = "Are you sure you want to change your check-in and check-out date?",
  confirmText = "Yes, I want to change",
  cancelText = "No, I don't",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (onConfirm) onConfirm();
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    if (externalOnCancel) externalOnCancel();
  };

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : isModalOpen;

  const getConfirmButtonClass = () => {
    if (confirmButtonStyle === "red") {
      return "w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded font-semibold cursor-pointer whitespace-nowrap";
    }
    return "w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded font-semibold cursor-pointer whitespace-nowrap";
  };

  const getCancelButtonClass = () => {
    if (confirmButtonStyle === "red") {
      return "w-full bg-white border border-red-500 text-red-500 hover:bg-red-50 py-3 px-4 rounded font-semibold cursor-pointer whitespace-nowrap";
    }
    return "w-full bg-white border border-orange-500 text-orange-500 hover:bg-orange-50 py-3 px-4 rounded font-semibold cursor-pointer whitespace-nowrap";
  };

  return (
    <>
      {/* ถ้ามี triggerButton จะแสดงปุ่ม */}
      {triggerButton && (
        <button onClick={handleOpenModal} className={triggerButtonClass}>
          {triggerButton}
        </button>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <div className="bg-white rounded-sm p-6 max-w-sm md:max-w-lg w-full mx-4 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 font-inter">
                {title}
              </h3>
              <button
                onClick={handleModalCancel}
                className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-6">{message}</p>

            <div className="space-y-3 md:space-y-0 md:flex md:space-x-3">
              <button
                onClick={handleModalCancel}
                className={`${getCancelButtonClass()}`}
              >
                {cancelText}
              </button>

              <button
                onClick={handleModalConfirm}
                className={`${getConfirmButtonClass()}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReuseModal;
