import { Link } from "react-router-dom";

interface LinkOutlineButtonProps {
  to: string;
  type: "submit" | "reset" | "button";
  text: string;
}

const LinkOutlineButton = ({ type, text, to }: LinkOutlineButtonProps) => {
  return (
    <div className="isolate">
      <Link to={to}>
        <button
          type={type}
          className="w-full max-w-[360px] text-white font-bold py-4 px-6 border-gradient rounded-lg bg-transparent before:!rounded-lg before:!p-[1px]"
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default LinkOutlineButton;
