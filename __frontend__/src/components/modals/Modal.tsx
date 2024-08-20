import { MdOutlineCancel } from "react-icons/md";
import "./Modal.css";

interface ModalProps {
  handleToggled: () => void;
  children: React.ReactNode;
}

const Modal = ({ handleToggled, children }: ModalProps) => {
  return (
    <div className="drop fixed z-50 inset-0 flex items-center justify-center">
      <div
        onClick={handleToggled}
        className="absolute inset-0 bg-black opacity-60"
      ></div>

      <div className="relative w-full max-w-[550px] mx-4 flex p-6 bg-yellow-600 bg-opacity-60 border-gradient rounded-2xl backdrop-blur-sm">
        <span
          className="absolute right-4 top-3 text-3xl text-red-500 cursor-pointer"
          onClick={handleToggled}
        >
          <MdOutlineCancel />
        </span>
        <div className="relative mt-8 text-white">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
