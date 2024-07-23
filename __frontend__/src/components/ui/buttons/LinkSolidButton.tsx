import { Link } from "react-router-dom";

interface LinkSolidButtonProps {
  to: string;
  type: "submit" | "reset" | "button";
  text: string;
}

const LinkSolidButton = ({ type, text, to }: LinkSolidButtonProps) => {
  return (
    <div className="w-full isolate">
      <Link to={to}>
        <button
          type={type}
          className="w-full max-w-[360px] text-white font-bold py-4 px-6 rounded-lg border-gradient bg-btnGradientColor before:!rounded-lg before:!p-[1px]"
        >
          {text}
        </button>
      </Link>
    </div>
  );
};

export default LinkSolidButton;
