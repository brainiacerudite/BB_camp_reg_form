import { Link } from "react-router-dom";

interface LinkSolidButtonProps {
  to: string;
  type: "submit" | "reset" | "button";
  text: string;
}

const LinkSolidButton = ({ type, text, to }: LinkSolidButtonProps) => {
  return (
    <div className="isolate">
      <Link to={to}>
        <button
          type={type}
          className="w-full max-w-[360px] text-white font-medium py-4 px-6 rounded-lg bg-btnGradientColor"
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default LinkSolidButton;
