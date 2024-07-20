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
          className="w-full max-w-[360px] text-white font-medium py-4 px-6 border border-borderColor rounded-lg bg-transparent"
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default LinkOutlineButton;
