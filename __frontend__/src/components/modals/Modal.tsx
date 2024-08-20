import { MdOutlineCancel } from "react-icons/md";

interface ModalProps {
  handleToggled: () => void;
  children: React.ReactNode;
}

const Modal = ({ handleToggled, children }: ModalProps) => {
  return (
    <div className="drop fixed top-0 left-0 w-full h-full z-50 px-5">
      <div className="relative w-full max-w-[550px] flex rounded p-4 bg-neutral-200 my-10 md:mt-10 flex-col m-auto px-5">
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
