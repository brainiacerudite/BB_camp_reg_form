import { ChangeEvent } from "react";

interface LabelInputProps {
  id: string;
  name: string;
  required?: boolean;
  type: string;
  placeholder: string;
  value: string | number | readonly string[];
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
}: LabelInputProps) => {
  return (
    <div>
      <label htmlFor={id} className="text-lg font-medium lg:text-xl block text-white mb-2">
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
        className="w-full p-4 rounded-lg outline-none bg-inputBgColor text-white placeholder:text-placeholderColor"
      />
    </div>
  );
};

export default LabelInput;
