import { FiX } from "react-icons/fi";
import Button from "./Button";
import { flashStore } from "../zustand/FlashStore";
import 'animate.css';

export default function Flash() {
  const { type, message, isOpen, setFlash } = flashStore();

  const closeModal = () => {
    setFlash("", "", false);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-40"
          onClick={closeModal}
        >
          <div className="animate__animated animate__fadeIn bg-white rounded-lg shadow-lg w-96"
           onClick={handleModalClick}>
            <div className="flex justify-between items-center bg-gray-100 px-4 py-2 border-b">
              <h3 className="text-lg font-semibold">Notification</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={30} />
              </button>
            </div>

            <div className="p-4">
              {type === "success" && (
                <div
                  className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
                  role="alert"
                >
                  <p className="font-bold">Success</p>
                  <p>{message}</p>
                </div>
              )}

              {type === "error" && (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                  role="alert"
                >
                  <p className="font-bold">Error</p>
                  <p>{message}</p>
                </div>
              )}

              {type === "warning" && (
                <div
                  className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
                  role="alert"
                >
                  <p className="font-bold">Warning</p>
                  <p>{message}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end p-2 border-t bg-gray-100">
              <Button onClick={closeModal}>닫기</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
