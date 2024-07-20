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
          className="w-full max-w-[360px] text-white font-bold rounded-lg bg-gradient-to-br from-[#FEFE00] to-[#FF3D00] p-[0.5px]"
        >
          <div className="w-full h-full py-4 px-6 rounded-lg bg-btnGradientColor">{text}</div>
        </button>
      </Link>
    </div>
  );
};

export default LinkSolidButton;
