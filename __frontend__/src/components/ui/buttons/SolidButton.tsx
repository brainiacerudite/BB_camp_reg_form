interface SolidButtonProps {
  type: "submit" | "reset" | "button";
  disabled: true | false;
  text: string;
}

const SolidButton = ({ type, disabled, text }: SolidButtonProps) => {
  return (
    <div className="w-full isolate">
      <button
        type={type}
        disabled={disabled}
        className="w-full text-white font-bold py-4 px-6 rounded-lg border-gradient bg-btnGradientColor before:!rounded-lg before:!p-[1px] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {text}
      </button>
    </div>
  );
};

export default SolidButton;
