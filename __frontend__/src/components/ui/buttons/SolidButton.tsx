interface SolidButtonProps {
  type: "submit" | "reset" | "button";
  text: string;
}

const SolidButton = ({ type, text }: SolidButtonProps) => {
  return (
    <div className="w-full isolate">
      <button
        type={type}
        className="w-full text-white font-bold py-4 px-6 rounded-lg border-gradient bg-btnGradientColor before:!rounded-lg before:!p-[1px]"
      >
        {text}
      </button>
    </div>
  );
};

export default SolidButton;
