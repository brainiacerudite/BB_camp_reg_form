import { ChangeEvent } from "react";

interface LabelInputProps {
  id: string;
  name: string;
  required?: boolean;
  type: string;
  placeholder: string;
  value: string | number;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage?: string | null;
}

const LabelInput = ({
  id,
  name,
  required,
  type,
  placeholder,
  value,
  label,
  onChange,
  hasError,
  errorMessage,
}: LabelInputProps) => {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="text-sm font-normal block text-white mb-1 ml-1 lg:text-base"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-4 text-sm rounded-lg outline-none bg-inputBgColor text-white placeholder:text-placeholderColor"
      />
      {hasError && (
        <span className="text-sm text-red-400 font-medium ml-2">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default LabelInput;
