import { MdOutlineCancel } from "react-icons/md";
import "./Modal.css";

interface ModalProps {
  handleToggled: () => void;
  children: React.ReactNode;
}

const Modal = ({ handleToggled, children }: ModalProps) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div
        onClick={handleToggled}
        className="absolute inset-0 bg-black opacity-60"
      ></div>

      <div className="relative w-full max-w-[550px] flex rounded p-4 bg-bgGlassMorphism my-10 md:mt-10 flex-col m-auto px-5">
        <span
          className="absolute right-4 text-2xl text-red-600 cursor-pointer"
          onClick={handleToggled}
        >
          <MdOutlineCancel />
        </span>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
};

export default Modal;
