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
          className="w-full max-w-[360px] text-white font-bold rounded-lg bg-gradient-to-br from-[#FEFE00] to-[#FF3D00] p-[0.75px]"
        >
          <div className="w-full h-full bg-black border border-borderColor rounded-lg"><div className="py-4 px-6 rounded-lg bg-bgGlassMorphism">{text}</div></div>
        </button>
      </Link>
    </div>
  );
};

export default LinkOutlineButton;
